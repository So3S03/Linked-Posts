import { Component, inject, OnDestroy, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { AddPostSectionComponent } from "../../common/add-post-section/add-post-section.component";
import { PostService } from '../../../core/services/post.service';
import { Comment, IPost } from '../../../core/interfaces/ipost';
import { Subscription } from 'rxjs';
import { PostComponent } from "../post/post.component";
import { CommentsComponent } from "../../common/comments/comments.component";
import { CommentService } from '../../../core/services/comment.service';
import { AddCommentSectionComponent } from "../../common/add-comment-section/add-comment-section.component";
import { AuthenticationService } from '../../../core/services/authentication.service';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [AddPostSectionComponent, CommentsComponent, AddCommentSectionComponent, PostComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit, OnDestroy{
  private readonly _PostService: PostService = inject(PostService);
  private readonly _CommentService: CommentService = inject(CommentService);
  public readonly _AuthenticationService: AuthenticationService = inject(AuthenticationService);
  userPostsSubscription!: Subscription;
  userPosts: WritableSignal<IPost[]> = signal([]);
  postsCommentsSubscription!: Subscription;
  postComments: WritableSignal<Comment[]> = signal([]);
  PostId!:string;
  selectedCommentToUpdate!:Comment;

  ngOnInit(): void {
    this.userPostsSubscription = this._PostService.getUserPosts().subscribe({
      next: res => {
        this.userPosts.set(res.posts.reverse());
      },
      error: err => console.log(err)
    })
  }

  showComments(postId: string): void
  {
    this.PostId = postId;
    this.postsCommentsSubscription = this._CommentService.getPostComment(postId).subscribe({
      next: res => {
        this.postComments.set(res.comments);
      }
    })
  }

  updateComments(comments: Comment[])
  {
    this.postComments.set(comments);
  }

  ngOnDestroy(): void {
      this.userPostsSubscription.unsubscribe();
  }

  setSelectedCommentToUpdate(comment: Comment): void
  {
    this.selectedCommentToUpdate = comment;
  }
}
