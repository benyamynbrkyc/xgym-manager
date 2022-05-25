import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(`${req.nextUrl.origin}/members`);
  }
}
