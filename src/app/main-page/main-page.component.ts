import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  userOneId: number = 1;
  userTwoId: number = 2;
    
    items: MenuItem[];

    activeItem: MenuItem;

    ngOnInit() {
        this.items = [
            {label: 'History', icon: 'pi pi-fw pi-calendar'},
            {label: 'Geography', icon: 'pi pi-fw pi-map-marker'},
            {label: 'Mathematics', icon: 'pi pi-fw pi-check-square'},
            {label: 'Bulgarian Language', icon: 'pi pi-fw pi-comments'},
            {label: 'English Language', icon: 'pi pi-fw pi-globe'},
            {label: 'Art', icon: 'pi pi-fw pi-palette'},
            {label: 'Economics', icon: 'pi pi-fw pi-money-bill'},
            {label: 'Chemistry', icon: 'pi pi-fw pi-question'},
            {label: 'Physics', icon: 'pi pi-fw pi-directions'},
            {label: 'Biology', icon: 'pi pi-fw pi-image'},
            {label: 'Philosophy', icon: 'pi pi-fw pi-circle-off'},
        ];
        this.activeItem = this.items[0];
    }
}
