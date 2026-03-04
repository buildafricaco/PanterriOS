import { NextResponse } from 'next/server';
import { clearRefreshCookie } from '../../_utils';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  clearRefreshCookie(response);
  return response;
}
