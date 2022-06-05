import {
  ReqModel,
  RespModel
} from 'app/service/coreModel';

export interface UserGetRespModel extends RespModel {
  data: {
    info: UserModel;
  };
}

export class UserModel { 
  id: string;
  email: string;
  name?: string;
  accessToken?: string;
  verify: boolean;
  verifytoken: string;
  createdTime: string;
  updateTime: string;
  loginCount: number;
}
