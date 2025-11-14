import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonVolume } from './button-volume';

describe('ButtonVolume', () => {
  let component: ButtonVolume;
  let fixture: ComponentFixture<ButtonVolume>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonVolume]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonVolume);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
