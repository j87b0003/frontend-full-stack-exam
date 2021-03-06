import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";

import { ErrorPageComponent } from "./error/error-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { SignupComponent } from "./signup/signup.component";
import { ConfirmEmailComponent } from "./confirmEmail/confirmEmail.component";
import { WidgetModule } from "../../widget/widget.module";


@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule ,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule,
        WidgetModule
    ],
    declarations: [
        ErrorPageComponent,
        LoginPageComponent,
        SignupComponent,
        ConfirmEmailComponent
    ]
})
export class ContentPagesModule { }
