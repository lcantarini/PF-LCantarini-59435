import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../features/dashboard/users/models';

@Pipe({
  name: 'userFullName'
})
export class UserFullNamePipe implements PipeTransform {

  transform(value: User, transform?: 'uppercase'): string {
    console.log(transform); 
    
    const result = value.firstname + ' ' + value.lastname;
    
    if (transform === "uppercase"){
      return `${result}`.toUpperCase();

    }

    return result;
  }

  /*
  transform(value: any, ...args: unknown[]): unknown {
    console.log(value);
    return value.nombre + ' ' + value.apellido;
  }*/

    /*
  transform(value: any, ...args: unknown[]): unknown {
    if (args[0] === 'uppercase') {
      return `${value.nombre + ' ' + value.apellido}`.toUpperCase();
    }
    return value.nombre + ' ' + value.apellido;
  }*/


}
