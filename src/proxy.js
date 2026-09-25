import { NextResponse } from 'next/server';

export function proxy(request) {
  if (request.nextUrl.pathname.startsWith('/preview/shared-value')) {
    return process.env.NODE_ENV === 'development'
      ? NextResponse.next()
      : new NextResponse('Not Found', { status: 404 });
  }
  if (process.env.ENABLE_PRIVATE_PRESENTATIONS === 'true') {
    return NextResponse.next();
  }
  return new NextResponse('Not Found', { status: 404 });
}

export const config = {
  matcher: ['/brand-kit/:path*', '/pitch/ai-poc/:path*', '/preview/shared-value/:path*'],
};
