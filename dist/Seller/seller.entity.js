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
exports.SellerCustomerBookEntity = exports.OrderEntity = exports.PinCodeEntity = exports.FeedbackEntity = exports.BookEntity = exports.AddressEntity = exports.SellerEntity = void 0;
const typeorm_1 = require("typeorm");
let SellerEntity = class SellerEntity {
};
exports.SellerEntity = SellerEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SellerEntity.prototype, "Seller_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SellerEntity.prototype, "Name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SellerEntity.prototype, "Email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SellerEntity.prototype, "Password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SellerEntity.prototype, "Phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SellerEntity.prototype, "Profile_Picture", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BookEntity, book => book.seller),
    __metadata("design:type", Array)
], SellerEntity.prototype, "books", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OrderEntity, order => order.seller),
    __metadata("design:type", Array)
], SellerEntity.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SellerCustomerBookEntity, sell_cust_book => sell_cust_book.seller),
    __metadata("design:type", Array)
], SellerEntity.prototype, "sell_cust_book", void 0);
exports.SellerEntity = SellerEntity = __decorate([
    (0, typeorm_1.Entity)("seller")
], SellerEntity);
let AddressEntity = class AddressEntity {
};
exports.AddressEntity = AddressEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AddressEntity.prototype, "Address_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AddressEntity.prototype, "Street", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AddressEntity.prototype, "Building", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AddressEntity.prototype, "City", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AddressEntity.prototype, "Country", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AddressEntity.prototype, "ZIP", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => SellerEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", SellerEntity)
], AddressEntity.prototype, "seller", void 0);
exports.AddressEntity = AddressEntity = __decorate([
    (0, typeorm_1.Entity)("address")
], AddressEntity);
let BookEntity = class BookEntity {
};
exports.BookEntity = BookEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BookEntity.prototype, "Book_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BookEntity.prototype, "Title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BookEntity.prototype, "Author", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BookEntity.prototype, "ISBN", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BookEntity.prototype, "Condition", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BookEntity.prototype, "Price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BookEntity.prototype, "Book_Image", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SellerEntity),
    __metadata("design:type", SellerEntity)
], BookEntity.prototype, "seller", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SellerCustomerBookEntity, sell_cust_book => sell_cust_book.seller),
    __metadata("design:type", Array)
], BookEntity.prototype, "sell_cust_book", void 0);
exports.BookEntity = BookEntity = __decorate([
    (0, typeorm_1.Entity)("book")
], BookEntity);
let FeedbackEntity = class FeedbackEntity {
};
exports.FeedbackEntity = FeedbackEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FeedbackEntity.prototype, "Feedback_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FeedbackEntity.prototype, "Comment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FeedbackEntity.prototype, "Date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FeedbackEntity.prototype, "Sender_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FeedbackEntity.prototype, "Receiver_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FeedbackEntity.prototype, "Receiver_Type", void 0);
exports.FeedbackEntity = FeedbackEntity = __decorate([
    (0, typeorm_1.Entity)("feedback")
], FeedbackEntity);
let PinCodeEntity = class PinCodeEntity {
};
exports.PinCodeEntity = PinCodeEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PinCodeEntity.prototype, "Pin_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PinCodeEntity.prototype, "Pin_Code", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => SellerEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", SellerEntity)
], PinCodeEntity.prototype, "seller", void 0);
exports.PinCodeEntity = PinCodeEntity = __decorate([
    (0, typeorm_1.Entity)("pincode")
], PinCodeEntity);
let OrderEntity = class OrderEntity {
};
exports.OrderEntity = OrderEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderEntity.prototype, "Order_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderEntity.prototype, "Order_Date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderEntity.prototype, "Order_Status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderEntity.prototype, "Book_Name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderEntity.prototype, "Book_Price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SellerEntity),
    __metadata("design:type", SellerEntity)
], OrderEntity.prototype, "seller", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SellerCustomerBookEntity, sell_cust_book => sell_cust_book.seller),
    __metadata("design:type", Array)
], OrderEntity.prototype, "sell_cust_book", void 0);
exports.OrderEntity = OrderEntity = __decorate([
    (0, typeorm_1.Entity)("order")
], OrderEntity);
let SellerCustomerBookEntity = class SellerCustomerBookEntity {
};
exports.SellerCustomerBookEntity = SellerCustomerBookEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SellerCustomerBookEntity.prototype, "scb_ID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SellerEntity),
    __metadata("design:type", SellerEntity)
], SellerCustomerBookEntity.prototype, "seller", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BookEntity),
    __metadata("design:type", BookEntity)
], SellerCustomerBookEntity.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => OrderEntity),
    __metadata("design:type", OrderEntity)
], SellerCustomerBookEntity.prototype, "order", void 0);
exports.SellerCustomerBookEntity = SellerCustomerBookEntity = __decorate([
    (0, typeorm_1.Entity)("sell_cust_book")
], SellerCustomerBookEntity);
//# sourceMappingURL=seller.entity.js.map