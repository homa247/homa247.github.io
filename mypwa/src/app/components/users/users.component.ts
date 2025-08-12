import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatButtonModule, MatSuffix, MatInput, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: string[] = [];
  newUser: string = '';

  ngOnInit() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
  }

  addUser() {
    if (this.newUser.trim()) {
      this.users.push(this.newUser.trim());
      localStorage.setItem('users', JSON.stringify(this.users));
      this.newUser = '';
    }
  }

  removeUser(index: number) {
    this.users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
