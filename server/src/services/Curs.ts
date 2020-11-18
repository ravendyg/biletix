import { ICurs } from '@entities/Curs';
import dayjs from 'dayjs';
const soap = require('soap');

import { DATE_FORMAT } from 'src/consts';

export interface ICursService {
  getCurs: (date: Date) => any;
}

interface CursResponse {
  GetCursOnDateResult: {
    diffgram: {
      ValuteData: {
        ValuteCursOnDate: {
          VchCode: string;
          Vcurs: number;
        }[]
      }
    }
  }
}

// TODO: use smth better
let cache: Record<string, Map<string, number>> = {};

export class CursService implements ICursService {
  private _providerUrl: string;

  constructor() {
    this._providerUrl = process.env.CURS_PROVIDER_URL || '';
    if (!this._providerUrl) {
      throw new Error('Неверный адрес поставщика курсов валют');
    }
  }

  getCurs(date: Date): Promise<Map<string, number>> {
    return new Promise((resolve, reject) => {
      const On_date = dayjs(date).format(DATE_FORMAT);
      const old = cache[On_date];
      if (old) {
        return resolve(old);
      }

      // Clear old value, if any.
      cache = {};
      const args = { On_date };

      soap.createClient(this._providerUrl, function (err: any, client: any) {
        if (err) {
          return reject(err);
        }
        client.GetCursOnDate(args, function (err: any, result: CursResponse) {
          if (err) {
            return reject(err);
          }
          const map: Map<string, number> = new Map();
          console.log(Object.keys(result.GetCursOnDateResult.diffgram))
          result.GetCursOnDateResult.diffgram.ValuteData.ValuteCursOnDate.forEach((curs) => {
            const rate = +curs.Vcurs;
            if (!isNaN(rate)) {
              map.set(curs.VchCode, rate);
            }
          });
          return resolve(map);
        });
      });
    })
  }
}
