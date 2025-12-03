import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new NextResponse('Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET', {
      status: 500,
    });
  }

  const url = req.nextUrl;
  const origin = url.origin;
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/upload', origin));
  }

  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ||
    `${origin}/api/auth/google/callback`;

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!tokenResponse.ok) {
    return NextResponse.redirect(
      new URL('/?error=google_oauth_token_error', origin),
    );
  }

  const tokenData = (await tokenResponse.json()) as {
    access_token?: string;
    id_token?: string;
  };

  if (!tokenData.access_token) {
    return NextResponse.redirect(
      new URL('/?error=google_oauth_missing_access_token', origin),
    );
  }

  const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  if (!userResponse.ok) {
    return NextResponse.redirect(
      new URL('/?error=google_oauth_userinfo_error', origin),
    );
  }

  const user = (await userResponse.json()) as {
    id?: string;
    name?: string;
    email?: string;
    picture?: string;
  };

  const res = NextResponse.redirect(new URL('/upload', origin));

  // Minimal demo: store basic user info in a non-httpOnly cookie
  // so the client can read it if needed.
  res.cookies.set(
    'google_user',
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture,
    }),
    {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
    },
  );

  return res;
}


