import {
    HttpClient,
    HttpClientModule,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { NgModule } from '@angular/core';
import { AppService } from './app.service';
import { ToastModule } from 'primeng/toast';
import { LayoutModule } from './layout/layout.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { DashboardModule } from './core/dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing.module';
import { WebSocketService } from '@core/service/web-socket.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpErrorInterceptor } from './core/interceptor/http-error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export const interceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorInterceptor,
        multi: true,
    },
];

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/translations/', '.json');
}
@NgModule({
    imports: [
        ToastModule,
        LayoutModule,
        BrowserModule,
        DashboardModule,
        AppRoutingModule,
        HttpClientModule,
        NgxSpinnerModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
    ],
    bootstrap: [AppComponent],
    providers: [
        MessageService,
        interceptorProviders,
        AppService,
        WebSocketService,
    ],
    declarations: [AppComponent],
})
export class AppModule {}
