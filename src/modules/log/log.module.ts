import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { GlobalLogService } from './GlobalLogService/global-log.service';
@Module({
  providers: [LogService, GlobalLogService],
  exports: [LogService, GlobalLogService],
})
export class LogModule {}
