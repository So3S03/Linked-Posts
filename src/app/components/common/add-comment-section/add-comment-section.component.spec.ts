import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentSectionComponent } from './add-comment-section.component';

describe('AddCommentSectionComponent', () => {
  let component: AddCommentSectionComponent;
  let fixture: ComponentFixture<AddCommentSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCommentSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCommentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
