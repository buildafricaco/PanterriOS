import { NextResponse } from 'next/server';

const REFRESH_COOKIE_NAME = 'refreshToken';
const DEFAULT_REFRESH_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function getBackendUrl(path: string): string {
  const backendBaseUrl =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!backendBaseUrl) {
    throw new Error(
      'Missing API base URL. Set API_BASE_URL or NEXT_PUBLIC_API_BASE_URL.',
    );
  }

  const base = backendBaseUrl.endsWith('/')
    ? backendBaseUrl.slice(0, -1)
    : backendBaseUrl;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${base}${normalizedPath}`;
}

export function setRefreshCookie(res: NextResponse, refreshToken: string) {
  const maxAge =
    Number(process.env.REFRESH_COOKIE_MAX_AGE) ||
    DEFAULT_REFRESH_COOKIE_MAX_AGE;

  res.cookies.set({
    name: REFRESH_COOKIE_NAME,
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  });
}

export function clearRefreshCookie(res: NextResponse) {
  res.cookies.set({
    name: REFRESH_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export function sanitizeAuthPayload<T extends Record<string, unknown>>(
  payload: T,
): T {
  if (!payload) return payload;

  const result: Record<string, unknown> = { ...payload };

  if ('refreshToken' in result) {
    result.refreshToken = undefined;
  }

  if (
    'tokens' in result &&
    typeof result.tokens === 'object' &&
    result.tokens !== null &&
    'refreshToken' in (result.tokens as Record<string, unknown>)
  ) {
    result.tokens = {
      ...(result.tokens as Record<string, unknown>),
      refreshToken: undefined,
    };
  }

  if (
    result.data &&
    typeof result.data === 'object' &&
    result.data !== null
  ) {
    const dataObject = result.data as Record<string, unknown>;
    const normalizedData = { ...dataObject };

    if ('refreshToken' in normalizedData) {
      normalizedData.refreshToken = undefined;
    }

    if (
      'tokens' in normalizedData &&
      typeof normalizedData.tokens === 'object' &&
      normalizedData.tokens !== null &&
      'refreshToken' in (normalizedData.tokens as Record<string, unknown>)
    ) {
      normalizedData.tokens = {
        ...(normalizedData.tokens as Record<string, unknown>),
        refreshToken: undefined,
      };
    }

    result.data = normalizedData;
  }

  return result as T;
}

function extractMessageFromPayload(
  payload: Record<string, unknown>,
  fallbackMessage: string,
): string | string[] {
  const messageCandidates: unknown[] = [
    payload.message,
    payload.error,
    payload.detail,
    payload.title,
  ];

  const data =
    typeof payload.data === 'object' && payload.data !== null
      ? (payload.data as Record<string, unknown>)
      : null;

  if (data) {
    messageCandidates.push(data.message, data.error, data.detail);
  }

  for (const candidate of messageCandidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate;
    }

    if (
      Array.isArray(candidate) &&
      candidate.every((item) => typeof item === 'string')
    ) {
      return candidate as string[];
    }
  }

  return fallbackMessage;
}

export function flattenDataPayload<T extends Record<string, unknown>>(
  payload: T,
): T {
  const data =
    typeof payload.data === 'object' && payload.data !== null
      ? (payload.data as Record<string, unknown>)
      : null;

  if (!data) return payload;

  return {
    ...data,
    ...payload,
  };
}

export async function parseBackendPayload(
  response: Response,
  fallbackMessage: string,
): Promise<Record<string, unknown>> {
  const rawText = await response.text().catch(() => '');

  if (!rawText) {
    return { message: fallbackMessage };
  }

  try {
    const parsed = JSON.parse(rawText) as Record<string, unknown>;
    return {
      ...parsed,
      message: extractMessageFromPayload(parsed, fallbackMessage),
    };
  } catch {
    return { message: rawText || fallbackMessage };
  }
}

export function getAccessTokenFromPayload(
  payload: Record<string, unknown>,
): string | null {
  const direct = payload.accessToken;
  if (typeof direct === 'string' && direct) return direct;

  const topLevelTokens = payload.tokens;
  if (typeof topLevelTokens === 'object' && topLevelTokens !== null) {
    const token = (topLevelTokens as Record<string, unknown>).accessToken;
    if (typeof token === 'string' && token) return token;
  }

  const data = payload.data;
  if (typeof data !== 'object' || data === null) return null;

  const nestedDirect = (data as Record<string, unknown>).accessToken;
  if (typeof nestedDirect === 'string' && nestedDirect) return nestedDirect;

  const tokens = (data as Record<string, unknown>).tokens;
  if (typeof tokens === 'object' && tokens !== null) {
    const token = (tokens as Record<string, unknown>).accessToken;
    if (typeof token === 'string' && token) return token;
  }

  return null;
}

export function getRefreshTokenFromPayload(
  payload: Record<string, unknown>,
): string | null {
  const direct = payload.refreshToken;
  if (typeof direct === 'string' && direct) return direct;

  const tokens = payload.tokens;
  if (typeof tokens === 'object' && tokens !== null) {
    const token = (tokens as Record<string, unknown>).refreshToken;
    if (typeof token === 'string' && token) return token;
  }

  const data = payload.data;
  if (typeof data !== 'object' || data === null) return null;

  const nestedDirect = (data as Record<string, unknown>).refreshToken;
  if (typeof nestedDirect === 'string' && nestedDirect) return nestedDirect;

  const nestedTokens = (data as Record<string, unknown>).tokens;
  if (typeof nestedTokens === 'object' && nestedTokens !== null) {
    const nestedToken = (nestedTokens as Record<string, unknown>).refreshToken;
    if (typeof nestedToken === 'string' && nestedToken) return nestedToken;
  }

  return null;
}
