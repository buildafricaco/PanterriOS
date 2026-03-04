'use client';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { Copy, Smartphone } from 'lucide-react';
import { useCopy } from '@/helper/useCopy';
import { Button } from '../ui/button';
import { useGenerateTwoFactorSecret } from '@/hook/auth/useGenerateTwoFactorSecret';
import { Spinner } from '../ui/spinner';
import { Verify2faEnable } from './verify2faEnable';

export default function SetUp2FaForm() {
  const [step, setStep] = useState(1);
  const { copyValue } = useCopy();
  const {
    mutateAsync: generateSecret,
    isPending: isLoading,
    isError,
    error,
    data: qrCodeData,
  } = useGenerateTwoFactorSecret();
  const resolvedQrCode = qrCodeData?.qrCode ?? qrCodeData?.data?.qrCode;
  const resolvedSecret = qrCodeData?.secret ?? qrCodeData?.data?.secret;

  useEffect(() => {
    const fetchSecret = async () => {
      try {
        await generateSecret();
      } catch {
        // Mutation error is already handled by React Query/interceptors.
      }
    };
    fetchSecret();
  }, [generateSecret]);

  return (
    <div className="">
      {step === 1 && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Badge className="bg-blue-500">{step}</Badge>
            <span className="font-bold text-lg">Scan QR Code </span>
          </div>

          <div className="flex gap-2">
            <div className="bg-gray-50 border-2 space-y-3 p-3 w-3/3 rounded-2xl">
              <p className="text-gray-500 text-sm">
                Open your authenticator app (Google Authenticator, Authy, or
                similar) and scan this QR code
              </p>
              {isLoading ? (
                <div className="w-52 h-52 mx-auto flex items-center justify-center bg-gray-100 rounded-lg animate-pulse">
                  <Spinner className=" w-14 h-14" />
                </div>
              ) : resolvedQrCode ? (
                <Image
                  src={resolvedQrCode}
                  alt="QR Code"
                  width={200}
                  height={200}
                  className="flex items-center justify-center w-52 h-52 mx-auto"
                />
              ) : (
                <div className="text-sm text-red-500 p-3 rounded-md bg-red-50 border border-red-200">
                  {isError
                    ? ((error as { message?: string } | null)?.message ??
                      'Unable to generate QR code.')
                    : 'Unable to generate QR code.'}
                </div>
              )}
              <div className="text-xs text-gray-500 mt-2 flex items-center gap-2 text-center">
                <Smartphone className="w-5 h-5" /> Compatible with Google
                Authenticator, Authy, 1Password
              </div>
            </div>
            <div className=" w-2/3 space-y-6 ">
              <div className="bg-gray-50 rounded-2xl p-3 space-y-2 border-2">
                <p className="font-bold">Can&apos;t scan the code?</p>
                <p className="max-w-sm text-sm text-gray-500">
                  Enter this code manually in your authenticator app:
                </p>
                {!isLoading && resolvedSecret && (
                  <div className="flex gap-2">
                    <div className="p-2 bg-white border rounded-md">
                      {resolvedSecret}
                    </div>
                    <button
                      className="text-sm  hover:underline bg-white p-2 rounded-md border"
                      onClick={() =>
                        copyValue(
                          resolvedSecret || '',
                          'Code copied to clipboard',
                        )
                      }
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {!isLoading && !resolvedSecret && (
                  <Button
                    variant="outline"
                    onClick={async () => {
                      try {
                        await generateSecret();
                      } catch {
                        // no-op
                      }
                    }}
                  >
                    Retry
                  </Button>
                )}
              </div>
              <div className="p-4 bg-blue-50 border border-blue-300 text-blue-500  flex gap-2 rounded-md  ">
                <div>
                  <Smartphone />
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold">Recommended Apps</h3>
                  <p className="lg:text-sm text-xs">
                    Google Authenticator, Microsoft Authenticator, Authy, or
                    1Password
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button
            className="w-full lg:w-1/2 mx-auto flex justify-center"
            disabled={!resolvedSecret || isLoading}
            onClick={() => setStep(2)}
          >
            Continue to Verification
          </Button>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Badge className="bg-blue-500">{step}</Badge>
            <span className="font-bold text-lg">
              Verify Authentication Code{' '}
            </span>
          </div>

          <Verify2faEnable />
        </div>
      )}
    </div>
  );
}
