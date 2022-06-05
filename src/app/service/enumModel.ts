import { ReqModel, RespModel } from './coreModel';

export class EnumForDaxinModel {
  adminRole: [];
  tradingRecordType: [];
  tradingRecordState: [];
  delayTime: [];
}

export interface EnumForDaxinRespModel extends RespModel {
  data: {
    enum: EnumForDaxinModel
  };
}

export class EnumForPaymentModel {
  newebpayForStoreDataStoreType: [];
  newebpayForStoreDataType: [];
  newebpayForStoreDataIDCardPlace: [];
  newebpayForStoreDataBusinessType: [];
  newebpayTradingRecordState: [];
  newebpayTradingRecordType: [];
}
export interface EnumForPaymentRespModel extends RespModel {
  data: {
    enum: EnumForPaymentModel
  };
}

export class EnumForStoreModel {
  invoiceType: [];
  political: [];
  preloadType: [];
  contractState: [];
  contractItem: [];
}
export interface EnumForStoreRespModel extends RespModel {
  data: {
    enum: EnumForStoreModel
  };
}