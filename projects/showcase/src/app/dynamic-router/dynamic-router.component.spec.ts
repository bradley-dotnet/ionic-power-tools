import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicRouterComponent } from './dynamic-router.component';

describe('DynamicRouterComponent', () => {
  let component: DynamicRouterComponent;
  let fixture: ComponentFixture<DynamicRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicRouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
