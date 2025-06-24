import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import GUI from 'lil-gui';

@Component({
  selector: 'app-hero-art',
  templateUrl: './hero-art.component.html',
  styles: [
    `
      canvas {
        display: flex;
        width: 100%;
        height: 100vh;
      }
    `,
  ],
})
export class HeroArtComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: InstanceType<typeof OrbitControls>;
  private spotLight!: THREE.SpotLight;
  private lightHelper!: THREE.SpotLightHelper;
  private gui!: GUI;
  private textures: { [key: string]: THREE.Texture | null } = {};

  ngOnInit(): void {
    this.initScene();
    this.animate();
  }

  ngOnDestroy(): void {
    this.gui.destroy();
    this.renderer.dispose();
  }

  private initScene(): void {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.set(7, 4, 1);

    // Controls (disabled)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = false;

    // Lights
    const ambient = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 0.15);
    this.scene.add(ambient);

    const loader = new THREE.TextureLoader();
    const disturbTexture = loader.load('/assets/hero/disturb.jpg');
    disturbTexture.colorSpace = THREE.SRGBColorSpace;
    this.textures['disturb'] = disturbTexture;
    this.textures['none'] = null;

    this.spotLight = new THREE.SpotLight('#FF0000', 100);
    this.spotLight.map = disturbTexture;
    this.spotLight.position.set(2.5, 5, 2.5);
    this.spotLight.angle = Math.PI / 6;
    this.spotLight.penumbra = 1;
    this.spotLight.decay = 2;
    this.spotLight.distance = 0;
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 1024;
    this.spotLight.shadow.mapSize.height = 1024;
    this.spotLight.shadow.camera.near = 1.1;
    this.spotLight.shadow.camera.far = 10;
    this.spotLight.shadow.focus = 1;
    this.spotLight.shadow.bias = -0.003;
    this.scene.add(this.spotLight);

    this.lightHelper = new THREE.SpotLightHelper(this.spotLight);
    this.scene.add(this.lightHelper);

    // Ground
    const planeGeo = new THREE.PlaneGeometry(200, 200);
    const planeMat = new THREE.MeshLambertMaterial({ color: 0xbcbcbc });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.position.set(0, -1, 0);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    this.scene.add(plane);

    // Model
    const plyLoader = new PLYLoader();
    plyLoader.load(
  'assets/hero/Lucy100k.ply',
  (geometry: THREE.BufferGeometry) => {
    geometry.scale(0.0024, 0.0024, 0.0024);
    geometry.computeVertexNormals();

    geometry.computeBoundingBox();
    const bbox = geometry.boundingBox!;
    const center = new THREE.Vector3();
    bbox.getCenter(center);

    // Center the geometry on X and Z, but let Y sit on the ground
    geometry.translate(-center.x, -bbox.min.y, center.z);

    const mat = new THREE.MeshLambertMaterial();
    const mesh = new THREE.Mesh(geometry, mat);

    // No X or Z rotation
    mesh.rotation.z = 100; // Rotate to face camera at 45 deg
    mesh.rotation.x = -Math.PI / 2; // Rotate to face camera at 45 deg
    mesh.rotation.z = -Math.PI / 2; // Rotate to face camera at 45 deg

    mesh.position.set(0, 0, 0);

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
  }
);


    // GUI
    this.initGUI();
  }

  private initGUI(): void {
    this.gui = new GUI();
    const params = {
      map: this.spotLight.map,
      color: this.spotLight.color.getHex(),
      intensity: this.spotLight.intensity,
      distance: this.spotLight.distance,
      angle: this.spotLight.angle,
      penumbra: this.spotLight.penumbra,
      decay: this.spotLight.decay,
      focus: this.spotLight.shadow.focus,
      shadows: true,
    };

    this.gui
      .add(params, 'map', this.textures)
      .onChange((val: THREE.Texture | null) => {
        this.spotLight.map = val;
      });
    this.gui.addColor(params, 'color').onChange((val: any) => {
      this.spotLight.color.setHex(val);
    });
    this.gui.add(params, 'intensity', 0, 500).onChange((val: any) => {
      this.spotLight.intensity = val;
    });
    this.gui.add(params, 'distance', 0, 20).onChange((val: any) => {
      this.spotLight.distance = val;
    });
    this.gui.add(params, 'angle', 0, Math.PI / 3).onChange((val: any) => {
      this.spotLight.angle = val;
    });
    this.gui.add(params, 'penumbra', 0, 1).onChange((val: any) => {
      this.spotLight.penumbra = val;
    });
    this.gui.add(params, 'decay', 1, 2).onChange((val: any) => {
      this.spotLight.decay = val;
    });
    this.gui.add(params, 'focus', 0, 1).onChange((val: any) => {
      this.spotLight.shadow.focus = val;
    });
    this.gui.add(params, 'shadows').onChange((val: any) => {
      this.renderer.shadowMap.enabled = val;
    });
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    const time = performance.now() / 7000;
    this.spotLight.position.x = Math.cos(time) * 2.5;
    this.spotLight.position.z = Math.sin(time) * 2.5;
    this.lightHelper.update();

    this.renderer.render(this.scene, this.camera);
  };

  @HostListener('window:resize')
  onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
