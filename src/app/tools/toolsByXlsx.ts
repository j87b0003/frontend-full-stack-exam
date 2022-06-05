import { TradingRecordModel } from 'app/page/tradingRecord/service/tradingRecordModel';

export const ToolsByXlsx = {
  fields: {
    tradingRecord: [
      '建立時間',
      '到帳時間',
      '金流單號',
      '是否付款',
      '是否退款',
      '取餐號碼',
      '訂單類型',
      '付款方式',
      '訂單狀態',
      '消費者取消',
      '手續費',
      '入帳金額',
      '總計金額'
    ]
  },
  val: {
    tradingRecord(obj: TradingRecordModel, _date, _translate) {
      const d = [
        _date.transform(obj.createdAt, 'yyyy/MM/dd HH:mm'),
        _date.transform(obj.payment.postingDate, 'yyyy/MM/dd'),
        obj.payment.no,
        _translate.get('form.bool', obj.payment.flag),
        _translate.get('form.bool', obj.payment.refund),
        obj.queueNo,
        _translate.get('tradingRecord.enum.type', obj.type),
        _translate.get('tradingRecord.enum.paymentType', obj.paymentType),
        _translate.get('tradingRecord.enum.state', obj.state),
        (obj.state == 'cancelConfirm') ? _translate.get('form.bool', obj.cancelWithUserFlag) : '',
        (obj.payment.fee) ? obj.payment.fee : 0,
        (obj.payment.fee) ? obj.amount - obj.payment.fee : 0,
        obj.amount
      ]
      return d;
    }
  }
};
