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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerService = void 0;
const common_1 = require("@nestjs/common");
const seller_dto_1 = require("./seller.dto");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const seller_entity_1 = require("./seller.entity");
const class_transformer_1 = require("class-transformer");
const bcrypt = require("bcrypt");
const mailer_1 = require("@nestjs-modules/mailer");
let SellerService = class SellerService {
    constructor(sellerRepository, feedbackRepository, bookRepository, addressRepository, pincodeRepository, orderRepository, selcusbokRepository, mailerService) {
        this.sellerRepository = sellerRepository;
        this.feedbackRepository = feedbackRepository;
        this.bookRepository = bookRepository;
        this.addressRepository = addressRepository;
        this.pincodeRepository = pincodeRepository;
        this.orderRepository = orderRepository;
        this.selcusbokRepository = selcusbokRepository;
        this.mailerService = mailerService;
    }
    async AddBooks(Email, book_info) {
        const seller_info = await this.sellerRepository.findOneBy({ Email: Email });
        const bookEntity = this.bookRepository.create(book_info);
        bookEntity.seller = seller_info;
        console.log(seller_info.Seller_ID);
        console.log("Email = " + Email);
        return this.bookRepository.save(bookEntity);
    }
    async ViewAllBooks(email) {
        const data = await this.sellerRepository.find({
            where: { Email: email },
            relations: {
                books: true
            }
        });
        console.log(data);
        return data;
    }
    async ViewSingleBook(id) {
        return this.bookRepository.findOneBy({ Book_ID: id });
    }
    async UpdateBookInfo(b_id, updated_data) {
        await this.bookRepository.update(b_id, updated_data);
        return this.bookRepository.findOneBy({ Book_ID: b_id });
    }
    DeleteBookInfo(id) {
        this.bookRepository.delete(id);
        return { "Success": "Book Deleted Successfully" };
    }
    UploadBookImage(filename) {
        if (this.current_book_info != null && filename != null) {
            this.current_book_info.Book_Image = filename;
            return this.current_book_info;
        }
        else {
            return null;
        }
    }
    async getBookImages(id, res) {
        const currentBook = await this.bookRepository.findOneBy({ Book_ID: id });
        const currentBookDTO = (0, class_transformer_1.plainToClass)(seller_dto_1.BookDTO, currentBook);
        if (currentBook) {
            const currentBookDTO = (0, class_transformer_1.plainToClass)(seller_dto_1.BookDTO, currentBook);
            console.log(currentBookDTO);
            return res.sendFile(currentBookDTO.Book_Image, {
                root: './assets/book_images',
            });
        }
        else {
            return null;
        }
    }
    async getBookData(sellerEmail, searchType, searchItem) {
        const seller = await this.sellerRepository.findOne({ where: { Email: sellerEmail } });
        if (!seller) {
            throw new common_1.NotFoundException('Seller not found');
        }
        const queryBuilder = this.bookRepository.createQueryBuilder('book')
            .where('book.seller.Seller_ID = :sellerId', { sellerId: seller.Seller_ID });
        if (searchType === 'Title') {
            queryBuilder.andWhere('book.Title LIKE :searchItem', {
                searchItem: `%${searchItem}%`,
            });
        }
        else if (searchType === 'Author') {
            queryBuilder.andWhere('book.Author LIKE :searchItem', {
                searchItem: `%${searchItem}%`,
            });
        }
        else if (searchType === 'ISBN') {
            queryBuilder.andWhere('book.ISBN LIKE :searchItem', {
                searchItem: `%${searchItem}%`,
            });
        }
        else if (searchType === 'Condition') {
            queryBuilder.andWhere('book.Condition LIKE :searchItem', {
                searchItem: `%${searchItem}%`,
            });
        }
        else if (searchType === 'Price') {
            queryBuilder.andWhere('book.Price = :searchItem', {
                searchItem,
            });
        }
        return queryBuilder.getMany();
    }
    async SendFeedback(email, feedback_info) {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
        };
        const seller = await this.sellerRepository.findOneBy({ Email: email });
        const dateString = now.toLocaleString(undefined, options);
        feedback_info.Date = dateString;
        feedback_info.Receiver_Type = "Admin";
        feedback_info.Sender_ID = seller.Seller_ID;
        return this.feedbackRepository.save(feedback_info);
    }
    async ViewCustomerFeedback(Email) {
        return this.feedbackRepository.find({
            where: { Receiver_Type: 'Seller' }
        });
    }
    async Signup(seller_info) {
        seller_info.Profile_Picture = "temp.svg";
        const salt = await bcrypt.genSalt();
        seller_info.Password = await bcrypt.hash(seller_info.Password, salt);
        return this.sellerRepository.save(seller_info);
    }
    async DeleteAccount(email) {
        const saved_seller = await this.sellerRepository.findOneBy({ Email: email });
        await this.sellerRepository.delete(saved_seller.Seller_ID);
    }
    async ViewSellerProfile(email) {
        return this.sellerRepository.findOneBy({ Email: email });
    }
    async UpdateProfileInfo(email, updated_data) {
        const saved_seller = await this.sellerRepository.findOneBy({ Email: email });
        const salt = await bcrypt.genSalt();
        updated_data.Email = saved_seller.Email;
        updated_data.Password = saved_seller.Password;
        updated_data.Profile_Picture = saved_seller.Profile_Picture;
        await this.sellerRepository.update(saved_seller.Seller_ID, updated_data);
        return this.sellerRepository.findOneBy({ Seller_ID: saved_seller.Seller_ID });
    }
    async Login(seller_info) {
        const saved_seller = await this.sellerRepository.findOneBy({ Email: seller_info.Email });
        console.log(saved_seller);
        if (saved_seller != null) {
            const match = await bcrypt.compare(seller_info.Password, saved_seller.Password);
            if (match) {
                return saved_seller;
            }
            else {
                return null;
            }
        }
        return null;
    }
    async UploadSellerImage(email, image) {
        const current_seller = this.sellerRepository.findOneBy({ Email: email });
        if (current_seller) {
            (await current_seller).Profile_Picture = image;
            await this.sellerRepository.update((await current_seller).Seller_ID, (await current_seller));
            return this.sellerRepository.findOneBy({ Seller_ID: (await current_seller).Seller_ID });
        }
    }
    async getSellerImages(email, res) {
        const current_seller = this.sellerRepository.findOneBy({ Email: email });
        if (current_seller) {
            res.sendFile((await current_seller).Profile_Picture, { root: './assets/profile_images' });
        }
    }
    async ForgetPassword(Seller_Email) {
        const generatePin = () => (Math.floor(Math.random() * 900000) + 100000).toString();
        const current_seller = await this.sellerRepository.findOneBy({ Email: Seller_Email });
        console.log("Current Seller = " + current_seller);
        let user_has_pin = await this.pincodeRepository.findOneBy({ seller: await current_seller });
        console.log("Seller Has a pin = " + current_seller);
        if (user_has_pin) {
            console.log("Updating");
            user_has_pin.Pin_Code = generatePin();
            await this.pincodeRepository.update(user_has_pin.Pin_ID, user_has_pin);
            console.log("Update Done");
            console.log("User Has a pin = " + user_has_pin.Pin_Code);
        }
        else {
            console.log("Creating");
            user_has_pin = {
                Pin_ID: undefined,
                Pin_Code: generatePin(),
                seller: current_seller,
            };
            console.log("Created");
            console.log("User Has a pin = " + user_has_pin.Pin_Code);
            await this.pincodeRepository.save(user_has_pin);
            console.log("Inserted into the database");
        }
        const emailSubject = 'Password Reset Verification Code';
        const emailBody = `
Dear Seller,
You have requested to reset your password for your account. To proceed with the password reset, please use the verification code provided below:

Verification Code: ${user_has_pin.Pin_Code}

Please enter this code on the password reset page to verify your identity. This code will expire after a certain duration for security purposes.

If you did not request a password reset or if you have any concerns regarding your account security, please contact our support team immediately.

Best regards,
Interstellar Library Team
`;
        return await this.mailerService.sendMail({
            to: Seller_Email,
            subject: emailSubject,
            text: emailBody,
        });
    }
    async SendPin(pin_code) {
        const pin_availability = await this.pincodeRepository.findOneBy({ Pin_Code: pin_code });
        if (pin_availability != null) {
            const generatePin = () => (Math.floor(Math.random() * 900000) + 100000).toString();
            const new_pin_code = generatePin();
            const result = await this.pincodeRepository.update({ Pin_Code: pin_code }, { Pin_Code: new_pin_code });
            return { "Success": "Pin is Available" };
        }
        else {
            return null;
        }
    }
    async AddAddress(Seller_Email, address_info) {
        const seller_info = await this.sellerRepository.findOneBy({ Email: Seller_Email });
        if (seller_info != null) {
            const addressEntity = this.addressRepository.create(address_info);
            addressEntity.seller = seller_info;
            return this.addressRepository.save(addressEntity);
        }
        else {
            return null;
        }
    }
    async ViewSellerAddress(Seller_Email) {
        return this.addressRepository.find({
            where: { seller: { Email: Seller_Email } },
            relations: {
                seller: true,
            }
        });
    }
    async UpdateAddress(Seller_Email, updated_data) {
        console.log("Current seller mail = " + Seller_Email);
        const seller_info = await this.sellerRepository.findOneBy({ Email: Seller_Email });
        console.log("Seller ID = " + (await seller_info).Seller_ID);
        const old_address = await this.addressRepository.findOne({
            where: { seller: await seller_info },
        });
        if (old_address != undefined && old_address != null) {
            console.log("Address ID = " + old_address.Address_ID);
            updated_data.Address_ID = old_address.Address_ID;
            await this.addressRepository.update(old_address.Address_ID, updated_data);
        }
        else {
            const addressEntity = this.addressRepository.create(updated_data);
            addressEntity.seller = seller_info;
            await this.addressRepository.save(addressEntity);
        }
        const address = await this.addressRepository.findOneBy({ seller: (await seller_info) });
        if (address) {
            return address;
        }
        else {
            return null;
        }
    }
    async DeleteAddress(Seller_Email) {
        const seller_info = await this.sellerRepository.findOneBy({ Email: Seller_Email });
        const decision = await this.addressRepository.delete({ seller: (await seller_info) });
        if (decision) {
            return null;
        }
        else {
            return { "Error": "Address is not Available" };
        }
    }
    async ViewAllOrders(Seller_Email) {
        const seller = await this.sellerRepository.findOneBy({ Email: Seller_Email });
        console.log("Seller Information = " + seller);
        const sellerId = seller.Seller_ID;
        const orders = await this.orderRepository.find({
            where: {
                seller: { Seller_ID: sellerId },
                Order_Status: (0, typeorm_2.Not)((0, typeorm_2.In)(['Delivered', 'Cancelled'])),
            },
            relations: ['seller'],
        });
        if (orders != null) {
            return orders;
        }
        else {
            return null;
        }
    }
    async ViewSingleOrder(id) {
        const order = await this.orderRepository.findOneBy({ Order_ID: id });
        if (order != null) {
            return order;
        }
        else {
            return null;
        }
    }
    async UpdateOrderStatus(id, updated_data) {
        await this.orderRepository.update(id, updated_data);
        const updated_order = await this.orderRepository.findOneBy({ Order_ID: id });
        if (updated_order != null) {
            return updated_order;
        }
        else {
            return null;
        }
    }
    async Update_Order_Status(id, update_status) {
        const order = await this.orderRepository.findOneBy({ Order_ID: id });
        if (order != null) {
            if (update_status == "Delivered") {
                order.Order_Status = "Delivered";
            }
            else if (update_status == "Cancelled") {
                order.Order_Status = "Cancelled";
            }
            else {
                order.Order_Status = "Pending";
            }
            const decision = await this.orderRepository.update(id, order);
            if (decision.affected !== undefined && decision.affected > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    async ShowTotalCost(Seller_Email) {
        const seller = await this.sellerRepository.findOneBy({ Email: Seller_Email });
        const sellerId = seller.Seller_ID;
        const sellerCustomerBooks = await this.selcusbokRepository.find({
            where: { seller: { Seller_ID: sellerId } },
            relations: ["order"],
        });
        const orderIds = sellerCustomerBooks.map((scb) => scb.order.Order_ID);
        const final_orders = await this.orderRepository.findByIds(orderIds);
        const totalCost = final_orders.reduce((sum, order) => {
            const bookPrice = parseFloat(order.Book_Price);
            return sum + bookPrice;
        }, 0);
        if (final_orders != null) {
            return {
                totalCost: totalCost.toFixed(2),
            };
        }
        else {
            return null;
        }
    }
    async UpdatePassword(tempMail, update_data) {
        console.log("Temp Mail = " + tempMail);
        console.log("New Pass = " + update_data.Password);
        const seller = await this.sellerRepository.findOneBy({ Email: tempMail });
        console.log("Seller = " + seller);
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        seller.Password = await bcrypt.hash(update_data.Password, salt);
        console.log("Hashed Password = " + seller.Password);
        const final_data = await this.sellerRepository.update(seller.Seller_ID, seller);
        console.log("Final Data = " + final_data);
        if (final_data !== null) {
            return { Success: 'Password Updated Successfully' };
        }
        else {
            return null;
        }
    }
    async SendMail(mail_info) {
        return await this.mailerService.sendMail({
            to: mail_info.Email,
            subject: mail_info.Subject,
            text: mail_info.Message,
        });
    }
    async calculateMonthlyIncome(sellerEmail) {
        const seller_info = await this.sellerRepository.findOneBy({ Email: sellerEmail });
        console.log("Seller ID = " + seller_info.Seller_ID);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        console.log("Current Month = " + currentMonth);
        console.log("Current Year = " + currentYear);
        const orders = await this.orderRepository.find({
            where: {
                Order_Status: 'Delivered',
            },
            relations: ['seller'],
        });
        console.log("Orders = " + orders);
        let totalIncome = 0;
        orders.forEach(order => {
            const orderDateParts = order.Order_Date.split('/');
            const orderDay = parseInt(orderDateParts[0], 10);
            const orderMonth = parseInt(orderDateParts[1], 10);
            const orderYear = parseInt(orderDateParts[2], 10);
            console.log("Day = " + orderDay);
            console.log("Month = " + orderMonth);
            console.log("Year = " + orderYear);
            if (orderMonth === currentMonth &&
                orderYear === currentYear &&
                order.seller.Seller_ID === seller_info.Seller_ID) {
                console.log("Book Price = " + order.Book_Price);
                totalIncome += parseFloat(order.Book_Price);
            }
        });
        return totalIncome;
    }
    async GetTotalNumberOfPendingOrderCurrentMonth(sellerEmail) {
        const seller_info = await this.sellerRepository.findOneBy({ Email: sellerEmail });
        console.log("Seller ID = " + seller_info.Seller_ID);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        console.log("Current Month = " + currentMonth);
        console.log("Current Year = " + currentYear);
        const orders = await this.orderRepository.find({
            where: {
                Order_Status: 'Pending',
            },
            relations: ['seller'],
        });
        console.log("Orders = " + orders);
        let totalOrder = 0;
        orders.forEach(order => {
            const orderDateParts = order.Order_Date.split('/');
            const orderDay = parseInt(orderDateParts[0], 10);
            const orderMonth = parseInt(orderDateParts[1], 10);
            const orderYear = parseInt(orderDateParts[2], 10);
            console.log("Day = " + orderDay);
            console.log("Month = " + orderMonth);
            console.log("Year = " + orderYear);
            if (orderMonth === currentMonth &&
                orderYear === currentYear &&
                order.seller.Seller_ID === seller_info.Seller_ID) {
                totalOrder += 1;
            }
        });
        return totalOrder;
    }
    async getOrderCountsByMonth() {
        const orders = await this.orderRepository.find();
        const orderCountsByMonth = {};
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];
        for (let month = 1; month <= 12; month++) {
            const monthName = monthNames[month - 1];
            orderCountsByMonth[monthName] = 0;
        }
        orders.forEach(order => {
            const orderDateParts = order.Order_Date.split('/');
            const orderMonth = parseInt(orderDateParts[1], 10);
            const orderMonthName = monthNames[orderMonth - 1];
            orderCountsByMonth[orderMonthName] += 1;
        });
        return orderCountsByMonth;
    }
    async calculateMonthlyRevenues(sellerEmail) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const seller = await this.sellerRepository.findOneBy({ Email: sellerEmail });
        const orders = await this.orderRepository.find({
            where: {
                Order_Status: 'Delivered',
                seller: { Seller_ID: seller.Seller_ID },
            },
            relations: ['seller'],
        });
        const revenueByMonth = {};
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];
        for (let month = 1; month <= 12; month++) {
            const monthName = monthNames[month - 1];
            revenueByMonth[monthName] = 0;
        }
        orders.forEach(order => {
            const orderDateParts = order.Order_Date.split('/');
            const orderMonth = parseInt(orderDateParts[1], 10);
            const orderYear = parseInt(orderDateParts[2], 10);
            const orderMonthName = monthNames[orderMonth - 1];
            if (orderYear === currentYear) {
                revenueByMonth[orderMonthName] += parseFloat(order.Book_Price);
            }
        });
        return revenueByMonth;
    }
};
exports.SellerService = SellerService;
exports.SellerService = SellerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(seller_entity_1.SellerEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(seller_entity_1.FeedbackEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(seller_entity_1.BookEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(seller_entity_1.AddressEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(seller_entity_1.PinCodeEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(seller_entity_1.OrderEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(seller_entity_1.SellerCustomerBookEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mailer_1.MailerService])
], SellerService);
//# sourceMappingURL=seller.service.js.map