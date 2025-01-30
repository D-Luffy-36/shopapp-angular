import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http'; // Import HttpClientModule
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service'
import { RegisterDTO } from '../../dtos/register.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  // khai báo các biến tương ứng với các trường dữ liệu trong form
  fullname: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
  isAccepted: boolean;
  dateOfBirth: Date;

  // inject UserService
  constructor(private router: Router, private userService: UserService) {
    this.fullname = '';
    this.address = '';
    this.phone = '';
    this.password = '';
    this.confirmPassword = '';
    this.isAccepted = false;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18)
  }
  // validate phone

  onPhoneChange() {
    console.log(this.phone)
  }

  register() {
    const userData: RegisterDTO = {
      "fullname": this.fullname,
      "phone_number": this.phone,
      "address": this.address,
      "password": this.password,
      "retype_password": this.confirmPassword,
      "is_active": true,
      "date_of_birth": this.dateOfBirth,
      "facebook_account_id": "0",
      "role_id": 1,
      "google_account_id": ''
    }

    const fakeData: RegisterDTO = {
      "fullname": "An Pham",
      "phone_number": "012345645",
      "address": "55 tân chánh hiệp 26, quận 12",
      "password": "SecurePassword123",
      "retype_password": "SecurePassword123",
      "is_active": true,
      "date_of_birth": new Date("2004-08-07T00:00:00+07:00"),
      "role_id": 2,
      facebook_account_id: '',
      google_account_id: ''
    }


    this.userService.register(fakeData).subscribe({
      next: (response: any) => {
        // Xử lý phản hồi thành công
        console.log('register successfully:', response);
      },
      error: (err: any) => {
        // Xử lý lỗi
        console.error('error register:', err);
        alert('can not register.');
      },
    }
    );
  }

  // how to check password match confirm password
  checkPasswordsMatch() {
    if (this.password !== this.confirmPassword) {
      this.registerForm.form.controls['confirmPassword'].setErrors({ 'passwordMismatch': true })
    }
    else {
      this.registerForm.form.controls['confirmPassword'].setErrors(null)
    }
  }
  checkAge() {
    // vượt quá năm hiện tại
    // nhỏ hơn 18 tuổi
    if (this.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      // check tháng nếu bằng thì check ngày lấy tuổi chuẩn
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        this.registerForm.form.controls['dateOfBirth'].setErrors({ 'invalidAge': true })
      } else {
        this.registerForm.form.controls['dateOfBirth'].setErrors(null)
      }
    }
  }

}
