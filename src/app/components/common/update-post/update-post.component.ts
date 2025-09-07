import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../core/services/post.service';
import Swal from 'sweetalert2';
import { IPost } from '../../../core/interfaces/ipost';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-post',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.css'
})
export class UpdatePostComponent implements OnInit, OnDestroy {
  private readonly _ActivatedRoute: ActivatedRoute = inject(ActivatedRoute);
  postId!: string;
  private readonly _PostService: PostService = inject(PostService);
  private PostServSubscribtion!: Subscription;
  private readonly _Router: Router = inject(Router);
  post!: IPost;
  //updatePostProps
  imagePath!: string;
  imageFile!: File | null;
  imageInput!: HTMLInputElement;
  postContent!: string;


  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => this.postId = params["id"]);
    this.PostServSubscribtion = this._PostService.getSinglePost(this.postId).subscribe({
      next: res => {
        this.post = res.post;
        this.imagePath = res.post.image;
        this.postContent = res.post.body;
        if (this.imagePath) {
          (async () => {
            let res = await fetch(this.imagePath);
            const blob = await res.blob();
            this.imageFile = new File([blob], this.imagePath, { type: blob.type });
          })()
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  holdImage(e: Event): void {
    this.imageInput = e.target as HTMLInputElement;
    if (this.imageInput.files && this.imageInput.files.length > 0) {
      this.imageFile = this.imageInput.files[0];
      this.imagePath = URL.createObjectURL(this.imageFile);
    }
  }

  deletePhoto(): void {
    //tried to delete photo while updating post but the problem came from back-end after saving the photo from the first time it can't be
    this.imageFile = null;
    this.imagePath = "";
      }

  updatePostData(): void {
    let formData: FormData = new FormData();
    if (this.postContent) formData.append("body", this.postContent);
    if (this.imageFile) formData.append("image", this.imageFile);
    if (formData.has("body") || formData.has("image")) {
      this._PostService.updatePost(this.postId, formData).subscribe({
        next: res => {
          Swal.fire({
            title: "Done!",
            text: "Your post has been updated successfuly!",
            icon: "success"
          });
          this._Router.navigate(["/PostDetailes", this.postId])
        },
        error: err => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        }
      })
    }
  }

  goHome(): void
  {
    this._Router.navigate(["/TimeLine"]);
  }

  ngOnDestroy(): void {
    this.PostServSubscribtion.unsubscribe();
    this.imagePath = "";
    this.imageFile = null;
    this.postContent = "";
  }
}
