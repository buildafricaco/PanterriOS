import { NextRequest, NextResponse } from 'next/server';
import {
  flattenDataPayload,
  getBackendUrl,
  parseBackendPayload,
  sanitizeAuthPayload,
} from '../../_utils';

export async function POST(req: NextRequest) {
  try {
    const authorization = req.headers.get('authorization');
    const tempTokenFromHeader = req.headers.get('x-temporary-token');
    const requestBody = await req.json().catch(() => null);
    const tempTokenFromBody =
      requestBody &&
      typeof requestBody === 'object' &&
      'temporaryToken' in (requestBody as Record<string, unknown>) &&
      typeof (requestBody as Record<string, unknown>).temporaryToken ===
        'string'
        ? ((requestBody as Record<string, unknown>).temporaryToken as string)
        : null;
    const temporaryToken = tempTokenFromHeader || tempTokenFromBody;
    const backendUrl = getBackendUrl('/two-factor-authentication/generate-secret');

    const backendRes = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authorization ? { Authorization: authorization } : {}),
        ...(temporaryToken ? { 'x-temporary-token': temporaryToken } : {}),
      },
      body: temporaryToken ? JSON.stringify({ temporaryToken }) : undefined,
      cache: 'no-store',
    });

    const data = await parseBackendPayload(
      backendRes,
      'Failed to generate 2FA secret',
    );

    if (!backendRes.ok) {
      return NextResponse.json(data, { status: backendRes.status });
    }

    const normalized = flattenDataPayload(sanitizeAuthPayload(data));
    return NextResponse.json(normalized, { status: backendRes.status });
  } catch {
    return NextResponse.json(
      { message: 'Failed to generate 2FA secret' },
      { status: 500 },
    );
  }
}
