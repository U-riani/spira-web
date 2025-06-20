import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecesSliderComponent } from './pieces-slider.component';

describe('PiecesSliderComponent', () => {
  let component: PiecesSliderComponent;
  let fixture: ComponentFixture<PiecesSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiecesSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiecesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
