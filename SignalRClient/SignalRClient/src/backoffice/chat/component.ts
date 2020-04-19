import { Component, OnInit, ElementRef, ViewChild, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../shared/service';
import { Paging } from '../../shared/paging';
import { Message } from '../../shared/models/message';
declare var signalR: any;

@Component({
    selector: 'app-chat',
    templateUrl: './app/backoffice/chat/component.html',
    providers: [DataService, Paging]
})

export class ChatComponent implements OnInit, OnDestroy {
    public title: any;
    public res: any;
    public resmessage: string;
    public loggedUserid: number = 0;
    public loggedUsername: string;

    //API
    public _chatUrl: string = 'api/chat/userChat';

    //Chat
    public onlineUser: any = [];
    public chatUsername: string = null;
    public chatConnection: string;
    public chatMessages: any = [];
    public chatMessage = new Message();
    public _hubConnection;

    constructor(
        private titleService: Title,
        private _dataService: DataService) {
        var loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedUsername = loggedUser.userName;
        this.loggedUserid = loggedUser.userId;
    }

    ngOnInit() {
        this.titleService.setTitle("Chat");
        this.signalrConn();
    }

    signalrConn() {
        //Init Connection
        this._hubConnection = new signalR.HubConnectionBuilder().withUrl("http://localhost:63742/chatHub?user=" + this.loggedUsername).build();

        //Call client methods from hub to update User
        this._hubConnection.on('UpdateUserList', (onlineuser) => {
            var users = JSON.parse(onlineuser);
            this.onlineUser = [];
            for (var key in users) {
                if (users.hasOwnProperty(key)) {
                    if (key !== this.loggedUsername) {
                        this.onlineUser.push({
                            userName: key,
                            connection: users[key]
                        });
                    }
                }
            }
        });

        //Call client methods from hub to update User
        this._hubConnection.on('ReceiveMessage', (message: Message) => {
            this.chatUsername = message.senderid;
            this.chatLog();
        });

        //Start Connection
        this._hubConnection
            .start()
            .then(function () {
                console.log("Connected");
            }).catch(function (err) {
                return console.error(err.toString());
            });
    }

    sendMessage(message) {
        //Send Message
        if (message != '') {
            this.chatMessage = new Message();
            this.chatMessage.senderid = this.loggedUsername;
            this.chatMessage.receiverid = this.chatUsername;
            this.chatMessage.message = message;
            this.chatMessage.messagestatus = "sent";
            this.chatMessages.push(this.chatMessage);
            this._hubConnection.invoke('SendMessage', this.chatMessage);
        }
    }

    chooseUser(user) {
        this.chatUsername = user.userName;
        this.chatLog();
    }

    chatLog() {
        //ChatLog
        var param = { Senderid: this.loggedUsername, Receiverid: this.chatUsername };
        var getchatUrl = this._chatUrl + '?param=' + JSON.stringify(param);
        this._dataService.get(getchatUrl)
            .subscribe(
                response => {
                    this.res = response;
                    if (this.res != null) {
                        var chatLog = this.res.resdata;
                        this.chatMessages = [];
                        if (chatLog.length > 0) {
                            for (var i = 0; i < chatLog.length; i++) {
                                if (this.loggedUsername === chatLog[i].senderid) {
                                    chatLog[i].messagestatus = "sent";
                                }
                                else {
                                    chatLog[i].messagestatus = "received";
                                }

                                //Push-Data
                                this.chatMessages.push(chatLog[i]);
                            }
                        }
                    }
                }, error => {
                    console.log(error);
                }
            );
    }

    ngOnDestroy() {
        //Stop Connection
        this._hubConnection
            .stop()
            .then(function () {
                console.log("Stopped");
            }).catch(function (err) {
                return console.error(err.toString());
            });
    }
}


