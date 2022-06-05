import { HttpParams } from "@angular/common/http";
import { ConstModel, ReqModel } from "app/service/coreModel";
import { Config } from 'app/tools/config';
import * as moment from 'moment-timezone';
import { Observable } from 'rxjs';
import * as XLSX from "xlsx";

export const HttpTool = {
    id(req: ReqModel, url: string = null): string {
        return ((url) ? url : '') + ((req._id ? req._id : ''));
    },
    params(req: ReqModel): HttpParams {
        let params: HttpParams = new HttpParams();
        Object.keys(req.query).forEach(key => {
            params = params.append(key, JSON.stringify(req.query[key]));
        });

        return params;
    }
}

export const Tools = {
    copy(obj: object): object {
        let o: object = {};
        Object.keys(obj).forEach(key => {
            if (obj[key] !== '' && obj[key] !== ConstModel.ALL) {
                o[key] = obj[key];
            }
        });
        return JSON.parse(JSON.stringify(o));
    },
    xlsx(
        data: any[],
        fileName: string,
        date?: { gte?: string; lte?: string }
    ): void {
        const sheet = XLSX.utils.aoa_to_sheet(data);
        const book = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(book, sheet, fileName);
        if (date) {
            fileName += '_' + moment(date.gte).format(Config.date.format) + ' ~ ' + moment(date.lte).format(Config.date.format)
        }
        XLSX.writeFile(
            book,
            fileName +
            ".xlsx"
        );
    },
    loadImg(url: string): Observable<any> {
        return new Observable(observer => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    setTimeout(() => {
                        observer.next(true);
                        observer.complete();
                    }, 800);
                }
                return xhr.abort();
            };

            xhr.open("GET", url, true);
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.setRequestHeader(
                "Access-Control-Allow-Methods",
                "GET,POST,OPTIONS,DELETE,PUT"
            );
            xhr.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');

            xhr.responseType = "blob";
            xhr.send();
        });
    },
}

export const DateTool = {
    now: (): any => {
        return moment().format(Config.date.format);
    },
    format: (str): any => {
        return moment(str).format(Config.date.format);
    },
    export: (str): any => {
        return moment(str).format(Config.date.export);
    },
    startTime: (str, time?): string => {
        let t = '';
        if (time) {
            t = ' ' + time + ':00';
        } else {
            t = ' 00:00:00';
        }

        return moment(DateTool.export(str + t)).tz(Config.date.timezone).toISOString();
    },
    endTime: (str, time?): string => {
        let t = '';
        if (time) {
            t = ' ' + time + ':59';
        } else {
            t = ' 23:59:59';
        }

        return moment(DateTool.export(str + t)).tz(Config.date.timezone).toISOString();
    },
    lastMonthFirstDay: (str = Config.date.lastMonth) => {
        const lastMonth = moment().subtract(str, 'months');
        return DateTool.format(moment(lastMonth.year() + '-' + lastMonth.month() + '-01').toDate());
    },
    lastMonthEndDay: (str = Config.date.lastMonth) => {
        const lastMonth = moment().subtract(str, 'months');
        return DateTool.format(moment(lastMonth.year() + '-' + lastMonth.month() + '-' + ('0' + lastMonth.daysInMonth()).slice(-2)).toDate());
    },
    yesterday: () => {
        const yesterday = moment().subtract(1, 'day');
        return DateTool.format(moment(yesterday.year() + '-' + ('00' + (yesterday.month() + 1)).slice(-2) + '-' + ('00' + yesterday.date()).slice(-2)).toDate());
    },
    lastWeek: (str = Config.date.lastWeek) => {
        const lastMonth = moment().subtract(str, 'week');
        return DateTool.format(lastMonth.toDate());
    }
}
