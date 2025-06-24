import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroArtComponent } from './hero-art.component';

describe('HeroArtComponent', () => {
  let component: HeroArtComponent;
  let fixture: ComponentFixture<HeroArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroArtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
