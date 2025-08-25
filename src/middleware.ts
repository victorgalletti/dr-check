import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// A função de middleware principal
export function middleware(request: NextRequest) {

  // =======================================================================================
  // TODO: MODO DE DESENVOLVIMENTO ATIVADO. A AUTENTICAÇÃO ESTÁ DESABILITADA.
  // Descomente o código abaixo para reativar a proteção de rotas em produção.
  // =======================================================================================

  /*
  // Pega o token de autenticação dos cookies
  const authToken = request.cookies.get('auth_token')?.value;

  const { pathname } = request.nextUrl;

  // Rotas que são consideradas públicas e não exigem autenticação
  const publicPaths = ['/', '/login', '/register'];

  // Verifica se o caminho atual é uma rota pública
  const isPublicPath = publicPaths.includes(pathname);

  // Se o usuário não tem um token e está tentando acessar uma rota protegida
  if (!authToken && !isPublicPath) {
    // Redireciona para a página de login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se o usuário tem um token e está tentando acessar uma rota pública
  if (authToken && isPublicPath) {
    // Redireciona para o dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  */

  // Permite que todas as solicitações continuem durante o desenvolvimento
  return NextResponse.next();
}

// Configuração do Matcher
export const config = {
  /*
   * Corresponde a todos os caminhos de solicitação, exceto para os que começam com:
   * - api (rotas de API)
   * - _next/static (arquivos estáticos)
   * - _next/image (arquivos de otimização de imagem)
   * - favicon.ico (arquivo de favicon)
   */
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
