import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Conta } from 'src/app/models/conta';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})

export class CadastroComponent {

  conta: Conta = new Conta();
  
  constructor(private usuarioService: UsuarioService, private router: Router){
    this.conta.role = ''
    this.conta.password = ''
    this.conta.username = ''
  }

  cadastrar(){
    this.usuarioService.cadastrar(this.conta).subscribe({
    next: conta => {
      console.log(conta);
      this.router.navigate(['/login'])
    },
    error: erro => {
      console.log('erro '+ erro.error)
      alert(erro.message)
    }
    })
  
}

}
