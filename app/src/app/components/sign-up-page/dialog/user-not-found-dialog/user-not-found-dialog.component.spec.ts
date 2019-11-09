import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotFoundDialogComponent } from './user-not-found-dialog.component';

describe('UserNotFoundDialogComponent', () => {
  let component: UserNotFoundDialogComponent;
  let fixture: ComponentFixture<UserNotFoundDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNotFoundDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNotFoundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
