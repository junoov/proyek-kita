export type ContactChannel = {
  readonly label: string
  readonly value: string
  readonly href: string
}

export type Service = {
  readonly number: string
  readonly title: string
  readonly description: string
  readonly deliverable: string
}

export type Client = {
  readonly initials: string
  readonly name: string
  readonly sector: string
}

export type Stat = {
  readonly value: string
  readonly label: string
}

export const company = {
  name: "Karsa Uniform",
  legalName: "PT Karsa Seragam Indonesia",
  tagline: "Seragam yang bekerja sekeras tim Anda.",
  description:
    "Karsa Uniform merancang dan memproduksi seragam kerja yang rapi, tahan pakai, dan konsisten untuk tim yang bergerak setiap hari.",
  address: "Jl. Industri Cipta No. 18, Tangerang, Banten 15143",
  hours: "Senin–Jumat, 08.00–17.00 WIB",
  email: "halo@karsauniform.co.id",
  phone: "+62 21 555 0188",
  whatsapp: "https://wa.me/6281234567890",
  heroImage: {
    src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1280&q=85",
    srcSet:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=640&q=85 640w, https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=960&q=85 960w, https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1280&q=85 1280w",
    alt: "Deretan pakaian kerja yang tersusun rapi pada rak produksi",
  },
  studioImage: {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85",
    alt: "Profesional yang mengenakan pakaian kerja berwarna netral",
  },
} as const

export const navigation = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Layanan", href: "/layanan" },
  { label: "Pelanggan", href: "/pelanggan" },
  { label: "Kontak", href: "/kontak" },
] as const

export const services = [
  {
    number: "01",
    title: "Konsultasi Kebutuhan",
    description:
      "Kami memetakan peran, lingkungan kerja, dan standar tampilan sebelum satu pola dibuat.",
    deliverable: "Brief fungsi dan arah material",
  },
  {
    number: "02",
    title: "Desain & Sampel",
    description:
      "Tim desain menerjemahkan identitas perusahaan menjadi sistem seragam yang nyaman dan mudah dikenali.",
    deliverable: "Desain terukur dan sampel revisi",
  },
  {
    number: "03",
    title: "Produksi Terkendali",
    description:
      "Setiap batch melewati pemeriksaan ukuran, jahitan, warna, dan detail identitas sebelum dikirim.",
    deliverable: "Produksi batch dengan kontrol mutu",
  },
] as const satisfies readonly Service[]

export const stats = [
  { value: "12+", label: "tahun membangun kepercayaan tim" },
  { value: "280k", label: "set seragam diproduksi setiap tahun" },
  { value: "99%", label: "ketepatan pengiriman batch terakhir" },
] as const satisfies readonly Stat[]

export const clients = [
  { initials: "AP", name: "Arunika Prima", sector: "Hospitality" },
  { initials: "RT", name: "Ruang Transit", sector: "Logistics" },
  { initials: "SV", name: "Savana Ventures", sector: "Property" },
  { initials: "KM", name: "Karya Medika", sector: "Healthcare" },
  { initials: "NS", name: "Nusa Sentra", sector: "Retail" },
  { initials: "TM", name: "Teras Maju", sector: "Services" },
] as const satisfies readonly Client[]

export const contactChannels = [
  { label: "WhatsApp", value: "Mulai percakapan", href: company.whatsapp },
  { label: "Email", value: company.email, href: `mailto:${company.email}` },
  { label: "Telepon", value: company.phone, href: "tel:+62215550188" },
] as const satisfies readonly ContactChannel[]
