import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { BtnCancelComponent } from "./btn-cancel/btn-cancel.component";
import { BtnBackComponent } from "./btn-back/btn-back.component";
import { BtnSaveComponent } from "./btn-save/btn-save.component";
import { BtnSubmitComponent } from "./btn-submit/btn-submit.component";
import { FormsModule } from "@angular/forms";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    CommonModule,
    FormsModule,
  ],
  exports: [
    BtnCancelComponent,
    BtnBackComponent,
    BtnSaveComponent,
    BtnSubmitComponent
  ],
  declarations: [
    BtnCancelComponent,
    BtnBackComponent,
    BtnSaveComponent,
    BtnSubmitComponent
  ],
})
export class WidgetModule {}
