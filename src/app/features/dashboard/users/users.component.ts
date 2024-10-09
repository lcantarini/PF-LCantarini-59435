import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { AppModule } from '../../../app.module';
import { User } from './models';


const ELEMENT_DATA: User[] = [
  {id: '1', firstname: 'Hydrogen',  lastname: 'Gonzalez', createdAt: new Date(), email: 'Hydrogen@gmail.com'},
  {id: '2', firstname: 'Helium', lastname: 'Gomez', createdAt: new Date(), email: 'Helium@gmail.com'},
  {id: '3', firstname: 'Lithium', lastname: 'Perez', createdAt: new Date(), email: 'Lithium@gmail.com'},
  {id: '4', firstname: 'Beryllium', lastname: 'Fernandez', createdAt: new Date(), email: 'Beryllium@gmail.com'},
  {id: '5', firstname: 'Boron', lastname: 'Aguilera', createdAt: new Date(), email: 'Boron@gmail.com'},
  {id: '6', firstname: 'Carbon', lastname: 'Caceres', createdAt: new Date(), email: 'Carbon@gmail.com'},
  {id: '7', firstname: 'Nitrogen', lastname: 'Martinez', createdAt: new Date(), email: 'Nitrogen@gmail.com'},
  {id: '8', firstname: 'Oxygen', lastname: 'Hidalgo', createdAt: new Date(), email: 'Oxygen@gmail.com'},
  {id: '9', firstname: 'Fluorine', lastname: 'Lopez', createdAt: new Date(), email: 'Fluorine@gmail.com'},
  {id: '10',firstname: 'Neon', lastname: 'Suarez', createdAt: new Date(), email: 'Neon@gmail.com'},
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'actions' ];
  dataSource = ELEMENT_DATA;

  constructor(private matDialog: MatDialog){}

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.dataSource = this.dataSource.filter((user) => user.id !== id)
    }
    
  }
//
  openModal(editingUser?: User ): void {
    this.matDialog
      .open(UserDialogComponent, {
        data: {
          editingUser,
        }
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          console.log('RECIBIMOS: ', result);

          if(!!result){
            this.dataSource = [...this.dataSource, 
              {
                ...result,
              },
            ]
          }
        }
      });
  }
}
