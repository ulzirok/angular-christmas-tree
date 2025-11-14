import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChristmasTree } from './christmas-tree';

describe('ChristmasTree', () => {
  let component: ChristmasTree;
  let fixture: ComponentFixture<ChristmasTree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChristmasTree],
    }).compileComponents();

    fixture = TestBed.createComponent(ChristmasTree);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
