import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../features/dashboard/students/models';

@Pipe({
  name: 'studentFullName'
})
export class studentFullNamePipe implements PipeTransform {

  transform(value: Student, transform?: 'uppercase'): string {
    if(!!value){
    const result = value.firstName + ' ' + value.lastName;
    
    if (transform === "uppercase"){
      return `${result}`.toUpperCase();

    }

    
      return result;
    }else{
      return '';
    }
  }

}
