import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CepHttpService } from '../../services/http/cep/cep-http.service';
import { SignUpModel } from '../../../../core/models/signUp/signUp.model';
import * as moment from 'moment';
import { CustomerHtppService } from '../../services/http/customer-http.service';

@Component({
  selector: 'app-signUp',
  standalone: false,
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.scss'],
})
export class SignUpComponent {
  isLoadingCEP: boolean = false;
  maxDate: Date;
  minDate: Date;

  public fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private _cepHttpService: CepHttpService = inject(CepHttpService);
  private _toastr: ToastrService = inject(ToastrService);
  private _customerHttpService: CustomerHtppService = inject(CustomerHtppService);

  constructor() {
    const today = new Date();
    const maxYear = today.getFullYear() - 18;
    const minYear = today.getFullYear() - 100;
    this.maxDate = new Date(maxYear, today.getMonth(), today.getDate());
    this.minDate = new Date(minYear, today.getMonth(), today.getDate());
  }

  protected form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    cpf: ['', [Validators.required, this._validateCPF]],
    birthDate: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    cellphone: ['', [Validators.required]],
    cep: ['', [Validators.required]],
    city: ['',  [Validators.required]],
    state:['', [Validators.required]],
    neighborhood: [ '', [Validators.required]],
    address: ['', [Validators.required]],
    number: ['', [Validators.required]],
    complement: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9@#$%^&+=!]{6,}$')]],
  });

  ngOnInit(): void {
    this._applyCpfMask();
    this._applyCellphoneMask();
    this._applyCepMask();
    this._applyInputDateMask();
  }

  private _applyInputDateMask(): void {
    const dateControl = this.form.get('birthDate');
    if (dateControl) {
      dateControl.valueChanges.subscribe((value) => {
        if (value && typeof value === 'string') {
          const maskedValue = this._maskDate(value);
          dateControl.setValue(maskedValue, { emitEvent: false });
        }
      });
    }
  }

  public onDateChange(event: any): void {
    const date = event.value;
    if (date instanceof Date) {
      const formattedDate = this._formatDate(date);
      this.form.get('birthDate')?.setValue(formattedDate, { emitEvent: false });
    }
  }

  private _applyCpfMask(): void {
    const cpfControl = this.form.get('cpf');
    if (cpfControl) {
      cpfControl.valueChanges.subscribe((value) => {
        if (value) {
          const maskedValue = this._maskCpf(value);
          cpfControl.setValue(maskedValue, { emitEvent: false });
        }
      });
    }
  }

  private _applyCellphoneMask(): void {
    const cellphoneControl = this.form.get('cellphone');
    if (cellphoneControl) {
      cellphoneControl.valueChanges.subscribe((value) => {
        if (value) {
          const maskedValue = this._maskCellphone(value);
          cellphoneControl.setValue(maskedValue, { emitEvent: false });
        }
      });
    }
  }

  private _applyCepMask(): void {
    const cepControl = this.form.get('cep');
    if (cepControl) {
      cepControl.valueChanges.subscribe((value) => {
        if (value) {
          const maskedValue = this._maskCep(value);
          cepControl.setValue(maskedValue, { emitEvent: false });
          return;
        }

        this.form.patchValue({
          state: "",
          city: "",
          neighborhood: "",
          address: "",
          complement: "",
        });

      });
    }
  }

  private _maskCpf(value: string): string {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .slice(0, 14);
  }

  private _maskCellphone(value: string): string {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
  }

  private _maskCep(value: string): string {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 9);
  }

  private _maskDate(value: string): string {
    const cleanValue = String(value).replace(/\D/g, '');
    return cleanValue
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .slice(0, 10);
  }

  private _validateCPF(control: { value: string }) {
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

  public validateDateFormat(control: { value: string }) {
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!control.value || !datePattern.test(control.value)) {
      return { invalidDateFormat: true };
    }
    const [day, month, year] = control.value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    if (
      date.getDate() !== day ||
      date.getMonth() !== month - 1 ||
      date.getFullYear() !== year
    ) {
      return { invalidDateFormat: true };
    }
    return null;
  }

  private _formatDate(date: Date | string): string {
    if (!date) return '';
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return '';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  public getAddressByCEP(): void {
    const cep = this.form.get('cep')?.value;

    if (!cep || cep.length != 9 || !!this.form.get('state')?.value) return;

    this.isLoadingCEP = true;

    this._cepHttpService.getAdrressByCEP(cep!).subscribe({
      next: (data) => {
        if (data) {
          if (data.erro == 'true') {
            this._toastr.error('Erro ao consultar o CEP. Tente novamente.');
          }
          this.form.patchValue({
            state: data.uf,
            city: data.localidade,
            neighborhood: data.bairro,
            address: data.logradouro,
            complement: data.complemento,
          });

          if (!data.bairro) {
            this.form.get('neighborhood')?.enable();
            this.form.get('address')?.enable();
          }
        }
      },
      complete:() =>{
        this.isLoadingCEP = false;
      },
      error: (error) => {
        this._toastr.error('Erro ao consultar o CEP. Tente novamente.');
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      let data = new SignUpModel(this.form.value);
      this._customerHttpService.create(data).subscribe({
        next: (response) => {
          if (response) {
            this._toastr.success('Cadastro realizado com sucesso!');
            this.form.reset();
          }
        },
        error: (error) => {
            this._toastr.error(error.error.message);
        },
      });
    }
  }
}
