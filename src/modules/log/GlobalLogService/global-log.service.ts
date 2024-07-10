import { Injectable } from '@nestjs/common';
import { LogService } from './../../log/log.service';

@Injectable()
export class GlobalLogService {
  private static instance: LogService;

  /**
   * 设置日志实例
   * @param logService
   */
  static setInstance(logService: LogService) {
    GlobalLogService.instance = logService;
  }

  /**
   * 获取日志实例
   */
  static getInstance(): LogService {
    if (!GlobalLogService.instance) {
      throw new Error('GlobalLogService instance has not been set.');
    }
    return GlobalLogService.instance;
  }
}
