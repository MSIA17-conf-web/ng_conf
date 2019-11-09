import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenNotMatchDialogComponent } from './token-not-match-dialog.component';

describe('TokenNotMatchDialogComponent', () => {
  let component: TokenNotMatchDialogComponent;
  let fixture: ComponentFixture<TokenNotMatchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenNotMatchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenNotMatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
