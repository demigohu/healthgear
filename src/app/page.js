import Image from 'next/image'
import Submit from "../components/Submit"
import Access from '@/components/access'
import Service from '@/components/service'
import Mint from '@/components/mint'
import HealthServices from '@/components/HealthService'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HealthServices />
      <Mint />
      <Access />
      <Service />
      <Submit />
    </main>
  )
}
