import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnDestroy{
  private readonly _FormBuilder: FormBuilder = inject(FormBuilder);
  private readonly _AuthService: AuthenticationService = inject(AuthenticationService);
  private readonly _Router: Router = inject(Router);
  isLoading: boolean = false;
  isSuccess: boolean = false;
  isError: boolean = false;
  errorMsg: string = "";

  userData: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null,[Validators.required, Validators.pattern(/^(?=.*[!@#$%&*])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)]],
    rePassword: [null, [Validators.required]],
    dateOfBirth: [null, [Validators.required, this.UserAgeCheck]],
    gender: [null, [Validators.required, this.genderLimitationCheck]]
  },
  {
    validators: [this.ConfirmPasswordCheck]
  }
)

//Custom Validations
//comparison between password & rePassword
  ConfirmPasswordCheck(control: AbstractControl): ValidationErrors | null
  {
    const PasswordControl = control.get("password");
    const rePasswordControl = control.get("rePassword");
    if(PasswordControl?.value !== rePasswordControl?.value)
    {
      return {
        mismatch: true
      }
    }
    return null
  }

  //check if the user age is more than 16 years
  UserAgeCheck(control: AbstractControl): ValidationErrors | null
  {
    const birthDateControl = control;
    const currentDate = new Date().getFullYear();
    const userDate = new Date(birthDateControl?.value).getFullYear();
    if(currentDate - userDate >= 16 && currentDate - userDate <= 100)
    {
      return null
    }

    return {
      userAgeInValid: true
    }
  }

  //make limitation values for gender (eather male or female only)
  genderLimitationCheck(control: AbstractControl): ValidationErrors | null
  {
    const genderControl = control;
    if(genderControl?.value === "male" || genderControl?.value === "female")
    {
      return null
    }

    return {
      genderValueInValid: true
    }
  }


  Register(): void
  {
    console.log(this.userData)
    if(this.userData.valid)
      {
      this.isLoading = true;
      this.isError = false;
      this.isSuccess = false;
      this._AuthService.signUp(this.userData.value).subscribe({
        next: () => {
          this.isSuccess = true;
          this.isLoading = false;
          setTimeout( () => {
            this.isSuccess = false;
            this.userData.reset();
            this._Router.navigate(["/SignIn"]);
          }, 5000 )
        },
        error: err => {
          this.isLoading = false;
          this.isError = true;
          this.errorMsg = err.error.error
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.isError = false;
    this.isLoading = false;
    this.isSuccess = false;
    this.errorMsg = "";
    this.userData.reset();
  }
}
