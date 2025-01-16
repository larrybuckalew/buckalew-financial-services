"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function MFASetup() {
  const [step, setStep] = useState(1);
  const [qrCode, setQrCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setupMFA = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/mfa/setup', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.qrCode) {
        setQrCode(data.qrCode);
        setStep(2);
      }
    } catch (err) {
      setError('Failed to setup MFA');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyMFA = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/mfa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verificationCode }),
      });
      const data = await response.json();
      if (data.success) {
        setStep(3);
      } else {
        setError('Invalid verification code');
      }
    } catch (err) {
      setError('Failed to verify MFA');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Two-Factor Authentication Setup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <p>
              Enhance your account security by enabling two-factor authentication.
              This adds an extra layer of protection to your account.
            </p>
            <Button
              onClick={setupMFA}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Setting up...' : 'Begin Setup'}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p>Scan this QR code with your authenticator app:</p>
            <div className="flex justify-center">
              <img src={qrCode} alt="MFA QR Code" className="w-48 h-48" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter verification code
              </label>
              <Input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="w-full"
              />
            </div>
            <Button
              onClick={verifyMFA}
              disabled={isLoading || verificationCode.length !== 6}
              className="w-full"
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-4">
            <div className="text-green-500 text-xl">
              ✓ Two-factor authentication enabled
            </div>
            <p>
              Your account is now more secure. You'll need to enter a verification
              code each time you sign in.
            </p>
            <Button href="/dashboard" className="w-full">
              Return to Dashboard
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}