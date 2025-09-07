import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import { Comment, IPost } from '../../../core/interfaces/ipost';
import { CommentService } from '../../../core/services/comment.service';
import { CommentsComponent } from '../../common/comments/comments.component';
import { FormsModule } from '@angular/forms';
import { PostComponent } from '../post/post.component';
import { AddCommentSectionComponent } from '../../common/add-comment-section/add-comment-section.component';
import { AddPostSectionComponent } from '../../common/add-post-section/add-post-section.component';
import { Subscription } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-time-line',
  standalone: true,
  imports: [CommentsComponent, FormsModule, PostComponent, AddCommentSectionComponent, AddPostSectionComponent, InfiniteScrollModule],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.css'
})
export class TimeLineComponent implements OnInit, OnDestroy{
  private readonly _PostService: PostService = inject(PostService);
  private readonly _CommentService: CommentService = inject(CommentService);
  Posts: WritableSignal<IPost[]> = signal([]);
  Comments: WritableSignal<Comment[]> = signal([]);
  PostId!: string;
  postServiceSubscription!: Subscription;
  isLoading: boolean = false;
  //pagination data
  currentPage: number = 1;
  totalPosts!: number;
  numberOfPages!: number;

  ngOnInit(): void {
    //posts
    this.postServiceSubscription =  this._PostService.getAllPosts().subscribe(
      {
        next: res => {
          this.Posts.set(res.posts.reverse());
          this.currentPage = res.paginationInfo.currentPage;
          this.totalPosts = res.paginationInfo.total;
          this.numberOfPages = res.paginationInfo.numberOfPages;
        },
        error: err => console.log(err)
      }
    )
  }


  loadPosts(): void
  {
    this.isLoading = true;
    if(this.currentPage > this.numberOfPages)
    {
      this.isLoading = false;
      return;
    }
    if(this.currentPage === 1) this.currentPage = 2;
    this._PostService.getAllPosts(this.currentPage).subscribe({
      next: res => {
        this.Posts.update(oldPosts => [...oldPosts, ...res.posts.reverse()]);
        this.currentPage = this.currentPage + 1;
        this.totalPosts = res.paginationInfo.total;
        this.numberOfPages = res.paginationInfo.numberOfPages;
        this.isLoading = false;
      },
      error: err => {
        console.log(err)
        this.isLoading = false;
      }
    })
  }

  showComments(postId: string): void
  {
    this.PostId = postId
    this._CommentService.getPostComment(postId).subscribe(
      {
        next: res => {
          this.Comments.set(res.comments)
        },
        error: err => {
          console.log(err)
        }
      }
    )
  }

  updateComments(comments: Comment[])
  {
    this.Comments.set(comments);
  }

  ngOnDestroy(): void {
    this.postServiceSubscription.unsubscribe();
  }
}
