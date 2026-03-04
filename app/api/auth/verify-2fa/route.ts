import { NextRequest, NextResponse } from 'next/server';
import {
  flattenDataPayload,
  getBackendUrl,
  parseBackendPayload,
  getRefreshTokenFromPayload,
  sanitizeAuthPayload,
  setRefreshCookie,
} from '../../_utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const backendUrl = getBackendUrl('/two-factor-authentication/login-2fa');

    const backendRes = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const data = await parseBackendPayload(backendRes, '2FA login failed');

    if (!backendRes.ok) {
      return NextResponse.json(data, { status: backendRes.status });
    }

    const normalized = flattenDataPayload(sanitizeAuthPayload(data));
    const response = NextResponse.json(normalized, {
      status: backendRes.status,
    });

    const refreshToken = getRefreshTokenFromPayload(data);

    if (typeof refreshToken === 'string' && refreshToken) {
      setRefreshCookie(response, refreshToken);
    }

    return response;
  } catch {
    return NextResponse.json({ message: '2FA login failed' }, { status: 500 });
  }
}
