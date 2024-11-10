import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountContentViewComponent } from './account-content-view.component';

describe('AccountContentViewComponent', () => {
  let component: AccountContentViewComponent;
  let fixture: ComponentFixture<AccountContentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountContentViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
