import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface LoginBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBody;
  const apiUrl = process.env.API_URL || 'http://localhost:4000';

  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const data = await response.json();
  const cookieStore = cookies();
  cookieStore.set('adminToken', data.accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  });
  cookieStore.set('adminRefresh', data.refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  });

  return NextResponse.json({ message: 'Logged in' });
}
