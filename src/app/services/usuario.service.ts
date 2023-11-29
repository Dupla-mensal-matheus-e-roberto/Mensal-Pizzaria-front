import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Conta } from '../models/conta';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API: string = 'http://localhost:8080/user'
  http = inject(HttpClient)

  constructor() { }

  cadastrar(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(`${this.API}/cadastrar`, conta);
  }

}
