import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from "@nestjs/platform-express";
import { logger } from './middlewares/logger.middleware';
import { HttpExceptionFilter } from './middlewares/http-exception.filter';
import { ResponseInterceptor } from './middlewares/interceptor/response.interceptor';
import { createServerLog } from './tool/utils';
import { APP_PORT } from './tool/env';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    /**
     * 全局过滤器
     */
    app.use(logger);
    app.useGlobalFilters(new HttpExceptionFilter());

    /**
     * http状态拦截器
     */
    app.useGlobalInterceptors(new ResponseInterceptor());
    const config = new DocumentBuilder()
      .setTitle('Nest DreamVault API')
      .setDescription('The DreamVault API documentation')
      .setVersion('1.0')
      .addTag('DreamVault')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(APP_PORT);
    createServerLog();

}
bootstrap();
