import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullSignUpDialogComponent } from './successfull-sign-up-dialog.component';

describe('SuccessfullSignUpDialogComponent', () => {
  let component: SuccessfullSignUpDialogComponent;
  let fixture: ComponentFixture<SuccessfullSignUpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfullSignUpDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfullSignUpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
