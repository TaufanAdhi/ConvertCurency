import { NgModule } from '@angular/core';
import { ConvertRoutingModule } from './convert-routing.module';
import { CommonModule } from '@angular/common';
import { ConvertComponent } from './convert.component';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { ButtonModule } from 'primeng/button';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { NavbarModule } from 'projects/navbar/navbar.component.module';
import { CurrencyConvertComponent } from 'projects/currency-convert-main/currency-convert.component';
import { CurrencyTableComponent } from 'projects/currency-table/currency-table.component';

@NgModule({
    imports: [
        CommonModule,
        ConvertRoutingModule,
        SharedComponentModule,
        ButtonModule,
        ReactiveFormsModule,
        KeyFilterModule,
        NavbarModule,
    ],
    exports: [],
    declarations: [ConvertComponent,CurrencyConvertComponent,CurrencyTableComponent],
    providers: [],
})
export class ConvertModule {}
