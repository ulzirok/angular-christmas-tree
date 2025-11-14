import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreePage } from './tree-page';

describe('TreePage', () => {
  let component: TreePage;
  let fixture: ComponentFixture<TreePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreePage],
    }).compileComponents();

    fixture = TestBed.createComponent(TreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
