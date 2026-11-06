export interface PushMessage {
  title: string;
  body: string;
  data?: Record<string, string>;
}

export interface PushResult {
  successTokens: string[];
  invalidTokens: string[];
}