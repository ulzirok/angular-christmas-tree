import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToysList } from './toys-list';

describe('ToysList', () => {
  let component: ToysList;
  let fixture: ComponentFixture<ToysList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToysList],
    }).compileComponents();

    fixture = TestBed.createComponent(ToysList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
