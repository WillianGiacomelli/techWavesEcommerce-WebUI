import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxMaskService } from 'ngx-mask';
import { CepHttpService } from '../../services/http/cep-http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signUp',
  standalone: false,
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.scss']
})
export class SignUpComponent{
    form: FormGroup;
    maxDate: Date;
    minDate: Date;

    public fb:FormBuilder = inject(FormBuilder);
    private _cepHttpService:CepHttpService = inject(CepHttpService);
    private _toastr: ToastrService = inject(ToastrService);

    constructor() {
      const today = new Date();
      const maxYear = today.getFullYear() - 18;
      const minYear = today.getFullYear() - 100;
      this.maxDate = new Date(maxYear, today.getMonth(), today.getDate());
      this.minDate = new Date(minYear, today.getMonth(), today.getDate());

      this.form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        cpf: ['', [Validators.required, this.validateCPF]],
        birthDate: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        cellphone: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        neighborhood: ['', [Validators.required]],
        address: ['', [Validators.required]],
        number: ['', [Validators.required]],
        complement: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

    ngOnInit(): void {
      this.applyCpfMask();
      this.applyCellphoneMask();
      this.applyCepMask();

      this.form.controls['state'].disable();
      this.form.controls['city'].disable();
      this.form.controls['neighborhood'].disable();
      this.form.controls['neighborhood'].disable();
    }


    applyCpfMask(): void {
      const cpfControl = this.form.get('cpf');
      if (cpfControl) {
        cpfControl.valueChanges.subscribe(value => {
          if (value) {
            const maskedValue = this.maskCpf(value);
            cpfControl.setValue(maskedValue, { emitEvent: false });
          }
        });
      }
    }

    applyCellphoneMask(): void {
      const cellphoneControl = this.form.get('cellphone');
      if (cellphoneControl) {
        cellphoneControl.valueChanges.subscribe(value => {
          if (value) {
            const maskedValue = this.maskCellphone(value);
            cellphoneControl.setValue(maskedValue, { emitEvent: false });
          }
        });
      }
    }

    applyCepMask(): void {
      const cepControl = this.form.get('cep');
      if (cepControl) {
        cepControl.valueChanges.subscribe(value => {
          if (value) {
            const maskedValue = this.maskCep(value);
            cepControl.setValue(maskedValue, { emitEvent: false });
          }
        });
      }
    }

    maskCpf(value: string): string {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .slice(0, 14);
    }

    maskCellphone(value: string): string {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
    }

    maskCep(value: string): string {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 9);
    }

    maskDate(value: string): string {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d{4})/, '$1/$2')
        .slice(0, 8);
    }

    validateCPF(control: { value: string }) {
      const cpf = control.value.replace(/\D/g, '');

      if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
        return { invalidCPF: true };
      }

      if (/^(\d)\1{10}$/.test(cpf)) {
        return { invalidCPF: true };
      }

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

    onBlurBirthDate(event: Event): void {
      const input = event.target as HTMLInputElement;
      let value = input.value;

      value = value.replace(/\D/g, '');

      const maskedValue = this.maskDate(value);
      input.value = maskedValue;

      this.form.get('birthDate')?.setValue(maskedValue, { emitEvent: false });
    }

    public getAddressByCEP(): void {
      const cep = this.form.get('cep')?.value;

      if(cep.length != 9 || (!!this.form.get('state')?.value)) return;

      this._cepHttpService.getAdrressByCEP(cep)
      .subscribe({
        next:(data) =>{
          if(data){
            if(data.erro == "true"){
              this._toastr.error('Erro ao consultar o CEP. Tente novamente.')
            }
            this.form.patchValue({
              state: data.uf,
              city: data.localidade,
              neighborhood: data.bairro,
              address: data.logradouro,
              complement: data.complemento
            });
          }
        },
        error:(error) =>{
          this._toastr.error('Erro ao consultar o CEP. Tente novamente.')
        }
      })
    }

    onSubmit() {
      if (this.form.valid) {
        console.log('Formulário válido:', this.form.value);
      } else {
        console.log('Formulário inválido');
      }
    }
}
