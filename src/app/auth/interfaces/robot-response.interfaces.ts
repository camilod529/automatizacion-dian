interface SuccessResponse {
  success: true;
  stats: Stats;
  uuid: string;
}

interface ErrorResponse {
  success: false;
  stats: Stats;
  errorMessage: string;
}

interface Stats {
  pass: number;
  fail: number;
  skip: number;
}

export type SendTokenUrlToRobotResponse = SuccessResponse | ErrorResponse;
