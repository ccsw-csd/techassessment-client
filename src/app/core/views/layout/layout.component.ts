import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarModule, RouterOutlet, NavComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  visibleSideBar = true;
  public toggleMenu(): void {
    this.visibleSideBar = !this.visibleSideBar;

  }
}
