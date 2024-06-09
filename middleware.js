import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {

  let cookie = request.cookies.get('citizen');

  if(cookie == '' || cookie == null || cookie == undefined && request.nextUrl.pathname.startsWith('/citizen')) {
    return NextResponse.redirect(new URL(`${process.env.SSO_URL}`, request.url));
  } else {
    const citizen = JSON.parse(cookie.value);
    const username = citizen?.username;
    if((username == null || username == undefined || username == '') && request.nextUrl.pathname.startsWith('/citizen')) {
      return NextResponse.redirect(new URL(`${process.env.SSO_URL}/login`, request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/citizen/:path*'],
}