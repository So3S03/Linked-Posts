import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { IPost } from '../../../core/interfaces/ipost';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../core/services/post.service';
import { CommentsComponent } from '../../common/comments/comments.component';
import { FormsModule } from '@angular/forms';
import { PostComponent } from '../post/post.component';
import { AddCommentSectionComponent } from '../../common/add-comment-section/add-comment-section.component';

@Component({
  selector: 'app-post-detailes',
  standalone: true,
  imports: [ CommentsComponent, FormsModule, PostComponent, AddCommentSectionComponent],
  templateUrl: './post-detailes.component.html',
  styleUrl: './post-detailes.component.css'
})
export class PostDetailesComponent implements OnInit{
  private readonly _PostService: PostService = inject(PostService);
  private readonly _ActivatedRoute: ActivatedRoute = inject(ActivatedRoute);
  Comments: WritableSignal<Comment[]> = signal([]);
  PostId!: string
  Post!:IPost;

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => {
      this.PostId = params['id'];
    })
    this._PostService.getSinglePost(this.PostId).subscribe({
      next: res => {
        this.Post = res.post;
      },
      error: err => console.log(err)
    })
  }

}
