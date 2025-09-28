import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"
import Testimonials from "@/components/testimonials"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import CallToAction from "@/components/call-to-action"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] bg-[#1a4734] text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-background.jpeg"
            alt="Bitcoin coins on laptop keyboard with cryptocurrency trading charts displaying candlestick patterns and market data"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Your Gateway to Seamless Digital Transactions</h1>
            <p className="text-lg md:text-xl mb-8">
              Experience the future of digital finance with REACH. Send money, trade gift cards, and manage crypto
              assets all in one place.
            </p>
            <Button
              asChild
              className="bg-[#f5f5dc] hover:bg-[#e5e5c5] text-[#1a4734] font-medium text-lg px-8 py-6 rounded-md"
            >
              <Link href="/login">
                Get Started <span className="ml-2">→</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* About Section */}
      <AboutSection />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Call to Action */}
      <CallToAction />

      {/* Footer */}
      <Footer />
    </main>
  )
}
