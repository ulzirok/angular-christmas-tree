import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonUp } from './button-up';

describe('ButtonUp', () => {
  let component: ButtonUp;
  let fixture: ComponentFixture<ButtonUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonUp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
