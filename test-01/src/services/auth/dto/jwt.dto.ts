export interface JwtPair {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPairCreateData {
  userId: string;
  userAgent: string;
  ip: string;
}
