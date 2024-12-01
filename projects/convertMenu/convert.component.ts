import {
    ChangeDetectorRef,
    Component,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '@core/service/api.service';
import { LovComponent } from '@core/shared-component/lov/lov.component';
@Component({
    selector: 'app-convert',
    templateUrl: './convert.component.html',
    styleUrls: ['./convert.component.scss'],
})
export class ConvertComponent implements OnInit {
    @ViewChildren('lovs') public lovComponent: QueryList<LovComponent>;

    constructor(
        private api: ApiService,
        private fb: FormBuilder,
        private readonly changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {}
}
