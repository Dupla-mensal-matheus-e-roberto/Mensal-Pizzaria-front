import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  API: string = 'http://localhost:8080/api/cliente';
  http = inject(HttpClient);

  constructor() { }

  listAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API);
  }

  save(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API, cliente);
  }

  update(carro: Cliente) : Observable<Cliente> {
    return this.http.put<Cliente>(`${this.API}/${carro.id}`, carro);
  }

  delete(id: number) : Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.API}/${id}`);
  }

  verify(cliente: Cliente){
    if(cliente.id){
      return this.update(cliente);
    } else {
      return this.save(cliente);
    }
  }
}
