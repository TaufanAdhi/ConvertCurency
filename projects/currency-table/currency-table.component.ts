import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '@core/service/api.service';

@Component({
    selector: 'app-currency-table',
    templateUrl: './currency-table.component.html',
    styleUrls: ['./currency-table.component.scss'],
})
export class CurrencyTableComponent {
    public list: any = [];
    public dataCurency: any = [];
    public valueSelected: string = ``;
    code : any = 'USD';
    symbolA : string = `$`;
    money : string = ''
    public columMap = [
        {
            label: 'code',
            key: 'code',
        },
        {
            label: 'name',
            key: 'name',
        },
        {
            label: 'Rates',
            key: 'roundValue',
        },
        {
            label: 'Value',
            key: 'valueMoney',
        },
    ];

    constructor(
        private api: ApiService,
        private readonly changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.getLIstCurency();
        this.getList();
    }



    inputNumber(){
        this.list = [];
        this.api
            .get(`https://restcountries.com/v3.1/all?fields=currencies`)
            .subscribe({
                next: (res: any) => {
                    console.log(res);
                    let storageCode = new Set();
                    res.forEach((e) => {
                        let lengthObj = Object.keys(e.currencies).length;
                        for (let i = 0; i < lengthObj; i++) {
                            let key = Object.keys(e.currencies)[i];
                            if (!storageCode.has(key)) {
                                storageCode.add(key);
                                this.api.getCurrency(this.code).subscribe({
                                    next: (res: any) => {
                                        let priceCurency = res.rates[key] * Number(this.money);
                                        let nameCurency =
                                            e.currencies[key].name;
                                        let symbolCurency =
                                            e.currencies[key].symbol;
                                        this.list.push({
                                            name: `${key}-${nameCurency}`,
                                            code: key,
                                            symbol: symbolCurency,
                                            fullName: nameCurency,
                                            valueMoney: priceCurency,
                                            roundValue:
                                                Math.round(priceCurency),
                                        });
                                        let byName = this.list.slice(0);
                                        byName.sort(function (a, b) {
                                            let x = a.name.toLowerCase();
                                            let y = b.name.toLowerCase();
                                            return x < y ? -1 : x > y ? 1 : 0;
                                        });
                                        this.list = byName;
                                    },
                                    error: (err) => {
                                        console.log(err);
                                    },
                                });
                            }
                        }
                    });
                },
                error: (err) => {
                    console.log(err);
                },
            });

    }

    selectCurrent(dataCurency: any) {
        this.code = dataCurency.code;
        this.symbolA = dataCurency.symbol;
        this.list = [];
        this.api
            .get(`https://restcountries.com/v3.1/all?fields=currencies`)
            .subscribe({
                next: (res: any) => {
                    console.log(res);
                    let storageCode = new Set();
                    res.forEach((e) => {
                        let lengthObj = Object.keys(e.currencies).length;

                        for (let i = 0; i < lengthObj; i++) {
                            let key = Object.keys(e.currencies)[i];
                            if (!storageCode.has(key)) {
                                storageCode.add(key);
                                this.api.getCurrency(dataCurency.code).subscribe({
                                    next: (res: any) => {
                                        let priceCurency = res.rates[key];
                                        let nameCurency =
                                            e.currencies[key].name;
                                        let symbolCurency =
                                            e.currencies[key].symbol;
                                        this.list.push({
                                            name: `${key}-${nameCurency}`,
                                            code: key,
                                            symbol: symbolCurency,
                                            fullName: nameCurency,
                                            valueMoney: priceCurency,
                                            roundValue:
                                                Math.round(priceCurency),
                                        });
                                        let byName = this.list.slice(0);
                                        byName.sort(function (a, b) {
                                            let x = a.name.toLowerCase();
                                            let y = b.name.toLowerCase();
                                            return x < y ? -1 : x > y ? 1 : 0;
                                        });
                                        this.list = byName;
                                    },
                                    error: (err) => {
                                        console.log(err);
                                    },
                                });
                            }
                        }
                    });
                },
                error: (err) => {
                    console.log(err);
                },
            });
    }

    getList() {
        this.api
            .get('https://restcountries.com/v3.1/all?fields=currencies')
            .subscribe({
                next: (res: any) => {
                    console.log(res);
                    let storageCode = new Set();
                    res.forEach((e) => {
                        let a = Object.keys(e.currencies).length;
                        for (let i = 0; i < a; i++) {
                            let key = Object.keys(e.currencies)[i];
                            if (!storageCode.has(key)) {
                                storageCode.add(key);
                                let b = e.currencies[key].name;
                                let c = e.currencies[key].symbol;
                                this.dataCurency.push({
                                    name: `${key}-${b}`,
                                    code: key,
                                    symbol: c,
                                    fullName: b,
                                });
                            }
                        }
                    });
                    let byName = this.dataCurency.slice(0);
                    byName.sort(function (a, b) {
                        let x = a.name.toLowerCase();
                        let y = b.name.toLowerCase();
                        return x < y ? -1 : x > y ? 1 : 0;
                    });
                    this.dataCurency = byName;
                },
                error: (err) => {
                    console.log(err);
                },
            });
    }

    getLIstCurency() {
        this.api
            .get(`https://restcountries.com/v3.1/all?fields=currencies`)
            .subscribe({
                next: (res: any) => {
                    console.log(res);
                    let storageCode = new Set();
                    res.forEach((e) => {
                        let lengthObj = Object.keys(e.currencies).length;

                        for (let i = 0; i < lengthObj; i++) {
                            let key = Object.keys(e.currencies)[i];
                            if (!storageCode.has(key)) {
                                storageCode.add(key);
                                this.api.getCurrency(`USD`).subscribe({
                                    next: (res: any) => {
                                        let priceCurency = res.rates[key];
                                        let nameCurency =
                                            e.currencies[key].name;
                                        let symbolCurency =
                                            e.currencies[key].symbol;
                                        this.list.push({
                                            name: `${key}-${nameCurency}`,
                                            code: key,
                                            symbol: symbolCurency,
                                            fullName: nameCurency,
                                            valueMoney: priceCurency,
                                            roundValue:
                                                Math.round(priceCurency),
                                        });
                                        let byName = this.list.slice(0);
                                        byName.sort(function (a, b) {
                                            let x = a.name.toLowerCase();
                                            let y = b.name.toLowerCase();
                                            return x < y ? -1 : x > y ? 1 : 0;
                                        });
                                        this.list = byName;
                                    },
                                    error: (err) => {
                                        console.log(err);
                                    },
                                });
                            }
                        }
                    });
                },
                error: (err) => {
                    console.log(err);
                },
            });
    }
}
