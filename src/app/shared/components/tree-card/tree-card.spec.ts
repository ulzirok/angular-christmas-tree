import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeCard } from './tree-card';

describe('TreeCard', () => {
  let component: TreeCard;
  let fixture: ComponentFixture<TreeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
