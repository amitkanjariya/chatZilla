"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams ? searchParams.get('token') : null;
      
      try {
        const response = await fetch(`/api/verify-email?token=${token}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Verification failed');
        }

        setStatus('success');
        setMessage('Email verified successfully! You can now log in.');
      } catch (error: any) {
        setStatus('error');
        setMessage(error.message || 'Failed to verify email. Please try again.');
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        {status === 'loading' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Verifying your email...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
            <h1 className="mt-4 text-2xl font-bold text-gray-900">Verification Successful!</h1>
            <p className="mt-2 text-gray-600">{message}</p>
            <Link
              href="/login"
              className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to Login
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <XCircleIcon className="h-16 w-16 text-red-500 mx-auto" />
            <h1 className="mt-4 text-2xl font-bold text-gray-900">Verification Failed</h1>
            <p className="mt-2 text-gray-600">{message}</p>
            <div className="mt-6 space-y-3">
              <Link
                href="/register"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Registering Again
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                Need help? Contact support@chatzilla.com
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}