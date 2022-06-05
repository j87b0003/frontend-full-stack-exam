import { RespModel } from './coreModel';

// 儲存
export interface UploadPostReqModel {
  body: {
    service: string;
    alias: string;
    refUid?: string;
  };
}

export interface UploadRespModel extends RespModel {
  data: {
    info: UploadModel;
  };
}

export class UploadModel {
  _id: string;
  alias: string;
  filename: string;
  mimeType: string;
  size: number;
  service: string;
  refUid: string;
  small: string;
  medium: string;
  large: string;
  meta: any[];
}
export interface UploadUpdateSysReqModel {
  _id: string;
  body: {
    refId?: string,
    delete?: boolean
  }
}

export interface UploadUpdateSysRespModel extends RespModel {
  data: {
    info: {
      _id: string
    }
  }
}
