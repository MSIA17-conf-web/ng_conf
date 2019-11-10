import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenSentDialogComponent } from './token-sent-dialog.component';

describe('TokenSentDialogComponent', () => {
  let component: TokenSentDialogComponent;
  let fixture: ComponentFixture<TokenSentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenSentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenSentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
