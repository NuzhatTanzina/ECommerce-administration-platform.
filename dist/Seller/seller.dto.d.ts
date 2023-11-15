export declare class BookDTO {
    Book_ID: number;
    Title: string;
    Author: string;
    ISBN: string;
    Condition: string;
    Price: string;
    Book_Image: string;
}
export declare class FeedbackDTO {
    Feedback_ID: number;
    Comment: string;
    Date: string;
    Sender_ID: number;
    Receiver_ID: number;
    Receiver_Type: string;
}
export declare class SellerDTO {
    Seller_ID: number;
    Name: string;
    Email: string;
    Password: string;
    Phone: string;
    Profile_Picture: string;
}
export declare class AddressDTO {
    Address_ID: number;
    Street: string;
    Building: string;
    City: string;
    Country: string;
    ZIP: string;
}
export declare class PinCodeDTO {
    Pin_ID: number;
    Pin_Code: string;
}
export declare class OrderDTO {
    Order_ID: number;
    Order_Date: string;
    Order_Status: string;
    Book_Name: string;
    Book_Price: string;
}
export declare class UpdatePasswordDTO {
    Email: string;
    Password: string;
}
export declare class MailDTO {
    Email: string;
    Subject: string;
    Message: string;
}
