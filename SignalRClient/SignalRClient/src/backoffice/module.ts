import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import * as bootstrap from "bootstrap"

//Components
import { BackofficeComponent } from './component';
import { ChatComponent } from './chat/component';

const routes: Routes = [
    {
        path: '',
        component: BackofficeComponent,
        children: [
            { path: '', redirectTo: 'chat' },
            { path: 'chat', component: ChatComponent }
        ]
    }
];

@NgModule({
    imports: [CommonModule, HttpModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
    declarations: [BackofficeComponent, ChatComponent],
    bootstrap: [BackofficeComponent]
})

export class BackofficeModule { }