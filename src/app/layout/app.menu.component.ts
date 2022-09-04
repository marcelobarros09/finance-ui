import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: [''] }
                ]
            },
            {
                label: 'Pages',
                items: [
                    { label: 'Income', icon: 'pi pi-fw pi-arrow-up', routerLink: ['/income'] },
                    { label: 'Expense', icon: 'pi pi-fw pi-arrow-down', routerLink: ['/expense'] },
                    { label: 'Planning', icon: 'pi pi-fw pi-calendar', routerLink: ['/expense'] }
                ]
            }
        ];
    }
}
