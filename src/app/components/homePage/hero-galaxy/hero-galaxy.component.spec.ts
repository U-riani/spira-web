import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroGalaxyComponent } from './hero-galaxy.component';

describe('HeroGalaxyComponent', () => {
  let component: HeroGalaxyComponent;
  let fixture: ComponentFixture<HeroGalaxyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroGalaxyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroGalaxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
