import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent {
  @Input() isVisible: boolean = false; // Trạng thái hiển thị hộp chat
  messages: { user: string; content: string }[] = []; // Danh sách tin nhắn
  newMessage: string = ''; // Tin nhắn mới

  toggleChat(): void {
    this.isVisible = !this.isVisible; // Đổi trạng thái hiển thị
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({
        user: 'You', // Giả lập tên người dùng
        content: this.newMessage
      });
      this.newMessage = ''; // Xóa nội dung sau khi gửi
    }
  }
}