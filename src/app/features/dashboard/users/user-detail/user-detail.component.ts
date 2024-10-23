import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  idUsuario?: string;

  constructor(private activatedRoute: ActivatedRoute) {
    console.log('La ruta activa es: ', activatedRoute)
    this.idUsuario = activatedRoute.snapshot.params['id'];
  }

}
