import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyUserExistComponent } from './already-user-exist.component';

describe('AlreadyUserExistComponent', () => {
  let component: AlreadyUserExistComponent;
  let fixture: ComponentFixture<AlreadyUserExistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlreadyUserExistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyUserExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
