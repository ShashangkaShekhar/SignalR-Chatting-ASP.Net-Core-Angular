import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app/component.html',
})

export class AppComponent implements OnInit {
    constructor(private router: Router) {}
    ngOnInit() {
    }
}
