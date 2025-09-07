import { Component, ElementRef, EventEmitter, inject, OnDestroy, OnInit, Output, Renderer2, signal, ViewChild, WritableSignal } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { IUser } from '../../../core/interfaces/iuser';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../core/services/post.service';
import Swal from 'sweetalert2';
import { IPost } from '../../../core/interfaces/ipost';

@Component({
  selector: 'app-add-post-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-post-section.component.html',
  styleUrl: './add-post-section.component.css'
})
export class AddPostSectionComponent {
  public readonly _AuthenticationService: AuthenticationService = inject(AuthenticationService);
  private readonly _PostService: PostService = inject(PostService);
  postContent!: string;
  ImageInput!: HTMLInputElement;
  imagePath!: string;
  image!: File | null;
  @ViewChild("closeBtn") ModalCloseBtn!:ElementRef;

  holdImage(e: Event): void {
    this.ImageInput = e.target as HTMLInputElement;
    if (this.ImageInput.files && this.ImageInput.files.length > 0) {
      this.image = this.ImageInput.files[0];
      this.imagePath = URL.createObjectURL(this.image);
    }
  }

  addPost(): void {
    const formData: FormData = new FormData();
    if(this.postContent) formData.append("body", this.postContent);
    if(this.image !== null) formData.append("image", this.image);
    if (this.postContent || this.image) {
      this._PostService.createPost(formData).subscribe({
        next: res => {
          Swal.fire({
            title: "Done!",
            text: "Your post has been added successfuly!",
            icon: "success"
          });
          this.postContent = "";
          if(this.ImageInput) this.ImageInput.value = "";
          this.ModalCloseBtn.nativeElement.click();
        },
        error: err => {
          console.log(err),
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!"
            });
        }
      })
    }
  }

  deletePhoto(): void
  {
    this.imagePath = "";
    this.image = null;
  }
}
