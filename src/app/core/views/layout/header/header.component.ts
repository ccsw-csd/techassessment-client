import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, OverlayPanelModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  userPicture = null;
  user = null;
  navOpen = true;
  isloading: boolean = false;
  @Output() navOpenEvent = new EventEmitter();

  constructor(

  ) { }

  ngOnInit(): void {

  }

  toggleSideNav() {
    this.navOpen = !this.navOpen;
    this.navOpenEvent.emit(this.navOpen);
  }

  // getEmail(): string {
  //   if (this.user == null) return "";
  //   return this.user.email;
  // }

  // getName(): string {
  //   if (this.user == null) return "";
  //   return this.user.displayName;
  // }

  // logout() {
  //   this.auth.logout();
  // }

  // apps() : void {
  //   window.open('https://cca.'+this.getDomain()+'.com'+environment.ssoApp, "_blank");
  // }

  // getDomain() : string {
  //   let gitWord2 = "pge";
  //   let gitWord4 = "i";
  //   let gitWord3 = "min";
  //   let gitWord1 = "ca";

  //   let gitWord = gitWord1+gitWord2+gitWord3+gitWord4;

  //   return gitWord;
  // }

  // emailRef() {
  //   window.open("mailto:ccsw.support@"+this.getDomain()+".com?subject=["+environment.appCode+"] Consulta / Feedback");
  // } 

}
