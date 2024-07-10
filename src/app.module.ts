import {Module, NestModule, MiddlewareConsumer, OnModuleInit} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AlbumModule } from './modules/album/album.module';
import { ImageModule } from './modules/image/image.module';
import { WhitelistModule } from './modules/whitelist/whitelist.module';
import { FeaturedImageModule } from './modules/featured-image/featured-image.module';
import { AntiHotlinkMiddleware } from './middlewares/anti-hotlink.middleware';
import { UploadMiddleware } from './middlewares/upload.middleware';
import { LogModule } from './modules/log/log.module';
import { LogService } from './modules/log/log.service';
import { GlobalLogService } from './modules/log/GlobalLogService/global-log.service';
import { AppConfigModule } from './config/config.module'; // 导入配置模块

@Module({
  imports: [
    AppConfigModule, // 导入配置模块
    ConfigModule.forRoot({ isGlobal: true }), // 确保 ConfigModule 全局可用
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        charset: configService.get<string>('DB_UTF8MB4'), // 设置chatset编码为utf8mb4
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    LogModule,
    AuthModule,
    UserModule,
    AlbumModule,
    ImageModule,
    WhitelistModule,
    FeaturedImageModule,
  ],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly logService: LogService) {}

  onModuleInit() {
    // 设置全局 LogService 实例
    GlobalLogService.setInstance(this.logService);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AntiHotlinkMiddleware).forRoutes('*');
    consumer.apply(UploadMiddleware).forRoutes('images/upload');
  }
}
