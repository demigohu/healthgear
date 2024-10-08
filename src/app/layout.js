import { Poppins } from "next/font/google"
import "./globals.css"
import Navbar from "../components/Navbar"

const poppins = Poppins({ subsets: ["latin"], weight: "400" })

export const metadata = {
  title: "HealthGear",
  description: "Create By Demigohu",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
