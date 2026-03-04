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
    const authorization = req.headers.get('authorization');
    const tempTokenFromHeader = req.headers.get('x-temporary-token');
    const tempTokenFromBody =
      typeof body?.temporaryToken === 'string' ? body.temporaryToken : null;
    const temporaryToken = tempTokenFromHeader || tempTokenFromBody;
    const backendUrl = getBackendUrl('/two-factor-authentication/enable');

    const backendRes = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authorization ? { Authorization: authorization } : {}),
        ...(temporaryToken ? { 'x-temporary-token': temporaryToken } : {}),
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const data = await parseBackendPayload(backendRes, 'Failed to enable 2FA');

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
    return NextResponse.json({ message: 'Failed to enable 2FA' }, { status: 500 });
  }
}
