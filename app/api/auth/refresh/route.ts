import { NextRequest, NextResponse } from 'next/server';
import {
  clearRefreshCookie,
  getAccessTokenFromPayload,
  getBackendUrl,
  getRefreshTokenFromPayload,
  parseBackendPayload,
  setRefreshCookie,
} from '../../_utils';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: 'Missing refresh cookie' },
        { status: 401 },
      );
    }

    const backendRes = await fetch(getBackendUrl('/auth/refresh-token'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
      cache: 'no-store',
    });

    const data = await parseBackendPayload(backendRes, 'Refresh failed');

    if (!backendRes.ok) {
      const failedResponse = NextResponse.json(data, {
        status: backendRes.status,
      });

      if (backendRes.status === 401 || backendRes.status === 403) {
        clearRefreshCookie(failedResponse);
      }

      return failedResponse;
    }

    const accessToken = getAccessTokenFromPayload(data);
    const rotatedRefreshToken = getRefreshTokenFromPayload(data);

    if (typeof accessToken !== 'string' || !accessToken) {
      return NextResponse.json(
        { message: 'Invalid refresh response: missing access token' },
        { status: 502 },
      );
    }

    const response = NextResponse.json(
      { accessToken },
      { status: backendRes.status },
    );

    if (typeof rotatedRefreshToken === 'string' && rotatedRefreshToken) {
      setRefreshCookie(response, rotatedRefreshToken);
    }

    return response;
  } catch {
    return NextResponse.json({ message: 'Refresh failed' }, { status: 500 });
  }
}
