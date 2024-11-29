import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '@core/service/api.service';

@Component({
    selector: 'app-currency-table',
    templateUrl: './currency-table.component.html',
    styleUrls: ['./currency-table.component.scss'],
})
export class CurrencyTableComponent {
    list: any = [];
    dataCurency : any = [];
    valueSelected: string = ``;
    columMap = [
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
    }

    selectCurrent(dataCurency: any) {
        // this.valueSelected = dataCurency;
        this.list = [];
        this.api
        .get(`https://restcountries.com/v3.1/all?fields=currencies`)
        .subscribe({
            next: (res: any) => {
                    res.forEach((e) => {
                        let key = Object.keys(e.currencies)[0];
                        let lengthObj = Object.keys(e.currencies).length;

                        for (let i = 0; i < lengthObj; i++) {
                            key = Object.keys(e.currencies)[i];
                            this.api
                                .getCurrency(`${dataCurency.code}`)
                                .subscribe({
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
                                        // this.changeDetectorRef.detectChanges();
                                    },
                                    error: (err) => {
                                        console.log(err);
                                    },
                                });
                                
                                
                        }
                    });
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
                    res.forEach((e) => {
                        let key = Object.keys(e.currencies)[0];
                        let lengthObj = Object.keys(e.currencies).length;

                        for (let i = 0; i < lengthObj; i++) {
                            key = Object.keys(e.currencies)[i];
                            this.api.getCurrency(`USD`).subscribe({
                                next: (res: any) => {
                                    let priceCurency = res.rates[key];
                                    let nameCurency = e.currencies[key].name;
                                    let symbolCurency =
                                        e.currencies[key].symbol;
                                    this.list.push({
                                        name: `${key}-${nameCurency}`,
                                        code: key,
                                        symbol: symbolCurency,
                                        fullName: nameCurency,
                                        valueMoney: priceCurency,
                                        roundValue: Math.round(priceCurency),
                                    });
                                },
                                error: (err) => {
                                    console.log(err);
                                },
                            });
                        }
                    });
                    this.dataCurency = this.list;
                },
                error: (err) => {
                    console.log(err);
                },
            });
        }
}
