import { Component, ElementRef, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IPost } from '../../../core/interfaces/ipost';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { PostService } from '../../../core/services/post.service';
import Swal from 'sweetalert2'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [DatePipe, FormsModule, RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post!: IPost;
  public readonly _AuthenticationService: AuthenticationService = inject(AuthenticationService);
  private readonly _PostService: PostService = inject(PostService);
  isPostOptionMenuCollapsed: boolean = false;


  postOptMenuCollapse(): void {
    if (this.isPostOptionMenuCollapsed) this.isPostOptionMenuCollapsed = false;
    else this.isPostOptionMenuCollapsed = true;
  }


  deletePost(postId: string): void {
    this._PostService.deletePost(postId).subscribe({
      next: res => {
        console.log(res);
        Swal.fire({
          title: "Done!",
          text: "Post has deleted Successfuly !",
          icon: "success"
        });
        this.isPostOptionMenuCollapsed = false;
      },
      error: err => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while deleting this post!"
        });
        this.isPostOptionMenuCollapsed = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.isPostOptionMenuCollapsed = false;
  }
}
