// Import thư viện Express để tạo ứng dụng web và API dễ dàng
const express = require('express');

// Import mongoose để kết nối và làm việc với MongoDB
const mongoose = require('mongoose');

// Import CORS (Cross-Origin Resource Sharing) để cho phép giao tiếp giữa các miền khác nhau
const cors = require('cors');

// Import model UserModel từ file `models/Users.js` để tương tác với collection 'users' trong MongoDB
const UserModel = require('./models/Users');

// Khởi tạo ứng dụng Express
const app = express();

// Sử dụng CORS để cho phép ứng dụng chấp nhận yêu cầu từ các domain khác
app.use(cors());

// Sử dụng middleware express.json() để parse dữ liệu JSON từ request body
app.use(express.json());

// Kết nối đến cơ sở dữ liệu MongoDB qua mongoose
mongoose.connect("mongodb+srv://danghoa:danghoa123@user.wotow.mongodb.net/crud")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Failed to connect to MongoDB:", err));

app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.get('/getUser/:id', (req, res) => {
    const { id } = req.params;
    console.log("Requested ID:", id);
    UserModel.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/updateUser/:id', (req, res) => {
    UserModel.updateOne(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})


app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(err => res.status(500).json(err));
});




// Định nghĩa route POST tại đường dẫn `/createUser`
// Route này sẽ nhận dữ liệu từ request body và tạo một user mới trong MongoDB
app.post("/createUser", (req, res) => {
    // Dùng phương thức `create` của `UserModel` để lưu user vào MongoDB
    UserModel.create(req.body)
        .then(users => res.json(users)) // Trả về dữ liệu của user vừa tạo dưới dạng JSON nếu thành công
        .catch(err => res.json(err))    // Trả về lỗi dưới dạng JSON nếu có lỗi xảy ra
});

// Lắng nghe các yêu cầu đến cổng 3001
app.listen(3001, () => {
    console.log("Server is running");
});
