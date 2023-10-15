import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './layout/index/index.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ClienteslistComponent } from './component/cliente/clienteslist/clienteslist.component';
import { ClientesdetailsComponent } from './component/cliente/clientesdetails/clientesdetails.component';
import { FuncionarioslistComponent } from './component/funcionario/funcionarioslist/funcionarioslist.component';
import { FuncionariosdetailsComponent } from './component/funcionario/funcionariosdetails/funcionariosdetails.component';
import { PedidoslistComponent } from './component/pedido/pedidoslist/pedidoslist.component';
import { PedidosdetailsComponent } from './component/pedido/pedidosdetails/pedidosdetails.component';
import { PizzaslistComponent } from './component/pizza/pizzaslist/pizzaslist.component';
import { PizzasdetailsComponent } from './component/pizza/pizzasdetails/pizzasdetails.component';
import { ProdutoslistComponent } from './component/produto/produtoslist/produtoslist.component';
import { ProdutosdetailsComponent } from './component/produto/produtosdetails/produtosdetails.component';
import { VendaslistComponent } from './component/venda/vendaslist/vendaslist.component';
import { VendasdetailsComponent } from './component/venda/vendasdetails/vendasdetails.component';
import { LoginComponent } from './component/sistema/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    ClienteslistComponent,
    ClientesdetailsComponent,
    FuncionarioslistComponent,
    FuncionariosdetailsComponent,
    PedidoslistComponent,
    PedidosdetailsComponent,
    PizzaslistComponent,
    PizzasdetailsComponent,
    ProdutoslistComponent,
    ProdutosdetailsComponent,
    VendaslistComponent,
    VendasdetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
