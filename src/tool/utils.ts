import { APP_API_DOCS, APP_PORT, APP_URI } from './env';

import { getLocalIPUrl } from './LocalIP';
import { GlobalLogService } from './../modules/log/GlobalLogService/global-log.service';

/**
 * 展示文档地址
 */
export function createServerLog() {
    const logService = GlobalLogService.getInstance();
    logService.success(`> Local: http://localhost:${APP_PORT}/`);
    logService.success(`> Network: http://${getLocalIPUrl()}:${APP_PORT}/${APP_API_DOCS}`);
}
