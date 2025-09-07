import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLayOutComponent } from './auth-lay-out.component';

describe('AuthLayOutComponent', () => {
  let component: AuthLayOutComponent;
  let fixture: ComponentFixture<AuthLayOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLayOutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthLayOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
