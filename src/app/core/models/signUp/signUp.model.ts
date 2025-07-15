import { CreateFormModel } from "./createForm.model";
import * as moment from 'moment';

export class SignUpModel{
  private formData: CreateFormModel;

  constructor(formData: CreateFormModel) {
    this.formData = formData;
    let data = this.mapToBackendFormat();

    return data;
  }

  private cleanMask(value: string): string {
    return value.replace(/\D/g, '');
  }

  private convertBirthDate(birthDate: any): string | null {
    let momentDate: moment.Moment;

    if (!birthDate) return null;

    let date: Date;

    if (typeof birthDate === 'string') {
      const [day, month, year] = birthDate.split('/').map(Number);
      date = new Date(year, month - 1, day);
    }
    else if (birthDate instanceof Date) {
      date = birthDate;
    }
    else if(moment.isMoment(birthDate)){
      momentDate = birthDate;
      date = momentDate.toDate();
    }
    else {
      throw new Error('Formato de data de nascimento inválido.');
    }

    return date.toISOString();
  }

  public mapToBackendFormat(): any {
    try {
      const birthDate = this.convertBirthDate(this.formData.birthDate);

      return {
        person: {
          name: this.capitalizeFirstLetter(this.formData.name!),
          middleName: this.capitalizeFirstLetter(this.formData.lastName!),
          cpf: this.cleanMask(this.formData.cpf!),
          birthDate: birthDate,
          gender: this.formData.gender == "Male" ? "M" : "F",
        },
        contact: {
          cellPhone: this.cleanMask(this.formData.cellphone!),
        },
        address: {
          cep: this.cleanMask(this.formData.cep!),
          street: this.capitalizeFirstLetter(this.formData.address!),
          number: this.formData.number,
          city: this.capitalizeFirstLetter(this.formData.city!),
          neighborhood: this.capitalizeFirstLetter(this.formData.neighborhood!),
          state: this.formData.state == undefined ? "" : this.formData.state.toUpperCase(),
          complement: this.capitalizeFirstLetter(this.formData.complement!),
        },
        login: {
          email: this.formData.email,
          password: this.formData.password,
        },
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  capitalizeFirstLetter(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
