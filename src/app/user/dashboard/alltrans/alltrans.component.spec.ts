import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltransComponent } from './alltrans.component';

describe('AlltransComponent', () => {
  let component: AlltransComponent;
  let fixture: ComponentFixture<AlltransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlltransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlltransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
