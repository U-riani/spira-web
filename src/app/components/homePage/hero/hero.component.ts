import { Component, AfterViewInit, HostListener } from '@angular/core';
import * as THREE from 'three';
import { HeroGalaxyComponent } from '../hero-galaxy/hero-galaxy.component';
import { HeroArtComponent } from '../hero-art/hero-art.component';
// Import additional loaders if needed

@Component({
  selector: 'app-hero',
  imports: [HeroGalaxyComponent, HeroArtComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements AfterViewInit {
  isPlaying = false;
  private audio = new Audio('http://ice1.somafm.com/u80s-256-mp3');
  private renderer!: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera!: THREE.PerspectiveCamera;
  private mouse = { x: 0, y: 0 };

  ngAfterViewInit(): void {
    this.initThree();
    this.animate();
  }

  toggleMusic() {
    if (this.isPlaying) {
      this.stopMusic();
    } else {
      this.playMusic();
    }
  }

  private playMusic() {
    this.audio.volume = 0.2;
    this.audio.play();
    this.isPlaying = true;
  }

  private stopMusic() {
    this.audio.pause();
    this.isPlaying = false;
  }

  private initThree() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.domElement.id = 'stageElement';
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 20000);
    this.camera.position.z = 300;

    const light = new THREE.PointLight(0xffffff, 4, 1000);
    light.position.set(0, 200, -500);
    this.scene.add(light);

    // TODO: Add your starField, mountains, groundPlain, gunShip setup here
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    // TODO: update objects

    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('window:resize')
  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse.x = event.clientX - window.innerWidth / 2;
    this.mouse.y = event.clientY - window.innerHeight / 2;
  }

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    // TODO: handle ship zoom or other actions
  }

  @HostListener('window:click')
  onClick() {
    // TODO: handle gun fire
  }
}
