import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  API: string = 'http://localhost:8080/cliente';
  http = inject(HttpClient);

  constructor() { }

  listAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.API}/all`);
  }

  save(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.API}/criar`, cliente);
  }

  update(cliente: Cliente) : Observable<Cliente> {
    return this.http.put<Cliente>(`${this.API}/editar/${cliente.idCliente}`, cliente);
  }

  delete(id: number) : Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.API}/deletar/${id}`);
  }

  verify(cliente: Cliente){
    if(cliente.idCliente){
      return this.update(cliente);
    } else {
      return this.save(cliente);
    }
  }
}
