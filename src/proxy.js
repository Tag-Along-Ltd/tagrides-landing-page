import { NextResponse } from 'next/server';

export function proxy() {
  if (process.env.ENABLE_PRIVATE_PRESENTATIONS === 'true') {
    return NextResponse.next();
  }
  return new NextResponse('Not Found', { status: 404 });
}

export const config = {
  matcher: ['/brand-kit/:path*', '/pitch/ai-poc/:path*'],
};
