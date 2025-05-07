export class SignUpModel{
  private formData: any;

  constructor(formData: any) {
    this.formData = formData;
  }

  private cleanMask(value: string): string {
    return value.replace(/\D/g, '');
  }

  private convertBirthDate(birthDate: string | Date | null): string | null {
    if (!birthDate) return null;

    let date: Date;

    // Caso birthDate seja uma string (ex.: "05/05/2007")
    if (typeof birthDate === 'string') {
      const [day, month, year] = birthDate.split('/').map(Number);
      date = new Date(year, month - 1, day);
    }
    // Caso birthDate seja um objeto Date
    else if (birthDate instanceof Date) {
      date = birthDate;
    }
    // Caso seja um tipo inválido
    else {
      throw new Error('Formato de data de nascimento inválido.');
    }

    // Validar a data
    if (isNaN(date.getTime())) {
      throw new Error('Data de nascimento inválida.');
    }

    return date.toISOString(); // ex.: "2007-05-05T00:00:00.000Z"
  }

  public mapToBackendFormat(): any {
    try {
      const birthDate = this.convertBirthDate(this.formData.birthDate);

      return {
        person: {
          name: this.formData.name,
          lastName: this.formData.lastName,
          cpf: this.cleanMask(this.formData.cpf),
          birthDate: birthDate,
          gender: this.formData.gender,
        },
        contact: {
          cellphone: this.cleanMask(this.formData.cellphone),
        },
        address: {
          cep: this.cleanMask(this.formData.cep),
          address: this.formData.address,
          number: this.formData.number,
          complement: this.formData.complement,
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
}
