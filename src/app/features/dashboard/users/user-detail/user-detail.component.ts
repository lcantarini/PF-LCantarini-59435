import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models';
import { UsersService } from '../../../../core/services/users.service';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  userDetailed?: User;

  constructor(private activatedRoute: ActivatedRoute, private usersService: UsersService) {
    this.loadUsers(activatedRoute.snapshot.params['id']);
  }

  loadUsers(id: string): void {
    this.usersService.getById(id).subscribe({
      next: (user) => this.userDetailed = user
    });
  }

}
