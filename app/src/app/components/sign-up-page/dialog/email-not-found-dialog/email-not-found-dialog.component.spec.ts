import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailNotFoundDialogComponent } from './email-not-found-dialog.component';

describe('EmailNotFoundDialogComponent', () => {
  let component: EmailNotFoundDialogComponent;
  let fixture: ComponentFixture<EmailNotFoundDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailNotFoundDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailNotFoundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
