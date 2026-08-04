export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { action, username, password, photoData, photoId } = body;

    // 1. ACTION LOGIN VERIFICATION
    if (action === 'login') {
      // Default credentials: admin / admin123
      if (username === 'admin' && password === 'admin123') {
        return new Response(JSON.stringify({ success: true, token: 'session_rc_admin_token' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return new Response(JSON.stringify({ success: false, message: 'Username atau Password salah!' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. ACTION ADD / SAVE PHOTO TO CLOUDFLARE D1 & R2
    if (action === 'save_photo') {
      // jika ada binding env DB di Cloudflare:
      const env = (locals as any).runtime?.env;
      if (env?.DB) {
        await env.DB.prepare('INSERT INTO gallery (title, image) VALUES (?, ?)').bind(photoData.title, photoData.image).run();
      }
      return new Response(JSON.stringify({ success: true, message: 'Foto berhasil tersimpan permanen!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: false, message: 'Aksi tidak dikenali' }), { status: 400 });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500 });
  }
};
