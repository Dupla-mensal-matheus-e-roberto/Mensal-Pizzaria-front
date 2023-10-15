import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  API: string = 'http://localhost:8080/funcionario';
  http = inject(HttpClient);

  constructor() { }

  listAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.API}/all`);
  }

  save(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(`${this.API}/criar`, funcionario);
  }

  update(funcionario: Funcionario) : Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.API}/editar/${funcionario.idFuncionario}`, funcionario);
  }

  delete(id: number) : Observable<Funcionario> {
    return this.http.delete<Funcionario>(`${this.API}/deletar/${id}`);
  }

  verify(funcionario: Funcionario){
    if(funcionario.idFuncionario){
      return this.update(funcionario);
    } else {
      return this.save(funcionario);
    }
  }
}
