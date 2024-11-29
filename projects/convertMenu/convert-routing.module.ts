import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertComponent } from './convert.component';
import { CurrencyConvertComponent } from 'projects/currency-convert-main/currency-convert.component';
import { CurrencyTableComponent } from 'projects/currency-table/currency-table.component';

export const routeConvert: Routes = [
    {
        path: ``,
        component: ConvertComponent,
        children: [
            {
                path: ``,
                redirectTo: 'curencyConvert',
                pathMatch: `full`,
            },
            {
                path: 'curencyConvert',
                component: CurrencyConvertComponent,
            },
            {
                path: 'curencyTable',
                component : CurrencyTableComponent
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routeConvert)],
    exports: [RouterModule],
})
export class ConvertRoutingModule {}
