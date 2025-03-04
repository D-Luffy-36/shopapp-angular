import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginDTO } from '../../dtos/login.dto';
import { UserService } from '../../service/user/user.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../responses/user/login.response'
import { ApiResponse } from '../../responses/api.response';
import { TokenService } from 'src/app/service/user/token.service';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/service/user/role.service';
import { UserResponse } from '../../responses/user/user.response'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  roles: Role[] = []; // Mảng roles
  selectRole: Role | undefined;

  @ViewChild('loginForm') loginForm!: NgForm;
  // không để private để cho nơi khác truy cập nữa
  phone: string;
  password: string;
  rememberMe: boolean;
  userResponse?: UserResponse;

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
    // this.roleService.getRoles().subscribe({
    //   next: (response: ApiResponse<Role[]>) => {
    //     this.roles = response.data;

    //     this.selectRole = this.roles.length > 0 ? this.roles[1] : undefined;
    //     console.log("roles: " + JSON.stringify(this.roles));
    //   },
    //   error: (error: any) => {
    //     debugger
    //     console.error('Error getting roles:', error);
    //   }
    // })
  }

  login() {
    const loginDTO: LoginDTO = {
      "phone_number": this.phone,
      "password": this.password,
    };

    const loginDTOFake: LoginDTO = {
      "phone_number": "012345613",
      "password": "SecurePassword123"
    }

    this.userService.login(loginDTO).subscribe({
      next: (response: ApiResponse<LoginResponse>) => {
        // Xử lý phản hồi thành công

        // Nếu token có giá trị truthy (khác null, undefined, false, 0, NaN, hoặc ""), thì khối lệnh trong if sẽ được thực thi.
        // lưu trữ token
        const { token } = response.data;
        if (token) {
          this.tokenService.setToken(token);
          debugger
          this.userService.getUserDetail(token).subscribe({
            next: (userApiResponse: ApiResponse<UserResponse>) => {
              if (userApiResponse.message || userApiResponse.status === 'BAD_REQUEST') {
                alert(userApiResponse.message)
                return;
              }
              this.userResponse = userApiResponse.data;

              // Check if the user has an admin role
              if (this.userResponse.role.name === 'admin') {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/']);
              }

              this.userService.saveUserResponseToLocalStorage(this.userResponse);
            },
            error: (err: any) => {
              debugger;
              console.log("error: ", err)
            }
          })
        } else {
          this.router.navigate(['/']);
        }
        alert("Welcome to shop app")
      },
      error: (err: any) => {
        alert('Login failed: ' + err.error.message);
      }
    });

  }

}
