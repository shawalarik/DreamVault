import { Injectable } from '@nestjs/common';
import * as chalk from 'chalk';

@Injectable()
export class LogService {
  success(msg: string) {
    console.log(chalk.green(msg)); // 使用 chalk.green 进行日志输出
  }

  error(msg: string) {
    console.log(chalk.red(msg)); // 使用 chalk.red 进行日志输出
  }

  info(msg: string) {
    console.log(chalk.blue(msg)); // 使用 chalk.blue 进行日志输出
  }
}
