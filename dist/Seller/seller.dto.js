"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailDTO = exports.UpdatePasswordDTO = exports.OrderDTO = exports.PinCodeDTO = exports.AddressDTO = exports.SellerDTO = exports.FeedbackDTO = exports.BookDTO = void 0;
const class_validator_1 = require("class-validator");
class BookDTO {
}
exports.BookDTO = BookDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Book ID cannot be empty or null' }),
    __metadata("design:type", Number)
], BookDTO.prototype, "Book_ID", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Title cannot be empty or null' }),
    (0, class_validator_1.IsString)({ message: 'Title should be a string' }),
    (0, class_validator_1.MinLength)(3, { message: 'Title should be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Title should not be more than 50 characters long' }),
    __metadata("design:type", String)
], BookDTO.prototype, "Title", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Author Name should be a string' }),
    (0, class_validator_1.MinLength)(3, { message: 'Author Name should be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Author Name should not be more than 50 characters long' }),
    __metadata("design:type", String)
], BookDTO.prototype, "Author", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'ISBN number cannot be empty or null' }),
    (0, class_validator_1.MinLength)(7, { message: 'ISBN number should be at least 10 characters long' }),
    (0, class_validator_1.MaxLength)(14, { message: 'ISBN number should not be more than 20 characters long' }),
    __metadata("design:type", String)
], BookDTO.prototype, "ISBN", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Condition should be a string' }),
    (0, class_validator_1.MinLength)(3, { message: 'Condition should be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(12, { message: 'Condition should not be more than 50 characters long' }),
    __metadata("design:type", String)
], BookDTO.prototype, "Condition", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Price cannot be empty or null' }),
    (0, class_validator_1.MaxLength)(7, { message: 'Price number should not be more than 7 characters long' }),
    __metadata("design:type", String)
], BookDTO.prototype, "Price", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Book Image Name should be a string' }),
    __metadata("design:type", String)
], BookDTO.prototype, "Book_Image", void 0);
class FeedbackDTO {
}
exports.FeedbackDTO = FeedbackDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Feedback ID cannot be empty or null' }),
    __metadata("design:type", Number)
], FeedbackDTO.prototype, "Feedback_ID", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Name should be a string' }),
    (0, class_validator_1.MinLength)(1, { message: 'Name should be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(120, { message: 'Name should not be more than 50 characters long' }),
    __metadata("design:type", String)
], FeedbackDTO.prototype, "Comment", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Date should be a string' }),
    __metadata("design:type", String)
], FeedbackDTO.prototype, "Date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Sender ID cannot be empty or null' }),
    (0, class_validator_1.IsInt)({ message: 'Feedback Sender ID should be an integer' }),
    __metadata("design:type", Number)
], FeedbackDTO.prototype, "Sender_ID", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'Feedback Receiver ID should be an integer' }),
    __metadata("design:type", Number)
], FeedbackDTO.prototype, "Receiver_ID", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Receiver Type should be a string' }),
    __metadata("design:type", String)
], FeedbackDTO.prototype, "Receiver_Type", void 0);
class SellerDTO {
}
exports.SellerDTO = SellerDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Seller ID cannot be empty or null' }),
    __metadata("design:type", Number)
], SellerDTO.prototype, "Seller_ID", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Seller Name should be a string' }),
    (0, class_validator_1.MinLength)(3, { message: 'Seller Name should be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Seller Name should not be more than 50 characters long' }),
    __metadata("design:type", String)
], SellerDTO.prototype, "Name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Seller Name cannot be empty or null' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please enter a valid email address' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Email should not be more than 100 characters long' }),
    __metadata("design:type", String)
], SellerDTO.prototype, "Email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Seller Password cannot be empty or null' }),
    (0, class_validator_1.IsString)({ message: 'Password should be a string' }),
    (0, class_validator_1.Matches)(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/, { message: 'Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character, and is at least 8 characters long.' }),
    __metadata("design:type", String)
], SellerDTO.prototype, "Password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Seller Phone Number cannot be empty or null' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Phone number cannot be empty or null' }),
    (0, class_validator_1.MinLength)(10, { message: 'Phone number should be at least 10 characters long' }),
    (0, class_validator_1.MaxLength)(20, { message: 'Phone number should not be more than 20 characters long' }),
    __metadata("design:type", String)
], SellerDTO.prototype, "Phone", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Profile Picture Name should be a string' }),
    __metadata("design:type", String)
], SellerDTO.prototype, "Profile_Picture", void 0);
class AddressDTO {
}
exports.AddressDTO = AddressDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Address ID cannot be empty or null' }),
    __metadata("design:type", Number)
], AddressDTO.prototype, "Address_ID", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Seller Street Address cannot be empty or null' }),
    (0, class_validator_1.IsString)({ message: 'Street should be a string' }),
    __metadata("design:type", String)
], AddressDTO.prototype, "Street", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Building should be a string' }),
    __metadata("design:type", String)
], AddressDTO.prototype, "Building", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Seller City Address cannot be empty or null' }),
    (0, class_validator_1.IsString)({ message: 'City should be a string' }),
    __metadata("design:type", String)
], AddressDTO.prototype, "City", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Seller Country Address cannot be empty or null' }),
    (0, class_validator_1.IsString)({ message: 'Country should be a string' }),
    __metadata("design:type", String)
], AddressDTO.prototype, "Country", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Seller ZIP Address cannot be empty or null' }),
    __metadata("design:type", String)
], AddressDTO.prototype, "ZIP", void 0);
class PinCodeDTO {
}
exports.PinCodeDTO = PinCodeDTO;
class OrderDTO {
}
exports.OrderDTO = OrderDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Order ID cannot be empty or null' }),
    __metadata("design:type", Number)
], OrderDTO.prototype, "Order_ID", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Order Date cannot be empty or null' }),
    __metadata("design:type", String)
], OrderDTO.prototype, "Order_Date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Order Status cannot be empty or null' }),
    __metadata("design:type", String)
], OrderDTO.prototype, "Order_Status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Order Total cannot be empty or null' }),
    __metadata("design:type", String)
], OrderDTO.prototype, "Book_Name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Order Total cannot be empty or null' }),
    __metadata("design:type", String)
], OrderDTO.prototype, "Book_Price", void 0);
class UpdatePasswordDTO {
}
exports.UpdatePasswordDTO = UpdatePasswordDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Seller Password cannot be empty or null' }),
    (0, class_validator_1.IsString)({ message: 'Password should be a string' }),
    (0, class_validator_1.Matches)(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/, { message: 'Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character, and is at least 8 characters long.' }),
    __metadata("design:type", String)
], UpdatePasswordDTO.prototype, "Password", void 0);
class MailDTO {
}
exports.MailDTO = MailDTO;
//# sourceMappingURL=seller.dto.js.map