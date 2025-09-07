import { Component, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../../core/services/comment.service';
import { Comment } from '../../../core/interfaces/ipost';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-comment-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-comment-section.component.html',
  styleUrl: './add-comment-section.component.css'
})
export class AddCommentSectionComponent {
  @Input() postId!: string;
  commentContent!: string;
  private readonly _CommentService: CommentService = inject(CommentService);
  @Output() Comments: EventEmitter<Comment[]> = new EventEmitter<Comment[]>();
  addComment(postId: string): void {
    let commentData = {
      content: this.commentContent,
      post: postId
    }
    this._CommentService.createComment(commentData).subscribe({
      next: res => {
        this.commentContent = "";
        Swal.fire({
          title: "Done!",
          text: "Your Comment Has Been Added Successfuly",
          icon: "success"
        });
        this.Comments.emit(res.comments);
      },
      error: err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong adding this comment!",
        });
        console.log(err);
      }
    })
  }
}
