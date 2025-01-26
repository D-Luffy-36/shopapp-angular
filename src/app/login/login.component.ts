import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginDTO } from '../dtos/login.dto';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  // không để private để cho nơi khác truy cập nữa
  phone: string;
  password: string;
  rememberMe: boolean;

  constructor(private router: Router, private userService: UserService) {
    this.phone = '';
    this.password = '';
    this.rememberMe = false
  }


  login() {
    const loginDTO: LoginDTO = {
      "phone_number": this.phone,
      "password": this.password,
      "role_id": 2
    }

    const loginDTOFake: LoginDTO = {
      "phone_number": "012345613",
      "password": "SecurePassword123",
      "role_id": 2
    }
    this.userService.login(loginDTO).subscribe({
      next: (response: any) => {
        // Xử lý phản hồi thành công
        alert("Well Come Shop app");
      },
      error: (err: any) => {
        alert('Login failed: ' + err.error.message);
      }

    });


  }

}


// b1 binding data two way