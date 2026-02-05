import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    // console.log('Middleware check:', {
    //     path: req.nextUrl.pathname,
    //     hasToken: !!token,
    //     tokenPreview: token ? token.substring(0, 20) + '...' : 'none'
    // });

    if(req.nextUrl.pathname.startsWith('/dashboard')) {
        if(!token) {
            //console.log('No token, redirecting to signin');
        return NextResponse.redirect(new URL('/signin', req.url));
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(token, secret);

            //console.log('Token verified, allowing access');
            return NextResponse.next();
        } catch(error) {
            //console.error('Token verification failed:', error);
            return NextResponse.redirect(new URL('/signin', req.url));
        }
    }
}

export const config =  {
    matcher: ['/dashboard/:path*', '/signin']
}