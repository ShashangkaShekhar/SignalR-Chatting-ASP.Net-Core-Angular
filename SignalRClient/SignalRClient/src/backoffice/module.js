"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
//Components
var component_1 = require("./component");
var component_2 = require("./chat/component");
var routes = [
    {
        path: '',
        component: component_1.BackofficeComponent,
        children: [
            { path: '', redirectTo: 'chat' },
            { path: 'chat', component: component_2.ChatComponent }
        ]
    }
];
var BackofficeModule = /** @class */ (function () {
    function BackofficeModule() {
    }
    BackofficeModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, http_1.HttpModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, router_1.RouterModule.forChild(routes)],
            declarations: [component_1.BackofficeComponent, component_2.ChatComponent],
            bootstrap: [component_1.BackofficeComponent]
        })
    ], BackofficeModule);
    return BackofficeModule;
}());
exports.BackofficeModule = BackofficeModule;
