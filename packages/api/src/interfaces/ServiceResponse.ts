export interface ServiceResponse {
  status: 'fail' | 'success';
  statusCode: number;
  data?: any;
  error?: string;
}
