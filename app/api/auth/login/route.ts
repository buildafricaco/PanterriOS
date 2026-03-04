import { NextRequest, NextResponse } from 'next/server';
import {
  flattenDataPayload,
  getBackendUrl,
  getRefreshTokenFromPayload,
  parseBackendPayload,
  sanitizeAuthPayload,
  setRefreshCookie,
} from '../../_utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const backendUrl = getBackendUrl('/auth/login');

    const backendRes = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });
    console.log(backendRes);

    const data = await parseBackendPayload(backendRes, 'Login failed');

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
    return NextResponse.json({ message: 'Login failed' }, { status: 500 });
  }
}
