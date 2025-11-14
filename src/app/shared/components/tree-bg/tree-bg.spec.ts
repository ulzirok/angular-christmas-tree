import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeBg } from './tree-bg';

describe('TreeBg', () => {
  let component: TreeBg;
  let fixture: ComponentFixture<TreeBg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeBg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeBg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
