import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const apiUrl = process.env.API_URL || 'http://localhost:4000';

function authHeaders() {
  const token = cookies().get('adminToken');
  if (!token) {
    throw new Error('Unauthorized');
  }
  return { Authorization: `Bearer ${token.value}` };
}

export async function PATCH(_: Request, { params }: { params: { id: string } }) {
  try {
    const headers = authHeaders();
    const response = await fetch(`${apiUrl}/messages/${params.id}/read`, {
      method: 'PATCH',
      headers
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
