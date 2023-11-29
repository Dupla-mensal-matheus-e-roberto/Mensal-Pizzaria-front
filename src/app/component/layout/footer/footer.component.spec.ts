import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain copyright text', () => {
    const copyrightText = fixture.nativeElement.querySelector('.footer p').textContent;
    expect(copyrightText).toContain('© Pizzaria Poggers. Todos os direitos reservados.');
  });

  it('should contain privacy policy link', () => {
    const privacyPolicyLink = fixture.nativeElement.querySelector('.footer .footer-links a[name="politica"]');

    expect(privacyPolicyLink).toBeTruthy();
    expect(privacyPolicyLink.textContent).toContain('Política de Privacidade');
  });

  it('should contain terms of service link', () => {
    const termsOfServiceLink = fixture.nativeElement.querySelector('.footer .footer-links a[name="termos"]');

    expect(termsOfServiceLink).toBeTruthy();
    expect(termsOfServiceLink.textContent).toContain('Termos de Serviço');
  });
});
