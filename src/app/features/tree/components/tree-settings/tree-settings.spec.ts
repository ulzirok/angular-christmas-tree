import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeSettings } from './tree-settings';

describe('TreeSettings', () => {
  let component: TreeSettings;
  let fixture: ComponentFixture<TreeSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeSettings],
    }).compileComponents();

    fixture = TestBed.createComponent(TreeSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
