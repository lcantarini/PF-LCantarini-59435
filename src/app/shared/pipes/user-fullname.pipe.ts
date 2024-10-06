import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFullname'
})
export class UserFullnamePipe implements PipeTransform {

  transform(value: any, transform?: 'uppercase'): unknown {
    console.log(transform); 
    
    const result = value.nombre + ' ' + value.apellido;
    
    if (transform === "uppercase"){
      return `${result}`.toUpperCase();

    }

    return result;
  }

}
