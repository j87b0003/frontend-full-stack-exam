import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from 'app/shared/auth/auth.service';
import { ValidatorModel } from 'app/service/coreModel';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.pug',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  formSubmitted = false;

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    reenterPassword: new FormControl(undefined, ValidatorModel.required([this.matchValidator('password')]))
  });

  constructor(
    private authService: AuthService,
    private socialAuthServ: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.socialAuthServ.authState.subscribe(user => {
      this.authService.oAuthSignIn(user);
    })
  }

  get lf() {
    return this.signupForm.controls;
  }

  signInWithGoogle() {
    this.socialAuthServ.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook() {
    this.socialAuthServ.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  onSubmit() {
    console.log(this.signupForm.controls)
    this.formSubmitted = true;
    if (this.signupForm.invalid) {
      return;
    }

    this.authService.signup(
      this.signupForm.value.email,
      this.signupForm.value.password
    );
  }

  private matchValidator(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

}
