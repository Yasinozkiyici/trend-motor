import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // Basit şifre kontrolü (production'da daha güvenli olmalı)
    const adminPassword = process.env.ADMIN_PASSWORD || 'Yasin.4595';

    if (password === adminPassword) {
      // Şifre doğruysa session cookie'si oluştur
      const response = NextResponse.json({ success: true });
      
      // Güvenli cookie oluştur
      response.cookies.set('admin-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 saat
        path: '/',
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, error: 'Yanlış şifre' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
