import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt_decode from 'jwt-decode';

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
    const token = request.cookies.get('token');

    if (token) {
        const profile: { [key: string]: string | number } = jwt_decode(token);
        if (!profile.has_project) {
            if (!request.nextUrl.pathname.startsWith('/wizard')) {
                return NextResponse.redirect(new URL('/wizard', request.url));
            }
        } else if (
            request.nextUrl.pathname.startsWith('/login') ||
            request.nextUrl.pathname.startsWith('/register')
        ) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        } else if (request.nextUrl.pathname.startsWith('/wizard')) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    } else if (
        !(
            request.nextUrl.pathname.startsWith('/login') ||
            request.nextUrl.pathname.startsWith('/register')
        )
    ) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/login', '/setting', '/register', '/wizard'], //"/dashboard/:path*"
};
