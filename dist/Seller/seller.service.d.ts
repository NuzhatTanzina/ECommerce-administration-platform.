import { AddressDTO, BookDTO, FeedbackDTO, MailDTO, OrderDTO, SellerDTO, UpdatePasswordDTO } from './seller.dto';
import { Repository } from 'typeorm';
import { AddressEntity, BookEntity, FeedbackEntity, OrderEntity, PinCodeEntity, SellerCustomerBookEntity, SellerEntity } from './seller.entity';
import { MailerService } from '@nestjs-modules/mailer';
export declare class SellerService {
    private sellerRepository;
    private feedbackRepository;
    private bookRepository;
    private addressRepository;
    private pincodeRepository;
    private orderRepository;
    private selcusbokRepository;
    private mailerService;
    constructor(sellerRepository: Repository<SellerEntity>, feedbackRepository: Repository<FeedbackEntity>, bookRepository: Repository<BookEntity>, addressRepository: Repository<AddressEntity>, pincodeRepository: Repository<PinCodeEntity>, orderRepository: Repository<OrderEntity>, selcusbokRepository: Repository<SellerCustomerBookEntity>, mailerService: MailerService);
    current_book_info: BookDTO;
    current_feedback_info: FeedbackDTO;
    AddBooks(Email: string, book_info: BookDTO): Promise<BookEntity>;
    ViewAllBooks(email: any): Promise<SellerEntity[]>;
    ViewSingleBook(id: number): Promise<BookEntity>;
    UpdateBookInfo(b_id: number, updated_data: BookDTO): Promise<BookEntity>;
    DeleteBookInfo(id: number): any;
    UploadBookImage(filename: string): any;
    getBookImages(id: number, res: any): Promise<any>;
    getBookData(sellerEmail: string, searchType: string, searchItem: string): Promise<BookEntity[]>;
    SendFeedback(email: string, feedback_info: FeedbackEntity): Promise<FeedbackEntity>;
    ViewCustomerFeedback(Email: string): Promise<FeedbackEntity[]>;
    Signup(seller_info: SellerDTO): Promise<SellerEntity>;
    DeleteAccount(email: string): Promise<void>;
    ViewSellerProfile(email: string): Promise<SellerEntity>;
    UpdateProfileInfo(email: string, updated_data: SellerDTO): Promise<SellerEntity>;
    Login(seller_info: SellerDTO): Promise<SellerEntity>;
    UploadSellerImage(email: string, image: string): Promise<SellerEntity>;
    getSellerImages(email: string, res: any): Promise<any>;
    ForgetPassword(Seller_Email: string): Promise<SentMessageInfo>;
    SendPin(pin_code: string): Promise<{
        Success: string;
    }>;
    AddAddress(Seller_Email: string, address_info: AddressDTO): Promise<AddressEntity>;
    ViewSellerAddress(Seller_Email: string): Promise<AddressEntity[]>;
    UpdateAddress(Seller_Email: any, updated_data: AddressDTO): Promise<AddressDTO>;
    DeleteAddress(Seller_Email: any): Promise<any>;
    ViewAllOrders(Seller_Email: string): Promise<any>;
    ViewSingleOrder(id: number): Promise<OrderEntity>;
    UpdateOrderStatus(id: number, updated_data: OrderDTO): Promise<OrderEntity>;
    Update_Order_Status(id: number, update_status: string): Promise<boolean>;
    ShowTotalCost(Seller_Email: string): Promise<any>;
    UpdatePassword(tempMail: string, update_data: UpdatePasswordDTO): Promise<any>;
    SendMail(mail_info: MailDTO): Promise<any>;
    calculateMonthlyIncome(sellerEmail: string): Promise<number>;
    GetTotalNumberOfPendingOrderCurrentMonth(sellerEmail: string): Promise<number>;
    getOrderCountsByMonth(): Promise<any>;
    calculateMonthlyRevenues(sellerEmail: string): Promise<any>;
}