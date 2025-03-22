import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateUserDTO } from 'src/app/dtos/user.update';
import { ApiResponse } from 'src/app/responses/api.response';
import { UserResponse } from 'src/app/responses/user/user.response';
import { TokenService } from 'src/app/service/user/token.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  @ViewChild("profileForm") profileForm!: NgForm;

  user!: UserResponse;

  dataUpdate!: UpdateUserDTO;

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    const user = this.userService.getUserFromLocalStorage();
    if (!user) {
      return;
    }
    this.user = user;
    this.dataUpdate = {
      phone_number: user.phone_number,
      full_name: user.full_name ?? '',
      address: user.address ?? '',
      date_of_birth: user.date_of_birth ?? new Date(),
      roles: user.roles ?? [],
      password: '',
      retype_password: ''
    };
  }

  /**
   * Kiểm tra mật khẩu có khớp hay không
   */
  checkPasswordsMatch(): void {
    if (this.dataUpdate.password && this.dataUpdate.password !== this.dataUpdate.retype_password) {
      this.profileForm.form.controls['retype_password'].setErrors({ 'passwordMismatch': true });
    } else {
      this.profileForm.form.controls['retype_password'].setErrors(null);
    }
  }

  /**
   * Kiểm tra tuổi hợp lệ
   */
  checkAge(): void {
    if (this.dataUpdate?.date_of_birth) {
      const today = new Date();
      const birthDate = new Date(this.dataUpdate?.date_of_birth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        this.profileForm.form.controls['dateOfBirth'].setErrors({ 'invalidAge': true });
      } else {
        this.profileForm.form.controls['dateOfBirth'].setErrors(null);
      }
    }
  }

  /**
   * Cập nhật thông tin người dùng
   */
  updateUser(): void {
    if (this.profileForm.invalid) {
      this.profileForm.form.markAllAsTouched();
      return;
    }

    const token = this.tokenService.getToken();
    if (!token) {
      this.router.navigate(["/login"]);
      return;
    }

    // Loại bỏ mật khẩu nếu không được nhập
    const updateData: UpdateUserDTO = { ...this.dataUpdate };
    if (!this.dataUpdate.password) {
      delete updateData.password;
      delete updateData.retype_password;
    }

    this.userService.update(updateData).subscribe({
      next: (userApiResponse: ApiResponse<UserResponse>) => {
        this.dataUpdate = {
          ...userApiResponse.data,
          password: '',
          retype_password: ''
        };
        alert("Update userId: " + this.user.id + " successfully");
      },
      error: (error) => {
        console.error(error);
        alert("Failed to update user.");
      }
    });
  }
}