import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RCode } from './../constant/rcode';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> {
    return next.handle().pipe(
      map(content => {
        return {
          data: {
            data: content.data || {},
          },
          meta: {
            message: content.msg || 'Operation Successful',
            success: content.code === RCode.OK,
            code: content.code !== undefined ? content.code : RCode.OK,
          },
        };
      })
    );
  }
}
