import { AxiosError } from 'axios';
import { toast } from 'sonner';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const resolveErrorMessage = (
  responseData: unknown,
  fallbackMessage: string,
): string | string[] => {
  if (!isRecord(responseData)) return fallbackMessage;

  const nestedData = isRecord(responseData.data) ? responseData.data : null;
  const candidates: unknown[] = [
    responseData.message,
    responseData.error,
    responseData.detail,
    nestedData?.message,
    nestedData?.error,
    nestedData?.detail,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) return candidate;
    if (
      Array.isArray(candidate) &&
      candidate.length > 0 &&
      candidate.every((item) => typeof item === 'string')
    ) {
      return candidate as string[];
    }
  }

  return fallbackMessage;
};

export const handleAxiosError = async (error: AxiosError): Promise<void> => {
  const { response, code, message: errorMessage } = error;

  if (!response) {
    // console.error('Network error or no response received', error.code);
    if (code === 'ECONNABORTED') {
      toast.error('Request timed out. Please try again.');
    } else if (
      code === 'ERR_NETWORK' ||
      errorMessage?.includes('Network Error')
    ) {
      toast.error('Failed to establish network connection.');
    } else if (code === 'ECONNREFUSED') {
      toast.error('Unable to reach server. Please try again later.');
    } else if (code === 'ERR_INTERNET_DISCONNECTED') {
      toast.error('Internet connection lost. Please reconnect and try again.');
    }
    return;
  }

  const status = response.status;
  const fallbackMessage = error.message || 'An error occurred';
  const message = resolveErrorMessage(response.data, fallbackMessage);
  const authFallbackMessage =
    status === 401 ? 'Unauthorized access' : 'Session expired';
  const authMessage =
    typeof message === 'string' ? message : authFallbackMessage;

  // 🔐 Auth/session errors
  if ([401, 403].includes(status)) {
    toast.error(authMessage || authFallbackMessage);
    return;
  }

  // Validation or other errors
  if (Array.isArray(message)) {
    message
      .filter((msg): msg is string => typeof msg === 'string')
      .forEach((msg) => toast.error(msg));
  } else {
    toast.error(typeof message === 'string' ? message : fallbackMessage);
  }
};

// Optional alias
export const onError = (error: AxiosError) => handleAxiosError(error);
