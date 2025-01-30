import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginDTO } from '../../dtos/login.dto';
import { UserService } from '../../service/user/user.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../responses/user/login.response'
import { ApiResponse } from '../../responses/api.response';
import { TokenService } from 'src/app/service/user/token.service';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/service/user/role.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  roles: Role[] = []; // Mảng roles
  selectRole: Role | undefined;

  @ViewChild('loginForm') loginForm!: NgForm;
  // không để private để cho nơi khác truy cập nữa
  phone: string;
  password: string;
  rememberMe: boolean;

  constructor(private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService
  ) {
    this.phone = '';
    this.password = '';
    this.rememberMe = false;

  }

  ngOnInit() {
    // Gọi API lấy danh sách roles và lưu vào biến roles
    this.roleService.getRoles().subscribe({
      next: (response: ApiResponse<Role[]>) => {
        this.roles = response.data;

        this.selectRole = this.roles.length > 0 ? this.roles[1] : undefined;
        console.log("roles: " + JSON.stringify(this.roles));
      },
      error: (error: any) => {
        debugger
        console.error('Error getting roles:', error);
      }
    })
  }

  login() {
    const loginDTO: LoginDTO = {
      "phone_number": this.phone,
      "password": this.password,
      "role_id": this.selectRole?.id ?? 2,
    }

    const loginDTOFake: LoginDTO = {
      "phone_number": "012345613",
      "password": "SecurePassword123",
      "role_id": 2
    }

    this.userService.login(loginDTOFake).subscribe({
      next: (response: ApiResponse<LoginResponse>) => {
        // Xử lý phản hồi thành công

        // lưu trữ token
        const { token } = response.data;
        if (this.rememberMe) {
          this.tokenService.setToken(token);
        }
        alert("Well come shop app")
      },
      error: (err: any) => {
        alert('Login failed: ' + err.error.message);
      }
    });

  }

}


// b1 binding data two way

// {
//   "message": "Đăng nhập thành công",
//   "status": "OK",
//   "data": {
//       "tokenType": null,
//       "token": "eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjAxMjM0NTY0MSIsInJvbGVJZCI6MSwic3ViIjoiMDEyMzQ1NjQxIiwiZXhwIjoxNzQwNTU5MDAwfQ.EwZLhQx24BMKJCCldPoi2K_EuiuKaKxRCDpE_m_Tjok",
//       "refresh_token": null
//   }
// }