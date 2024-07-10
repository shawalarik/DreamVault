import { Injectable } from '@nestjs/common';
import { LogService } from './../../log/log.service';

@Injectable()
export class GlobalLogService {
  private static instance: LogService;

  static setInstance(logService: LogService) {
    GlobalLogService.instance = logService;
  }

  static getInstance(): LogService {
    if (!GlobalLogService.instance) {
      throw new Error('GlobalLogService instance has not been set.');
    }
    return GlobalLogService.instance;
  }
}
