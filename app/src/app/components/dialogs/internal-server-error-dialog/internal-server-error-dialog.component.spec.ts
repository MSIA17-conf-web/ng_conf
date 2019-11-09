import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalServerErrorDialogComponent } from './internal-server-error-dialog.component';

describe('InternalServerErrorDialogComponent', () => {
  let component: InternalServerErrorDialogComponent;
  let fixture: ComponentFixture<InternalServerErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalServerErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalServerErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
