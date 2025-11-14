import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonReset } from './button-reset';

describe('ButtonReset', () => {
  let component: ButtonReset;
  let fixture: ComponentFixture<ButtonReset>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonReset]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonReset);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
