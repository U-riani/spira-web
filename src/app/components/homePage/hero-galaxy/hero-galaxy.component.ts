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

@Component({
  selector: 'app-hero-galaxy',
  templateUrl: './hero-galaxy.component.html',
  styleUrls: ['./hero-galaxy.component.css'],
})
export class HeroGalaxyComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: InstanceType<typeof OrbitControls>;
  private geometry!: THREE.BufferGeometry;
  private material!: THREE.PointsMaterial;
  private points!: THREE.Points;
  private clock = new THREE.Clock();

  private ps = {
    count: 100000,
    size: 0.1,
    radius: 14,
    branches: 7,
    spin: 1,
    rnd: 1,
    rpower: 3,
    innerColor: '#ff6030',
    outerColor: '#070041',
  };

  ngOnInit(): void {
    this.initGalaxy();
    this.onResize(); // Ensure initial sizing is correct
    this.animate();
  }

  ngOnDestroy(): void {
    this.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
    this.controls.dispose();
  }

  private initGalaxy(): void {
    this.scene = new THREE.Scene();

    // Galaxy geometry
    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.ps.count * 3);
    const colors = new Float32Array(this.ps.count * 3);

    const insideColor = new THREE.Color(this.ps.innerColor);
    const outsideColor = new THREE.Color(this.ps.outerColor);
    insideColor.lerp(outsideColor, 0.05);

    for (let i = 0; i < this.ps.count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * this.ps.radius;
      const spinAngle = radius * this.ps.spin;
      const branchAngle =
        ((i % this.ps.branches) / this.ps.branches) * Math.PI * 2;
      const randomX = Math.pow(Math.random(), this.ps.rpower) * this.ps.rnd;
      const randomY = Math.pow(Math.random(), this.ps.rpower) * this.ps.rnd;
      const randomZ = Math.pow(Math.random(), this.ps.rpower) * this.ps.rnd;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY / radius;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const color = insideColor.clone();
      color.lerp(outsideColor, radius / this.ps.radius);

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    this.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.material = new THREE.PointsMaterial({
      size: this.ps.size,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(10, 10, 10); // Dynamic 3D angle

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Controls
    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.1;
    this.controls.enableZoom = false; // 🚀 prevent scroll zoom
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  private animate = () => {
    const elapsedTime = this.clock.getElapsedTime();

    if (this.points) {
      this.points.rotation.y = elapsedTime * 0.1;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  };

  @HostListener('window:resize')
  onResize(): void {
    if (!this.renderer || !this.camera) {
      return;
    }

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}
