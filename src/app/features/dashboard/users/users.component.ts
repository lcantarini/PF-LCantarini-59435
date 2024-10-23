import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { User } from './models';
import { ActivatedRoute, Router } from '@angular/router';


const ELEMENT_DATA: User[] = [
  {id: '1', firstName: 'Hydrogen',  lastName: 'Gonzalez', createdAt: new Date(), email: 'Hydrogen@gmail.com'},
  {id: '2', firstName: 'Helium', lastName: 'Gomez', createdAt: new Date(), email: 'Helium@gmail.com'},
  {id: '3', firstName: 'Lithium', lastName: 'Perez', createdAt: new Date(), email: 'Lithium@gmail.com'},
  {id: '4', firstName: 'Beryllium', lastName: 'Fernandez', createdAt: new Date(), email: 'Beryllium@gmail.com'},
  {id: '5', firstName: 'Boron', lastName: 'Aguilera', createdAt: new Date(), email: 'Boron@gmail.com'},
  {id: '6', firstName: 'Carbon', lastName: 'Caceres', createdAt: new Date(), email: 'Carbon@gmail.com'},
  {id: '7', firstName: 'Nitrogen', lastName: 'Martinez', createdAt: new Date(), email: 'Nitrogen@gmail.com'},
  {id: '8', firstName: 'Oxygen', lastName: 'Hidalgo', createdAt: new Date(), email: 'Oxygen@gmail.com'},
  {id: '9', firstName: 'Fluorine', lastName: 'Lopez', createdAt: new Date(), email: 'Fluorine@gmail.com'},
  {id: '10',firstName: 'Neon', lastName: 'Suarez', createdAt: new Date(), email: 'Neon@gmail.com'},
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'actions' ];
  dataSource = ELEMENT_DATA;

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ){}

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.dataSource = this.dataSource.filter((user) => user.id !== id)
    }
    
  }

  goToDetail(id: string): void {
    this.router.navigate([id, 'detail'], { relativeTo: this.activatedRoute})
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

          if (!!result){
            if (editingUser) {
              this.dataSource = this.dataSource.map((user) => user.id === editingUser.id ? {...user, ...result} : user
            );
            } else {
              this.dataSource = [ ...this.dataSource, result ];
            }
            
          }
        }
      });
  }
}
