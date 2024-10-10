import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userCompleteName'
})
export class UserCompleteNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
