import { Validators } from '@angular/forms';

export interface ReqModel {
  body?: object;
}

export interface RespModel {
  code: number;
  msg?: string;
  errors?: object[];
  data?: {
    info?: object | any;
  };
}

export const ValidatorModel = {
  required: (ary = []) => {
    let validatorAry = [
      Validators.required,
      Validators.nullValidator
    ];
    if (ary.length !== 0) {
      ary.forEach(val => {
        validatorAry.push(val)
      })
    }
    return validatorAry;
  }
}
