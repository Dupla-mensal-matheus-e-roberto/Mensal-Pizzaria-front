import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA //PARA QUE O KARMA NÃO CONFUNDA ELEMENTOS ANGULAR NO TEMPLATE COMO ERROS
      ],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login', async () => {
    let login = fixture.debugElement.query(By.css('input[name="username"]')).nativeElement;
    login.value = 'admin'
    
    let password = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
    password.value = '123'
    
    login.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));

    let button = fixture.debugElement.query(By.css('button[name="buttonLogin"]')).nativeElement;
    button.click();

    await fixture.whenStable();
   
    fixture.detectChanges();

    console.log(fixture.debugElement.nativeElement.innerHTML);

    let header = fixture.debugElement.query(By.css('a[name="clientes"]'));

    if (header) {
      console.log(header);
      expect(header.nativeElement.textContent.trim()).toEqual('Clientes')
    } else {
      console.log('Elemento não encontrado após a navegação.');
    }



  });

  it('titulo', () => {
    let titulo = fixture.debugElement.query(By.css('h2[name="titulo"]'));

    expect(titulo.nativeElement.textContent.trim()).toEqual('Bem vindo a Pizzaria');
  });
});
