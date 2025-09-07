import { Component, ElementRef, inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Subscription } from 'rxjs';
import { IUser } from '../../../core/interfaces/iuser';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent implements OnDestroy {
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  public readonly _AuthenticationService: AuthenticationService = inject(AuthenticationService);
  isChangePassLoad: boolean = false;
  isUploadPhotoLoad: boolean = false;
  @ViewChild("changePassClsBtn") changePassCloseBtn!: ElementRef;
  @ViewChild("uploadPhotoClsBtn") uploadPhotoCloseBtn!: ElementRef;
  ImageInput!: HTMLInputElement;
  SavedImage!: File;

  changePasswordData: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[!@#$%&*])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)]),
  })



  changeImage(e: Event): void {
    this.ImageInput = e.target as HTMLInputElement;
    if (this.ImageInput.files && this.ImageInput.files.length > 0) {
      this.SavedImage = this.ImageInput.files[0];
    }
  }

  UploadPhoto(): void {
    this.isUploadPhotoLoad = true;
    let formData: FormData | null = null;
    if (this.SavedImage) {
      formData = new FormData();
      formData.append("photo", this.SavedImage);
    }
    if (formData !== null) {
      this._AuthenticationService.uploadProfilePhoto(formData).subscribe({
        next: res => {
          this.isUploadPhotoLoad = false;
          console.log(res);
          Swal.fire({
            title: "Success!",
            text: "Your Photo is uploaded successfuly!",
            icon: "success"
          });
          this.uploadPhotoCloseBtn.nativeElement.click();
        },
        error: err => {
          this.isUploadPhotoLoad = false;
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong while adding this photo !"
          });
        }
      })
    }
  }

  changePasswordSubmition(): void {
    if (this.changePasswordData.valid) {
      this.isChangePassLoad = true;
      this._AuthenticationService.changePassword(this.changePasswordData.value).subscribe({
        next: res => {
          if (isPlatformBrowser(this._PLATFORM_ID)) {
            localStorage.setItem("socialToken", res.token);
          }
          console.log(res.token);
          Swal.fire({
            title: "Success!",
            text: "Your password has been changed successfuly!",
            icon: "success"
          });
          this.isChangePassLoad = false;
          this.changePassCloseBtn.nativeElement.click();
        },
        error: err => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
          this.isChangePassLoad = false;
        }
      })
    }
  }


  ngOnDestroy(): void {
    this.isChangePassLoad = false;
    this.isUploadPhotoLoad = false;
  }

}
