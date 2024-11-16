// src/middleware.js ou src/middleware.ts

import { clerkMiddleware } from '@clerk/nextjs/server';

// Exemplo de um matcher válido para API e Dashboard
export default clerkMiddleware({
  matcher: ['/api/:path*', '/dashboard/:path*'],
});
