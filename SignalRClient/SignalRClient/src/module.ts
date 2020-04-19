import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { Routes, RouterModule, RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from "bootstrap"
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { PreloadAllModules } from './apppreloader';
import { AuthGuard } from './shared/auth.guard';

//Components
import { AppComponent } from './component';
import { HomeComponent } from './home/component';
import { LoginComponent } from './login/component';
import { ErrorComponent } from './error/component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'backoffice',
        loadChildren: './app/backoffice/module#BackofficeModule',
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: ErrorComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(
            routes,
            {
                enableTracing: false,
                useHash: false,
                preloadingStrategy: PreloadAllModules
            })
    ],

    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        ErrorComponent],

    bootstrap: [AppComponent],

    providers: [
        Title, AuthGuard,
        PreloadAllModules,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],

    exports: [RouterModule]
})

export class AppModule {

}