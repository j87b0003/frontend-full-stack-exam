import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AuthService } from 'app/shared/auth/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.pug',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

  formSubmitted = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
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
    return this.loginForm.controls;
  }

  signInWithGoogle() {
    this.socialAuthServ.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook() {
    this.socialAuthServ.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }

}
