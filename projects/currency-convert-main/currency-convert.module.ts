import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { NavbarModule } from 'projects/navbar/navbar.component.module';
import { CurrencyConvertComponent } from './currency-convert.component';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        SharedComponentModule,
        ButtonModule,
        ReactiveFormsModule,
        KeyFilterModule,
        NavbarModule,
        FormsModule,
        InputTextModule
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class CurencyConvertModule {}
