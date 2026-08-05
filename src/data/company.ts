import companyData from "./company.json"
import servicesData from "./services.json"
import clientsData from "./clients.json"

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

export const company = companyData

export const navigation = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Layanan", href: "/layanan" },
  { label: "Size Chart", href: "/size-chart" },
  { label: "Pelanggan", href: "/pelanggan" },
  { label: "Kontak", href: "/kontak" },
] as const

export const services: readonly Service[] = servicesData.services

export const stats = [
  { value: "12+", label: "tahun membangun kepercayaan tim" },
  { value: "280k", label: "set seragam diproduksi setiap tahun" },
  { value: "99%", label: "ketepatan pengiriman batch terakhir" },
] as const satisfies readonly Stat[]

export const clients: readonly Client[] = clientsData.clients

export const contactChannels = [
  { label: "WhatsApp", value: "0823-2390-6453 / 0896-0580-0090", href: company.whatsapp },
  { label: "Instagram Dealer", value: "@roller.dealer", href: company.instagramDealer },
  { label: "Instagram Customize", value: "@rollercustomize", href: company.instagram },
  { label: "Shopee", value: "Roller Dealer", href: company.shopee },
] as const satisfies readonly ContactChannel[]
