import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signUp',
  standalone: false,
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.scss']
})
export class SignUpComponent{
  private fb:FormBuilder = inject(FormBuilder);

  form: FormGroup;
  maxDate: Date;
  minDate: Date;

  constructor() {
    const today = new Date();
    const maxYear = today.getFullYear() - 18;
    const minYear = today.getFullYear() - 100;
    this.maxDate = new Date(maxYear, today.getMonth(), today.getDate());
    this.minDate = new Date(minYear, today.getMonth(), today.getDate());

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, this.validateCPF]], // Validação personalizada de CPF
      birthDate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      cellphone: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      state: ['', [Validators.required]],
      neighborhood: ['', [Validators.required]],
      address: ['', [Validators.required]],
      number: ['', [Validators.required]],
      complement: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  validateCPF(control: { value: string }) {
    const cpf = control.value.replace(/\D/g, '');

    if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
      return { invalidCPF: true };
    }

    // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) {
      return { invalidCPF: true };
    }

    // Validação dos dígitos verificadores
    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return { invalidCPF: true };
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) {
      return { invalidCPF: true };
    }

    return null;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Formulário válido:', this.form.value);
    } else {
      console.log('Formulário inválido');
    }
  }

}
