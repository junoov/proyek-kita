export const prerender = false;

import type { APIRoute } from 'astro';

// Default photos to seed into DB on first run (empty, managed via Admin dashboard)
const DEFAULT_PHOTOS: Array<{ title: string; image: string; category: string }> = [];

// Default Size Chart data
const DEFAULT_SIZE_CHART = [
  // KEMEJA REGULER
  { category_key: 'kemeja', fit_key: 'reguler', size_label: 'S', panjang: '68', lebar: '50', lengan_bahu: '23', sort_order: 1 },
  { category_key: 'kemeja', fit_key: 'reguler', size_label: 'M', panjang: '70', lebar: '52', lengan_bahu: '24', sort_order: 2 },
  { category_key: 'kemeja', fit_key: 'reguler', size_label: 'L', panjang: '72', lebar: '54', lengan_bahu: '25', sort_order: 3 },
  { category_key: 'kemeja', fit_key: 'reguler', size_label: 'XL', panjang: '74', lebar: '56', lengan_bahu: '26', sort_order: 4 },
  { category_key: 'kemeja', fit_key: 'reguler', size_label: 'XXL', panjang: '76', lebar: '60', lengan_bahu: '27', sort_order: 5 },

  // KEMEJA BOXY
  { category_key: 'kemeja', fit_key: 'boxy', size_label: 'S', panjang: '64', lebar: '54', lengan_bahu: '22', sort_order: 1 },
  { category_key: 'kemeja', fit_key: 'boxy', size_label: 'M', panjang: '66', lebar: '56', lengan_bahu: '23', sort_order: 2 },
  { category_key: 'kemeja', fit_key: 'boxy', size_label: 'L', panjang: '68', lebar: '58', lengan_bahu: '24', sort_order: 3 },
  { category_key: 'kemeja', fit_key: 'boxy', size_label: 'XL', panjang: '70', lebar: '60', lengan_bahu: '25', sort_order: 4 },
  { category_key: 'kemeja', fit_key: 'boxy', size_label: 'XXL', panjang: '72', lebar: '62', lengan_bahu: '26', sort_order: 5 },

  // T-SHIRT REGULER
  { category_key: 't-shirt', fit_key: 'reguler', size_label: 'S', panjang: '68', lebar: '48', lengan_bahu: '20', sort_order: 1 },
  { category_key: 't-shirt', fit_key: 'reguler', size_label: 'M', panjang: '70', lebar: '50', lengan_bahu: '21', sort_order: 2 },
  { category_key: 't-shirt', fit_key: 'reguler', size_label: 'L', panjang: '72', lebar: '52', lengan_bahu: '22', sort_order: 3 },
  { category_key: 't-shirt', fit_key: 'reguler', size_label: 'XL', panjang: '74', lebar: '54', lengan_bahu: '23', sort_order: 4 },
  { category_key: 't-shirt', fit_key: 'reguler', size_label: 'XXL', panjang: '76', lebar: '58', lengan_bahu: '24', sort_order: 5 },

  // T-SHIRT BOXY
  { category_key: 't-shirt', fit_key: 'boxy', size_label: 'S', panjang: '64', lebar: '54', lengan_bahu: '21', sort_order: 1 },
  { category_key: 't-shirt', fit_key: 'boxy', size_label: 'M', panjang: '66', lebar: '56', lengan_bahu: '22', sort_order: 2 },
  { category_key: 't-shirt', fit_key: 'boxy', size_label: 'L', panjang: '68', lebar: '58', lengan_bahu: '23', sort_order: 3 },
  { category_key: 't-shirt', fit_key: 'boxy', size_label: 'XL', panjang: '70', lebar: '60', lengan_bahu: '24', sort_order: 4 },
  { category_key: 't-shirt', fit_key: 'boxy', size_label: 'XXL', panjang: '72', lebar: '62', lengan_bahu: '25', sort_order: 5 },

  // WORKJACKET
  { category_key: 'workjacket', fit_key: 'standard', size_label: 'S', panjang: '66', lebar: '54', lengan_bahu: '58', sort_order: 1 },
  { category_key: 'workjacket', fit_key: 'standard', size_label: 'M', panjang: '68', lebar: '56', lengan_bahu: '60', sort_order: 2 },
  { category_key: 'workjacket', fit_key: 'standard', size_label: 'L', panjang: '70', lebar: '58', lengan_bahu: '62', sort_order: 3 },
  { category_key: 'workjacket', fit_key: 'standard', size_label: 'XL', panjang: '72', lebar: '60', lengan_bahu: '64', sort_order: 4 },
  { category_key: 'workjacket', fit_key: 'standard', size_label: 'XXL', panjang: '74', lebar: '64', lengan_bahu: '66', sort_order: 5 },

  // VEST
  { category_key: 'vest', fit_key: 'standard', size_label: 'S', panjang: '62', lebar: '52', lengan_bahu: '40', sort_order: 1 },
  { category_key: 'vest', fit_key: 'standard', size_label: 'M', panjang: '64', lebar: '54', lengan_bahu: '42', sort_order: 2 },
  { category_key: 'vest', fit_key: 'standard', size_label: 'L', panjang: '66', lebar: '56', lengan_bahu: '44', sort_order: 3 },
  { category_key: 'vest', fit_key: 'standard', size_label: 'XL', panjang: '68', lebar: '58', lengan_bahu: '46', sort_order: 4 },
  { category_key: 'vest', fit_key: 'standard', size_label: 'XXL', panjang: '70', lebar: '62', lengan_bahu: '48', sort_order: 5 },

  // CELANA PANJANG
  { category_key: 'celana', fit_key: 'panjang', size_label: 'S (28–29)', panjang: '98', lebar: '76', lengan_bahu: '58', sort_order: 1 },
  { category_key: 'celana', fit_key: 'panjang', size_label: 'M (30–31)', panjang: '100', lebar: '81', lengan_bahu: '60', sort_order: 2 },
  { category_key: 'celana', fit_key: 'panjang', size_label: 'L (32–33)', panjang: '102', lebar: '86', lengan_bahu: '62', sort_order: 3 },
  { category_key: 'celana', fit_key: 'panjang', size_label: 'XL (34–35)', panjang: '104', lebar: '91', lengan_bahu: '64', sort_order: 4 },
  { category_key: 'celana', fit_key: 'panjang', size_label: 'XXL (36–37)', panjang: '106', lebar: '96', lengan_bahu: '68', sort_order: 5 },

  // CELANA PENDEK
  { category_key: 'celana', fit_key: 'pendek', size_label: 'S (28–29)', panjang: '45', lebar: '76', lengan_bahu: '58', sort_order: 1 },
  { category_key: 'celana', fit_key: 'pendek', size_label: 'M (30–31)', panjang: '47', lebar: '81', lengan_bahu: '60', sort_order: 2 },
  { category_key: 'celana', fit_key: 'pendek', size_label: 'L (32–33)', panjang: '49', lebar: '86', lengan_bahu: '62', sort_order: 3 },
  { category_key: 'celana', fit_key: 'pendek', size_label: 'XL (34–35)', panjang: '51', lebar: '91', lengan_bahu: '64', sort_order: 4 },
  { category_key: 'celana', fit_key: 'pendek', size_label: 'XXL (36–37)', panjang: '53', lebar: '96', lengan_bahu: '68', sort_order: 5 },

  // TOTEBAG & APRON
  { category_key: 'totebag-apron', fit_key: 'standard', size_label: 'Totebag Standard', panjang: '40', lebar: '35', lengan_bahu: 'Tali 60 cm (Panjang Bahu)', sort_order: 1 },
  { category_key: 'totebag-apron', fit_key: 'standard', size_label: 'Apron / Celemek', panjang: '75', lebar: '65', lengan_bahu: 'Tali Leher & Pinggang Adjustable', sort_order: 2 }
];

// Fallback in-memory state for local dev mode without DB binding
let memoryPhotos: Array<{ id: number; title: string; image: string; category: string }> = [];
let memorySizeChart = DEFAULT_SIZE_CHART.map((item, index) => ({ id: index + 1, ...item }));

// GET: Ambil foto atau data size chart dari database
export const GET: APIRoute = async ({ request, locals }) => {
  try {
    const url = new URL(request.url);
    const actionParam = url.searchParams.get('action');
    const categoryParam = url.searchParams.get('category');

    const env = (locals as any).runtime?.env;

    // 1. OPSI AMBIL DATA SIZE CHART
    if (actionParam === 'get_size_chart') {
      if (!env?.DB) {
        return new Response(JSON.stringify({ 
          success: true, 
          sizeChart: memorySizeChart 
        }), {
          status: 200,
          headers: { 
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
          }
        });
      }

      await env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS size_chart (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category_key TEXT NOT NULL,
          fit_key TEXT NOT NULL,
          size_label TEXT NOT NULL,
          panjang TEXT NOT NULL,
          lebar TEXT NOT NULL,
          lengan_bahu TEXT NOT NULL,
          sort_order INTEGER DEFAULT 0
        )
      `).run();

      const countRes = await env.DB.prepare('SELECT COUNT(*) as count FROM size_chart').first();
      if (!countRes || (countRes as any).count === 0) {
        for (const item of DEFAULT_SIZE_CHART) {
          await env.DB.prepare(`
            INSERT INTO size_chart (category_key, fit_key, size_label, panjang, lebar, lengan_bahu, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `).bind(item.category_key, item.fit_key, item.size_label, item.panjang, item.lebar, item.lengan_bahu, item.sort_order).run();
        }
      }

      const { results } = await env.DB.prepare('SELECT * FROM size_chart ORDER BY id ASC').all();
      return new Response(JSON.stringify({ 
        success: true, 
        sizeChart: results || [] 
      }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json', 
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
        }
      });
    }

    // 2. OPSI AMBIL FOTO GALERI
    if (!env?.DB) {
      const filtered = categoryParam 
        ? memoryPhotos.filter(p => (p.category || 'home') === categoryParam) 
        : memoryPhotos;
      return new Response(JSON.stringify({ 
        success: true, 
        photos: filtered 
      }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json', 
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
        }
      });
    }

    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        image TEXT NOT NULL,
        category TEXT DEFAULT 'home',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    try {
      await env.DB.prepare("ALTER TABLE gallery ADD COLUMN category TEXT DEFAULT 'home'").run();
    } catch (e) {}

    let results;
    if (categoryParam) {
      const res = await env.DB.prepare('SELECT * FROM gallery WHERE category = ? ORDER BY id ASC').bind(categoryParam).all();
      results = res.results;
    } else {
      const res = await env.DB.prepare('SELECT * FROM gallery ORDER BY id ASC').all();
      results = res.results;
    }

    return new Response(JSON.stringify({ 
      success: true, 
      photos: results || [] 
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json', 
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
      }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), { 
      status: 500,
      headers: { 
        'Content-Type': 'application/json', 
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};

// POST: Login, Simpan foto, atau Simpan perubahannya ke Size Chart
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { action, username, password, photoData, sizeChartItems } = body;

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

    // 2. ACTION SAVE SIZE CHART
    if (action === 'save_size_chart') {
      const env = (locals as any).runtime?.env;
      if (!Array.isArray(sizeChartItems)) {
        return new Response(JSON.stringify({ success: false, message: 'Data size chart tidak valid' }), { status: 400 });
      }

      if (!env?.DB) {
        memorySizeChart = sizeChartItems.map((item, index) => ({ id: item.id || index + 1, ...item }));
        return new Response(JSON.stringify({ success: true, message: 'Ukuran Size Chart berhasil diperbarui!' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      await env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS size_chart (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category_key TEXT NOT NULL,
          fit_key TEXT NOT NULL,
          size_label TEXT NOT NULL,
          panjang TEXT NOT NULL,
          lebar TEXT NOT NULL,
          lengan_bahu TEXT NOT NULL,
          sort_order INTEGER DEFAULT 0
        )
      `).run();

      for (const item of sizeChartItems) {
        if (item.id) {
          await env.DB.prepare(`
            UPDATE size_chart 
            SET panjang = ?, lebar = ?, lengan_bahu = ?
            WHERE id = ?
          `).bind(item.panjang, item.lebar, item.lengan_bahu, item.id).run();
        } else {
          await env.DB.prepare(`
            INSERT INTO size_chart (category_key, fit_key, size_label, panjang, lebar, lengan_bahu, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `).bind(item.category_key, item.fit_key, item.size_label, item.panjang, item.lebar, item.lengan_bahu, item.sort_order || 0).run();
        }
      }

      return new Response(JSON.stringify({ success: true, message: 'Ukuran Size Chart berhasil diperbarui di database!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 3. ACTION SAVE PHOTO
    if (action === 'save_photo') {
      const category = photoData.category || 'home';
      const env = (locals as any).runtime?.env;
      if (!env?.DB) {
        const newId = memoryPhotos.length > 0 ? Math.max(...memoryPhotos.map(p => p.id)) + 1 : 1;
        const newPhoto = { 
          id: newId, 
          title: photoData.title || 'Foto Baru', 
          image: photoData.image,
          category: category 
        };
        memoryPhotos.push(newPhoto);
        return new Response(JSON.stringify({ success: true, message: 'Foto berhasil disimpan!' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      await env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS gallery (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          image TEXT NOT NULL,
          category TEXT DEFAULT 'home',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `).run();

      try {
        await env.DB.prepare("ALTER TABLE gallery ADD COLUMN category TEXT DEFAULT 'home'").run();
      } catch (e) {}

      await env.DB.prepare('INSERT INTO gallery (title, image, category) VALUES (?, ?, ?)')
        .bind(photoData.title, photoData.image, category)
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
      memoryPhotos = memoryPhotos.filter(p => String(p.id) !== String(photoId));
      return new Response(JSON.stringify({ success: true, message: 'Foto berhasil dihapus!' }), {
        status: 200,
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
