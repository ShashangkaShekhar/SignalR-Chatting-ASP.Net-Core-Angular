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
var service_1 = require("../../shared/service");
var paging_1 = require("../../shared/paging");
var message_1 = require("../../shared/models/message");
var ChatComponent = /** @class */ (function () {
    function ChatComponent(titleService, _dataService) {
        this.titleService = titleService;
        this._dataService = _dataService;
        this.loggedUserid = 0;
        //API
        this._chatUrl = 'api/chat/userChat';
        //Chat
        this.onlineUser = [];
        this.chatUsername = null;
        this.chatMessages = [];
        this.chatMessage = null;
        var loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedUsername = loggedUser.userName;
        this.loggedUserid = loggedUser.userId;
    }
    ChatComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Chat");
        this.signalrConn();
    };
    ChatComponent.prototype.signalrConn = function () {
        var _this = this;
        //Init Connection
        this._hubConnection = new signalR.HubConnectionBuilder().withUrl("http://localhost:63742/chatHub?user=" + this.loggedUsername).build();
        //Call client methods from hub to update User
        this._hubConnection.on('UpdateUserList', function (onlineuser) {
            var users = JSON.parse(onlineuser);
            _this.onlineUser = [];
            for (var key in users) {
                if (users.hasOwnProperty(key)) {
                    if (key !== _this.loggedUsername) {
                        _this.onlineUser.push({
                            userName: key,
                            connection: users[key]
                        });
                    }
                }
            }
        });
        //Call client methods from hub to update User
        this._hubConnection.on('ReceiveMessage', function (message) {
            _this.chatUsername = message.senderid;
            _this.chatLog();
        });
        //Start Connection
        this._hubConnection
            .start()
            .then(function () {
            console.log("Connected");
        }).catch(function (err) {
            return console.error(err.toString());
        });
    };
    ChatComponent.prototype.sendMessage = function (message) {
        //Send Message
        if (message != '') {
            this.chatMessage = new message_1.Message();
            this.chatMessage.senderid = this.loggedUsername;
            this.chatMessage.receiverid = this.chatUsername;
            this.chatMessage.message = message;
            this.chatMessage.messagestatus = "sent";
            this.chatMessages.push(this.chatMessage);
            this._hubConnection.invoke('SendMessage', this.chatMessage);
        }
    };
    ChatComponent.prototype.chooseUser = function (user) {
        this.chatUsername = user.userName;
        this.chatLog();
    };
    ChatComponent.prototype.chatLog = function () {
        var _this = this;
        //ChatLog
        var param = { Senderid: this.loggedUsername, Receiverid: this.chatUsername };
        var getchatUrl = this._chatUrl + '?param=' + JSON.stringify(param);
        this._dataService.get(getchatUrl)
            .subscribe(function (response) {
            _this.res = response;
            if (_this.res != null) {
                var chatLog = _this.res.resdata;
                _this.chatMessages = [];
                if (chatLog.length > 0) {
                    for (var i = 0; i < chatLog.length; i++) {
                        if (_this.loggedUsername === chatLog[i].senderid) {
                            chatLog[i].messagestatus = "sent";
                        }
                        else {
                            chatLog[i].messagestatus = "received";
                        }
                        //Push-Data
                        _this.chatMessages.push(chatLog[i]);
                    }
                }
            }
        }, function (error) {
            console.log(error);
        });
    };
    ChatComponent.prototype.ngOnDestroy = function () {
        //Stop Connection
        this._hubConnection
            .stop()
            .then(function () {
            console.log("Stopped");
        }).catch(function (err) {
            return console.error(err.toString());
        });
    };
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'app-chat',
            templateUrl: './app/backoffice/chat/component.html',
            providers: [service_1.DataService, paging_1.Paging]
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title,
            service_1.DataService])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
