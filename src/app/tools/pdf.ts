import { StoreModel } from 'app/page/store/service/storeModel';
import * as pdfMake from 'pdfmake/build/pdfmake';

export const Pdf = {
    setting: {
        init: {
            pageSize: 'A4',
            pageMargins: [0, 0, 0, 0],
            pageOrientation: 'landscape'
        },
        cmToPx: 28.346457,
        noPadding: {
            hLineWidth: () => 0,
            vLineWidth: () => 0,
            paddingLeft: () => 0,
            paddingRight: () => 0,
            paddingTop: () => 0,
            paddingBottom: () => 0
        }
    },
    accountAndPassword: (store: StoreModel, account: string, password: string) => {
        const marginV = 0.55 * Pdf.setting.cmToPx;
        const marginH = 0.7 * Pdf.setting.cmToPx;
        const setting = {
            pageSize: {
                width: 10.5 * Pdf.setting.cmToPx,
                height: 4.95 * Pdf.setting.cmToPx
            },
            pageMargins: [marginH, marginV, marginH, marginV],
            pageOrientation: 'landscape'
        }
        const fontSize = 11
        const content = [
            {
                layout: Pdf.setting.noPadding,
                table: {
                    body: [
                        [{
                            text: '餐廳名稱： ' + store.name, fontSize: fontSize
                        }],
                        [{
                            text: '登入帳號： ' + account, fontSize: fontSize,
                            margin: [0, 3]
                        }],
                        [{
                            text: '密　　碼： ' + password, fontSize: fontSize
                        }],
                        [{
                            text: '服務電話： 0800-035022', fontSize: fontSize,
                            margin: [0, 3]
                        }],
                        [{
                            text: '',
                            margin: [0, 9]
                        }],
                        [{
                            text: '平板序號： ' + store.no.pad.toUpperCase() + '　' + '出單機序號： ' + store.no.printer.toUpperCase(), fontSize: fontSize - 2
                        }]
                    ]
                }
            }
        ]

        Pdf.create(setting, content, store.name);
    },
    tableId: (startId: number, endId: number, storeId: string, storeName: string) => {
        const setting = {
            pageSize: 'A4',
            pageMargins: [0, 0, 0, 0],
            pageOrientation: 'landscape'
        }
        const fieldCount = 6;
        const body = [];
        const data = [];
        const url = 'https://qrcode.prod.api.35money.com.tw/eatIn/' + storeId + '/';
        storeName = (storeName.length > 24) ?
            storeName.substr(0, 24) :
            (storeName.length <= 12) ? '\r\n' + storeName : storeName;

        for (let i = startId; i <= endId; i++) {
            data.push({
                layout: Pdf.setting.noPadding,
                table: {
                    widths: [1.06 * Pdf.setting.cmToPx, 33.3, 0.81 * Pdf.setting.cmToPx],
                    body: [[
                        '',
                        {
                            layout: Pdf.setting.noPadding,
                            table: {
                                body: [[
                                    {
                                        text: storeName,
                                        fontSize: 7,
                                        margin: [0, 0, 0, 0.1 * Pdf.setting.cmToPx]
                                    }
                                ], [{
                                    table: {
                                        alignment: 'center',
                                        body: [[
                                            {
                                                qr: url + i,
                                                fit: 3.33 * Pdf.setting.cmToPx
                                            }
                                        ]]
                                    },
                                    layout: {
                                        hLineColor: '#999',
                                        vLineColor: '#999',
                                        paddingLeft: () => 0.365 * Pdf.setting.cmToPx,
                                        paddingRight: () => 0.365 * Pdf.setting.cmToPx,
                                        paddingTop: () => 0.365 * Pdf.setting.cmToPx,
                                        paddingBottom: () => 0.365 * Pdf.setting.cmToPx
                                    }
                                }], [{
                                    text: ('0' + i).slice(-2),
                                    alignment: 'center',
                                    bold: true,
                                    fontSize: 24
                                }]]
                            }
                        },
                        ''
                    ]]
                }
            })
        }

        data.forEach((obj, i) => {
            const index = Math.floor(i / fieldCount);
            if (!body[index]) {
                body[index] = [];
            }
            body[index].push(obj);
        })
        const len = body[body.length - 1].length
        for (let i = len; i < fieldCount; i++) {
            body[body.length - 1].push('');
        }

        const fieldWidth = 4.95 * Pdf.setting.cmToPx
        const content = [
            {
                layout: Pdf.setting.noPadding,
                table: {
                    widths: [fieldWidth, fieldWidth, fieldWidth, fieldWidth, fieldWidth, fieldWidth],
                    body: body
                }
            }
        ]

        Pdf.create(setting, content, storeName);
    },
    create: (setting, content, filename) => {
        pdfMake.fonts = {
            NotoSansTC: {
                normal: 'http://fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Regular.woff2',
                mdeium: 'http://fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Medium.woff2',
                bold: 'http://fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Bold.woff2',
                black: 'http://fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Black.woff2'
            }
        }

        const docDef = {
            info: {
                title: 'Daxin Awesome',
                author: 'Daxin IT Team',
                subject: 'store\'s sticker'
            },
            content: content,
            defaultStyle: {
                font: 'NotoSansTC'
            }
        }
        Object.assign(docDef, setting);
        // return pdfMake.createPdf(docDef).open();
        return pdfMake.createPdf(docDef).download(filename.replace('\r\n', ''));
    }
}