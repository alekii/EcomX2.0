import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullContainer } from './full-container.component';

describe('FullContainer', () => {
  let component: FullContainer;
  let fixture: ComponentFixture<FullContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
