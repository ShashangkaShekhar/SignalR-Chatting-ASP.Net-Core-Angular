"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var service_1 = require("../shared/service");
var BackofficeComponent = /** @class */ (function () {
    function BackofficeComponent(titleService, router, _dataService) {
        this.titleService = titleService;
        this.router = router;
        this._dataService = _dataService;
        var loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedUsername = loggedUser.userName;
    }
    BackofficeComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Backoffice");
    };
    BackofficeComponent.prototype.ngAfterViewInit = function () {
    };
    BackofficeComponent.prototype.logout = function () {
        localStorage.removeItem('loggedUser');
        this.router.navigate(['/login']);
    };
    BackofficeComponent = __decorate([
        core_1.Component({
            selector: 'app-backoffice',
            templateUrl: './app/backoffice/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title,
            router_1.Router,
            service_1.DataService])
    ], BackofficeComponent);
    return BackofficeComponent;
}());
exports.BackofficeComponent = BackofficeComponent;
