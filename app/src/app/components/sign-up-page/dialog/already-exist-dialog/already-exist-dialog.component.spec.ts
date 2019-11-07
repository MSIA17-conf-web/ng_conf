import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyExistDialogComponent } from './already-exist-dialog.component';

describe('AlreadyExistDialogComponent', () => {
  let component: AlreadyExistDialogComponent;
  let fixture: ComponentFixture<AlreadyExistDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlreadyExistDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyExistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
