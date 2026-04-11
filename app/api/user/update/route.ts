import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { isUsernameTaken, saveUser } from '@/lib/local-db';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { username, name } = await req.json();

    if (!username || !name) {
      return NextResponse.json({ error: 'Name and Username are required' }, { status: 400 });
    }

    // Check username uniqueness
    if (isUsernameTaken(username, session.user.email)) {
      return NextResponse.json({ error: 'Username is already taken' }, { status: 400 });
    }

    // Save to our local JSON DB
    saveUser(session.user.email, {
      email: session.user.email,
      name,
      username,
    });

    return NextResponse.json({ success: true, message: 'Profile updated' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
