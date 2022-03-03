import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutofstockComponent } from './outofstock.component';

describe('OutofstockComponent', () => {
  let component: OutofstockComponent;
  let fixture: ComponentFixture<OutofstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutofstockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutofstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
