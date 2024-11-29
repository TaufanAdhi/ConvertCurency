import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '@core/service/api.service';
import { LovComponent } from '@core/shared-component/lov/lov.component';
@Component({
    selector: 'app-convert',
    templateUrl: './convert.component.html',
    styleUrls: ['./convert.component.scss'],
})
export class ConvertComponent implements OnInit {
@ViewChildren("lovs") public lovComponent: QueryList<LovComponent>;

    public valueCurrentASelected : any ;
    public valueCurrentBSelected : any ;


    listDataA : any = [];
    listDataB : any = [];


    public symbol : string = '$';

    public money : any = 1;

    public price : number = 0;


    constructor(private api: ApiService,private fb : FormBuilder, private readonly changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        // this.api.get(`https://restcountries.com/v3.1/all?fields=currencies`).subscribe({
        //     next : (res : any) => {
                
        //     },
        //     error : (err) => {
        //         console.log(err);
        //     }
        // })

        // this.getListLov();

    }


    private getListLov(){
        this.api.get('https://restcountries.com/v3.1/all?fields=currencies').subscribe({
            next : (res : any) => {
                console.log(res);
                res.forEach((e) => {
                    let key = Object.keys(e.currencies)[0];

                    // console.log(key);
                   
                   let a = Object.keys(e.currencies).length
                
                   if(a === 1) {
                       let b = e.currencies[key].name
                       let c = e.currencies[key].symbol
                    //    console.log(b);
                       this.listDataA.push({name  :  `${key}-${b}` , code : key,symbol : c });
                       this.listDataB.push({name  :  `${key}-${b}` , code : key,symbol : c });
                   }
                   else  {
                       for(let i = 0 ; i < a;i++){
                           key = Object.keys(e.currencies)[i];
                           let b = e.currencies[key].name;
                           let c = e.currencies[key].symbol;
                           this.listDataA.push({name : `${key}-${b}`,code : key,symbol : c});
                           this.listDataB.push({name  : `${key}-${b}` , code : key,symbol : c });
                       }
                   }
               })
               
              const array =  this.lovComponent.toArray();
              array.forEach((item) => {
                item.fetchData();
              })
               this.changeDetectorRef.detectChanges();
            },
            error : (err) => {
                console.log(err);
            }
        })
    }

    
    convert(){
        let codeA = this.valueCurrentASelected.code;
        // console.log(code);
        this.money = Number(this.money);
        let codeB = this.valueCurrentBSelected.code
        this.api.getCurrency(codeA).subscribe({
            next : (res : any) => {
                console.log(res);
                console.log(codeB);
                console.log(res.rates[codeB]);
                
                let result = res.rates[codeB] * this.money;
                this.price = result;
            },
            error : (err) => {
                console.log(err)
            }
        })
    }

   




    selectCurrentA(e){
        this.valueCurrentASelected = e;
        this.symbol = e.symbol;
    }

    click(){
        let tampung = this.valueCurrentASelected
        this.valueCurrentASelected =  this.valueCurrentBSelected ;
        this.valueCurrentBSelected = tampung;
       this.changeDetectorRef.detectChanges();

        // [valueCurrentASelected,valueCurrentBSelected] = [valueCurrentBSelected,valueCurrentASelected]
    }


    selectCurrentB(e){
        this.valueCurrentBSelected = e;
        console.log(e);
    }
}
