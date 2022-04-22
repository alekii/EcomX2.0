import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfContainerComponent } from './half-container.component';

describe('HalfContainerComponent', () => {
  let component: HalfContainerComponent;
  let fixture: ComponentFixture<HalfContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HalfContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HalfContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
