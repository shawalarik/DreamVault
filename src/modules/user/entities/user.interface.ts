export interface UserPayload {
  userId: number;
  username: string;
  [propsName: string]: any;
  // 可以根据需要添加更多字段
  // roles?: string[];
  // email?: string;
}
