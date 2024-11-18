// src/auth/jwt-payload.interface.ts
export interface JwtPayload {
  username: string;
  sub: number; // The user ID
  role: string; // Add role to include user's role in the payload
}
