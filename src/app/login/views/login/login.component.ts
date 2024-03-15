import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { environment } from '../../../../environments/environment';
import { ResponseCredentials } from '../../../core/models/ResponseCredentials';
import { AuthService } from '../../../core/services/auth.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { LoginService } from '../../services/login.service';



@Component({
  standalone: true,
  imports: [InputTextModule, FormsModule, ToastModule, ProgressSpinnerModule, ButtonModule],
  providers: [SnackbarService, MessageService],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: string = "";
  password: string = "";
  isloading: boolean = false;

  constructor(
    private loginService: LoginService,
    private auth: AuthService,
    private router: Router,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    if (this.auth.isTokenValid() && this.auth.getSSOToken() != null) {
      this.accessIntoApp();
    }
  }

  login() {

    if (this.user == "" || this.password == "") return;

    this.isloading = true;
    this.authenticate();
  }

  private authenticate() {

    this.loginService.authenticate(this.user, this.password).subscribe({
      next: (res: ResponseCredentials) => {
        this.loginService.putSSOCredentials(res);
        this.accessIntoApp();
      },
      error: () => {
        this.snackbarService.error('Credenciales erróneas. Asegúrate de haber puesto el username (no el email) y el password corporativo.');
        this.isloading = false;
      },
    });

  }

  private accessIntoApp(): void {
    this.isloading = false;

    let roles = this.auth.getRoles();
    if (roles == null || roles.length == 0) {
      this.snackbarService.error('El usuario no tiene permisos válidos en la aplicación.');
      return;
    }

    this.router.navigate(['skills']);
  }

  public getEmail(): string {
    let gitWord2 = "pge";
    let gitWord4 = "i";
    let gitWord3 = "min";
    let gitWord1 = "ca";

    let gitWord = gitWord1 + gitWord2 + gitWord3 + gitWord4;

    return "ccsw.support@" + gitWord + ".com";
  }


  public getEmailRef(): string {
    return "mailto:" + this.getEmail() + "?subject=[" + environment.appCode + "] Consulta / Feedback";
  }
}