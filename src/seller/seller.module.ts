import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity, BookEntity, FeedbackEntity, OrderEntity, PinCodeEntity, SellerCustomerBookEntity, SellerEntity } from './seller.entity';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
    imports: [TypeOrmModule.forFeature([SellerEntity,BookEntity,FeedbackEntity,AddressEntity,
        PinCodeEntity, OrderEntity, SellerCustomerBookEntity]),
    MailerModule.forRoot({
        transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
        user: 'nuzhat.tanzina@gmail.com',
        pass: 'abc123@xyz'
        },
        }})
        ],
    controllers: [SellerController],
    providers: [SellerService],
})
export class SellerModule {}