import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BnavbarComponent } from './bnavbar.component';

describe('BnavbarComponent', () => {
  let component: BnavbarComponent;
  let fixture: ComponentFixture<BnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
