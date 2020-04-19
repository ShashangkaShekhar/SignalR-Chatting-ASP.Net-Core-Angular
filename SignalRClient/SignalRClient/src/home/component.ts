import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    templateUrl: './app/home/component.html'
})

export class HomeComponent implements OnInit, AfterViewInit {
    public title: any;
    constructor(
        private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle("Home");
    }

    ngAfterViewInit() {

    }
}
