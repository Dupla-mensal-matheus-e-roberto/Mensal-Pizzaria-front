import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-funcionariosdetails',
  templateUrl: './funcionariosdetails.component.html',
  styleUrls: ['./funcionariosdetails.component.scss']
})
export class FuncionariosdetailsComponent {

  @Input() funcionario: Funcionario = new Funcionario();
  @Output() retorno = new EventEmitter<Funcionario>();

  funcionarioService = inject(FuncionarioService);

  constructor(){

  }

  verificar(){
    this.funcionarioService.verify(this.funcionario).subscribe({
      next: funcionario =>{
        this.retorno.emit(funcionario);
      },
      error: erro =>{
        alert("Errro, olhar no console");
        console.log(erro)
      }
    })
  }

}
