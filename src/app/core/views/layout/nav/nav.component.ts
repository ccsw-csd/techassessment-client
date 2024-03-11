import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  frontVersion: string = '1.0.0';
  backVersion: string = '1.0.0';
  items: any[] = []

  constructor(

  ) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Dashboard', routerLink: '/dashboard' },
      {
        label: 'Skills',
        expanded: false,
        visible: true,
        items: [
          { label: 'List', routerLink: 'skills' }
        ],
      },
    ];
  }
}


