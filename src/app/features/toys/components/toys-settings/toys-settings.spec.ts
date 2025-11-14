import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToysSettings } from './toys-settings';

describe('ToysSettings', () => {
  let component: ToysSettings;
  let fixture: ComponentFixture<ToysSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToysSettings],
    }).compileComponents();

    fixture = TestBed.createComponent(ToysSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
