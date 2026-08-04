export const prerender = false;

import type { APIRoute } from 'astro';

// GET: Ambil semua foto dari D1 database
export const GET: APIRoute = async ({ locals }) => {
  try {
    const env = (locals as any).runtime?.env;
    if (!env?.DB) {
      // Fallback: kembalikan data default dari gallery.json
      return new Response(JSON.stringify({ 
        success: true, 
        photos: [] 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // Buat tabel jika belum ada
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        image TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    const { results } = await env.DB.prepare('SELECT * FROM gallery ORDER BY id DESC').all();

    return new Response(JSON.stringify({ 
      success: true, 
      photos: results || [] 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
};

// POST: Login atau Simpan foto baru
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { action, username, password, photoData } = body;

    // 1. ACTION LOGIN
    if (action === 'login') {
      if (username === 'admin' && password === 'admin123') {
        return new Response(JSON.stringify({ success: true, token: 'session_rc_admin_token' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
      return new Response(JSON.stringify({ success: false, message: 'Username atau Password salah!' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 2. ACTION SAVE PHOTO
    if (action === 'save_photo') {
      const env = (locals as any).runtime?.env;
      if (!env?.DB) {
        return new Response(JSON.stringify({ success: false, message: 'Database tidak tersedia. Pastikan D1 binding sudah dikonfigurasi.' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      // Buat tabel jika belum ada
      await env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS gallery (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          image TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `).run();

      await env.DB.prepare('INSERT INTO gallery (title, image) VALUES (?, ?)')
        .bind(photoData.title, photoData.image)
        .run();

      return new Response(JSON.stringify({ success: true, message: 'Foto berhasil disimpan ke database!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    return new Response(JSON.stringify({ success: false, message: 'Aksi tidak dikenali' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
};

// DELETE: Hapus foto dari D1
export const DELETE: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { photoId } = body;

    const env = (locals as any).runtime?.env;
    if (!env?.DB) {
      return new Response(JSON.stringify({ success: false, message: 'Database tidak tersedia.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    await env.DB.prepare('DELETE FROM gallery WHERE id = ?').bind(photoId).run();

    return new Response(JSON.stringify({ success: true, message: 'Foto berhasil dihapus!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
};
