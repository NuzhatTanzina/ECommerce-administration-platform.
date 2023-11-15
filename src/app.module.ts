
import { SellerService } from './Seller/seller.service';
import { SellerController } from './Seller/seller.controller';
import { SellerModule } from './Seller/seller.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SellerModule,  ConfigModule.forRoot(), TypeOrmModule.forRoot(

    { 
    
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '20438692',
      database: 'seller',//Change to your database name
      autoLoadEntities: true,
      synchronize: true,

    } 
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }