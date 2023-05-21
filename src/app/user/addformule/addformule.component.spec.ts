import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddformuleComponent } from './addformule.component';

describe('AddformuleComponent', () => {
  let component: AddformuleComponent;
  let fixture: ComponentFixture<AddformuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddformuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddformuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
