import {
    ChangeDetectorRef,
    Component,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/service/api.service';
import { LovComponent } from '@core/shared-component/lov/lov.component';

@Component({
    selector: 'app-currency-convert',
    templateUrl: './currency-convert.component.html',
    styleUrls: ['./currency-convert.component.scss'],
})
export class CurrencyConvertComponent {
    @ViewChildren('lovs') public lovComponent: QueryList<LovComponent>;
    money: any = ``;
    resultConvert: number = 0;
    public symbolA: string = '$';
    public symbolB: string = '$';
    public text: any = true;
    public valueCurrentASelected: any;
    public valueCurrentBSelected: any;
    public isInput: boolean = false;
    public listDataA: any = [];
    public listDataB: any = [];
    public showDetail: boolean = false;
    public nameFrom: string = ``;
    public nameTo: string = '';
    public lastUpdate : string = '';
    public fullNameFrom: string = ``;
    public fullNameTo: string = ``;
    public valueDetailFrom: any = ``;
    public valueDetailTo: any = ``;

    public formCurency: FormGroup;

    coba: boolean = true;

    constructor(
        private api: ApiService,
        private fb: FormBuilder,
        private readonly changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.createForm();

        this.getListLov();
    }

    createForm() {
        this.formCurency = this.fb.group({
            selectFrom: [``, Validators.required],
            selectTo: [``, Validators.required],
        });
    }

    onDetail() {
        this.nameFrom = this.valueCurrentASelected.code;
        this.nameTo = this.valueCurrentBSelected.code;
        this.fullNameFrom = this.valueCurrentASelected.fullName;
        this.fullNameTo = this.valueCurrentBSelected.fullName;
        this.valueDetailFrom = this.money;
        this.valueDetailTo = this.resultConvert;
        this.showDetail = true;

    }

    calcuProgres() {
        let codeA = this.valueCurrentASelected.code;
        let codeB = this.valueCurrentBSelected.code;
        this.money = Number(this.money);
        this.api.getCurrency(codeA).subscribe({
            next: (res: any) => {
                console.log(res);
                this.lastUpdate = res.time_last_update_utc; 
                
                let result = res.rates[codeB] * this.money;
                this.resultConvert = result;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    inputNumber() {
        if (this.formCurency.valid) {
            this.calcuProgres();
        } else {
            this.formCurency.markAllAsTouched();
        }
    }

    selectCurrentA(e) {
        this.formCurency.get(`selectFrom`).patchValue(e);
        this.valueCurrentASelected = e;
        this.symbolA = e.symbol;
        if (
            this.valueCurrentASelected !== undefined &&
            this.valueCurrentBSelected !== undefined
        ) {
            this.calcuProgres();
            this.isInput = false;
        }
    }

    selectCurrentB(e) {
        this.valueCurrentBSelected = e;
        this.symbolB = e.symbol;
        this.formCurency.get(`selectTo`).patchValue(e);
        if (
            this.valueCurrentASelected !== undefined &&
            this.valueCurrentBSelected !== undefined
        ) {
            this.calcuProgres();
            this.isInput = false;
        }
    }

    reverse() {
        let tampung = this.valueCurrentASelected;
        let saveStorageSymbol = this.symbolA;
        this.symbolA = this.symbolB;
        this.symbolB = saveStorageSymbol;
        this.valueCurrentASelected = this.valueCurrentBSelected;
        this.valueCurrentBSelected = tampung;
        this.money = this.resultConvert;
        this.changeDetectorRef.detectChanges();

        this.calcuProgres();
    }

    private getListLov() {
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
                                this.listDataA.push({
                                    name: `${key}-${b}`,
                                    code: key,
                                    symbol: c,
                                    fullName: b,
                                });
                                this.listDataB.push({
                                    name: `${key}-${b}`,
                                    code: key,
                                    symbol: c,
                                    fullName: b,
                                });
                            }
                        }
                    });
                    console.log(this.listDataA);
                    let byName = this.listDataA.slice(0);
                    byName.sort(function (a, b) {
                        let x = a.name.toLowerCase();
                        let y = b.name.toLowerCase();
                        return x < y ? -1 : x > y ? 1 : 0;
                    });
                    this.listDataA = byName;
                    this.listDataB = byName;

                    console.log(this.listDataA);
                },
                error: (err) => {
                    console.log(err);
                },
            });
    }
}
