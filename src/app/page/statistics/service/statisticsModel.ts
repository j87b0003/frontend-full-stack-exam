import {
    ReqModel,
    RespModel
  } from 'app/service/coreModel';
  
  export interface StatisticsGetRespModel extends RespModel {
    data: {
      info: StatisticsModel;
    };
  }
  
  export class StatisticsModel { 

    number: number;
  }
  