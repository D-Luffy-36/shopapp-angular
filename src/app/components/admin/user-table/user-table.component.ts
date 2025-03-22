import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasePaginationComponent } from 'src/app/models/pagination/base.pagination.component';
import { ListUserResponse } from 'src/app/responses/user/list.user.response';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent extends BasePaginationComponent<ListUserResponse> implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    super(); // Gọi constructor của BasePaginationComponent
  }

  ngOnInit(): void {
    this.loadData(this.keyWord, this.currentPage - 1, this.itemsPerPage);
  }

  /**
  * Implement hàm loadData từ BasePaginationComponent
  */
  override loadData(keyWord: string, page: number, limit: number): void {
    this.userService.getListUsers(keyWord, page, limit).subscribe({
      next: (response: ListUserResponse) => {
        if (response && response.users) {
          this.listData = response; // Gán dữ liệu trả về
          console.log(this.listData);
          this.totalPages = response.totalPages; // Gán tổng số trang
          this.generateVisiblePages(); // Sinh ra các trang hiển thị
        } else {
          console.error('Invalid response format:', response);
        }

      },
      error: (error: any) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  /**
  * Search users
  */
  onSearch(): void {
    this.currentPage = 1; // Reset to the first page
    this.loadData(this.keyWord, this.currentPage, this.itemsPerPage);
  }

  /**
  * View user details
  */
  viewUser(userId: number): void {
    this.router.navigate(['/admin/users', userId]);
  }

  /**
   * Edit user
   */
  editUser(userId: number): void {
    this.router.navigate(['/admin/users/edit', userId]);
  }

  /**
   * Delete user
   */
  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.softDeleteUser(userId).subscribe({
        next: () => {
          alert('User deleted successfully');
          this.loadData(this.keyWord, this.currentPage, this.itemsPerPage);
        },
        error: (error: any) => {
          console.error(error);
          alert('Failed to delete user');
        }
      });
    }
  }



}
