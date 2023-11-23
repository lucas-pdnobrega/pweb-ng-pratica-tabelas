import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefonePipe'
})
export class TelefonePipe implements PipeTransform {

  transform(fone: string): string {
    if (10 !== fone.length && fone.length !== 8) throw new Error('Telefone com tamanho inválido!');

    let formatado: string = "";

    if (fone.length === 8) formatado = `${fone.slice(0, 4)}-${fone.slice(4,9)}`;
    if (fone.length === 10) formatado = `(${fone.slice(0, 2)}) ${fone.slice(2, 6)}-${fone.slice(6, 10)}`;

    return formatado;
  }

}
