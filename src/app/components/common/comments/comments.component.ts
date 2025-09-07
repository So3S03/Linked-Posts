import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Comment } from '../../../core/interfaces/ipost';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { CommentService } from '../../../core/services/comment.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  @Input({ required: true }) Comment!: Comment;
  commentContent!: string;
  isCommentOptMenuCollapsed: boolean = false;
  public readonly _AuthenticationService: AuthenticationService = inject(AuthenticationService);
  private readonly _CommentService: CommentService = inject(CommentService);
  isUpdateComment: boolean = false;
  CommentOptMenuCollapse(): void {
    if (this.isCommentOptMenuCollapsed) this.isCommentOptMenuCollapsed = false
    else this.isCommentOptMenuCollapsed = true
  }

  deleteComment(commentId: string): void {
    //Note That I can't delete comment in post that doesn't belong to me (Back-end problem)
    //Only My Posts That I can delete my comments on it
    this._CommentService.deleteComment(commentId).subscribe({
      next: res => {
        console.log(res);
        Swal.fire({
          title: "Done!",
          text: "You have deleted this Comment!",
          icon: "success"
        });
        this.isCommentOptMenuCollapsed = false;
      },
      error: err => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong deleteing this comment!"
        });
        this.isCommentOptMenuCollapsed = false;
      }
    })
  }


  getOldComment(): void {
    this.commentContent = this.Comment.content ? this.Comment.content : "There were no comment here";
  }

  updateComment(commentId: string): void {
    if (this.commentContent) {
      this._CommentService.updateComment(commentId, this.commentContent).subscribe({
        next: res => {
          Swal.fire({
            title: "Done!",
            text: "You have updated this Comment!",
            icon: "success"
          });
          this.Comment = res.comment;
          this.isCommentOptMenuCollapsed = false;
          this.isUpdateComment = false;
          this.commentContent = "";
        },
        error: err => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong updating this comment!"
          });
          this.isCommentOptMenuCollapsed = false;
        }
      })
    }
  }
}
