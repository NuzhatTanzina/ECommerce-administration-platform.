export declare class SellerEntity {
    Seller_ID: number;
    Name: string;
    Email: string;
    Password: string;
    Phone: string;
    Profile_Picture: string;
    books: BookEntity[];
    orders: OrderEntity[];
    sell_cust_book: SellerCustomerBookEntity[];
}
export declare class AddressEntity {
    Address_ID: number;
    Street: string;
    Building: string;
    City: string;
    Country: string;
    ZIP: string;
    seller: SellerEntity;
}
export declare class BookEntity {
    Book_ID: number;
    Title: string;
    Author: string;
    ISBN: string;
    Condition: string;
    Price: string;
    Book_Image: string;
    seller: SellerEntity;
    sell_cust_book: SellerCustomerBookEntity[];
}
export declare class FeedbackEntity {
    Feedback_ID: number;
    Comment: string;
    Date: string;
    Sender_ID: number;
    Receiver_ID: number;
    Receiver_Type: string;
}
export declare class PinCodeEntity {
    Pin_ID: number;
    Pin_Code: string;
    seller: SellerEntity;
}
export declare class OrderEntity {
    Order_ID: number;
    Order_Date: string;
    Order_Status: string;
    Book_Name: string;
    Book_Price: string;
    seller: SellerEntity;
    sell_cust_book: SellerCustomerBookEntity[];
}
export declare class SellerCustomerBookEntity {
    scb_ID: number;
    seller: SellerEntity;
    book: BookEntity;
    order: OrderEntity;
}
