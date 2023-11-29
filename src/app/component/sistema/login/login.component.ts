import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login: Login = new Login()
  roteador = inject(Router);
  loginService = inject(LoginService);

  constructor(){
    this.loginService.removerToken();
  }

  logar(){
    
    this.loginService.logar(this.login).subscribe({
      next: usuario => {
        console.log(usuario)
        this.loginService.addToken(usuario.token);
        this.roteador.navigate(['admin']);
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }

}
