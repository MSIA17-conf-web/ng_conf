import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenContactResponseDialogComponent } from './open-contact-response-dialog.component';

describe('OpenContactResponseDialogComponent', () => {
  let component: OpenContactResponseDialogComponent;
  let fixture: ComponentFixture<OpenContactResponseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenContactResponseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenContactResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
