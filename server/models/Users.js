// Import thư viện mongoose để kết nối và làm việc với MongoDB
const mongoose = require('mongoose');

// Định nghĩa một schema (cấu trúc dữ liệu) cho đối tượng User
// Schema này mô tả các trường dữ liệu và kiểu dữ liệu của từng trường
const UserSchema = new mongoose.Schema({
    name: String,  // Trường 'name' có kiểu chuỗi, dùng để lưu tên người dùng
    email: String, // Trường 'email' có kiểu chuỗi, dùng để lưu địa chỉ email
    age: Number    // Trường 'age' có kiểu số, dùng để lưu tuổi của người dùng
});

// Tạo một model từ schema UserSchema đã định nghĩa ở trên
// Model này đại diện cho collection 'users' trong MongoDB
const UserModel = mongoose.model("users", UserSchema);

// Xuất (export) model UserModel để có thể sử dụng ở các file khác trong dự án
module.exports = UserModel;
