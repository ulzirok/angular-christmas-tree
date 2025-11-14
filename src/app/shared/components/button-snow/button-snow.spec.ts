import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSnow } from './button-snow';

describe('ButtonSnow', () => {
  let component: ButtonSnow;
  let fixture: ComponentFixture<ButtonSnow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSnow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonSnow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
