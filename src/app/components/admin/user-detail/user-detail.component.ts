import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUserDTO } from 'src/app/dtos/user.update';
import { ApiResponse } from 'src/app/responses/api.response';
import { UserResponse } from 'src/app/responses/user/user.response';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userId?: number;
  userDetail?: UserResponse;
  errorMessage: string = '';
  newPassword: string = ''; // Mật khẩu mới
  confirmPassword: string = ''; // Xác nhận mật khẩu

  availableRoles: string[] = ['ADMIN', 'USER', 'STAFF'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    // this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.route.params.subscribe(params => {
      this.userId = Number(params['id']);
    })
    if (this.userId !== undefined) {
      this.fetchUserDetail(this.userId);
    } else {
      console.error('User ID is undefined.');
      this.errorMessage = 'Invalid user ID.';
    }

  }

  /**
 * Gọi API để lấy chi tiết người dùng
 */

  fetchUserDetail(userId: number): void {
    this.userService.getUserDetail(userId).subscribe({
      next: (response: ApiResponse<UserResponse>) => {
        this.userDetail = response.data;
      },
      error: (error: any) => {
        console.error('Error fetching user detail:', error);
        this.errorMessage = 'Failed to load user details.';
      }
    });
  }


  /**
   * Gán hoặc bỏ gán vai trò
   */
  toggleRole(role: string): void {
    if (this.userDetail) {
      const index = this.userDetail.roles.indexOf(role);
      if (index > -1) {
        this.userDetail.roles.splice(index, 1); // Bỏ vai trò
      } else {
        this.userDetail.roles.push(role); // Gán vai trò
      }
    }
  }

  /**
  * Vô hiệu hóa tài khoản
  */
  blockUser(): void {
    if (this.userDetail) {
      this.userDetail.active = false;
      this.updateUser(); // Gọi cập nhật để lưu trạng thái
    }
  }

  /**
  * Cập nhật thông tin người dùng
  */
  updateUser(): void {

    if (this.newPassword && this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (this.userDetail) {
      // Chuẩn bị dữ liệu cập nhật
      const updateData: UpdateUserDTO = {
        full_name: this.userDetail.full_name,
        phone_number: this.userDetail.phone_number,
        address: this.userDetail.address,
        is_active: this.userDetail.active,
        date_of_birth: new Date(this.userDetail.date_of_birth),
        roles: this.userDetail.roles,
      };

      // Nếu mật khẩu mới được nhập, thêm vào dữ liệu cập nhật
      if (this.newPassword) {
        updateData.password = this.newPassword;
        updateData.retype_password = this.confirmPassword;

        // Kiểm tra nếu mật khẩu mới được nhập nhưng không khớp
        if (this.newPassword && this.newPassword !== this.confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
      }

      this.userService.updateUser(this.userId!, updateData).subscribe({
        next: () => {
          alert('User updated successfully!');
        },
        error: (error: any) => {
          console.error('Error updating user:', error);
          alert('Failed to update user.');
        }
      });
    }
  }



  goBack() {
    this.router.navigate(['/admin/users']);
  }


}
