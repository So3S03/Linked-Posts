import { Component, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnDestroy{
  private readonly _FormBuilder: FormBuilder = inject(FormBuilder);
  private readonly _AuthService: AuthenticationService = inject(AuthenticationService);
  private readonly _Router: Router = inject(Router);
  private readonly _PlatformId = inject(PLATFORM_ID);
  isLoading: boolean = false;
  isSuccess: boolean = false;
  isError: boolean = false;
  userData = this._FormBuilder.group({
    email: [null, [Validators.email, Validators.required]],
    password: [null, [Validators.required]]
  })

  login(): void
  {
    if(this.userData.valid)
    {
      this.isError = false;
      this.isSuccess = false;
      this.isLoading = true;
      this._AuthService.signIn(this.userData.value).subscribe({
        next: res => {
          this.isSuccess = true;
          setTimeout(() => {
            if(isPlatformBrowser(this._PlatformId))
            {
              localStorage.setItem("socialToken", res.token)
              this._Router.navigate(["/TimeLine"])
            }
            this.isSuccess = false;
          }, 5000)
          this.userData.reset();
        },
        error: err => {
          this.isError = true;
          console.log(err);
          this.isLoading = false;
        }
      })
    }
  }
  ngOnDestroy(): void {
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;
    this.userData.reset();
  }
}
