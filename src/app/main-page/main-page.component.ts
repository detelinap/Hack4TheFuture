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
            {label: 'История', icon: 'pi pi-fw pi-calendar'},
            {label: 'География', icon: 'pi pi-fw pi-map-marker'},
            {label: 'Математика', icon: 'pi pi-fw pi-check-square'},
            {label: 'Български', icon: 'pi pi-fw pi-comments'},
            {label: 'Английски', icon: 'pi pi-fw pi-globe'},
            {label: 'Изкуство', icon: 'pi pi-fw pi-palette'},
            {label: 'Икономика', icon: 'pi pi-fw pi-money-bill'},
            {label: 'Химия', icon: 'pi pi-fw pi-question'},
            {label: 'Физика', icon: 'pi pi-fw pi-directions'},
            {label: 'Биология', icon: 'pi pi-fw pi-image'},
            {label: 'Философия', icon: 'pi pi-fw pi-circle-off'},
        ];
        this.activeItem = this.items[0];
    }
}
