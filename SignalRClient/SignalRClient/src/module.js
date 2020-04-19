"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var common_2 = require("@angular/common");
var apppreloader_1 = require("./apppreloader");
var auth_guard_1 = require("./shared/auth.guard");
//Components
var component_1 = require("./component");
var component_2 = require("./home/component");
var component_3 = require("./login/component");
var component_4 = require("./error/component");
var routes = [
    {
        path: '',
        component: component_3.LoginComponent
    },
    {
        path: 'login',
        component: component_3.LoginComponent
    },
    {
        path: 'home',
        component: component_2.HomeComponent
    },
    {
        path: 'backoffice',
        loadChildren: './app/backoffice/module#BackofficeModule',
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: '**',
        component: component_4.ErrorComponent
    },
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forRoot(routes, {
                    enableTracing: false,
                    useHash: false,
                    preloadingStrategy: apppreloader_1.PreloadAllModules
                })
            ],
            declarations: [
                component_1.AppComponent,
                component_2.HomeComponent,
                component_3.LoginComponent,
                component_4.ErrorComponent
            ],
            bootstrap: [component_1.AppComponent],
            providers: [
                platform_browser_1.Title, auth_guard_1.AuthGuard,
                apppreloader_1.PreloadAllModules,
                {
                    provide: common_2.LocationStrategy,
                    useClass: common_2.HashLocationStrategy
                }
            ],
            exports: [router_1.RouterModule]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
