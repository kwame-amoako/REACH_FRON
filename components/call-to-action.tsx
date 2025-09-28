import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="py-16 bg-[#1a4734] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied users who trust REACH for their digital transactions.
        </p>
        <Button
          asChild
          className="bg-[#f5f5dc] hover:bg-[#e5e5c5] text-[#1a4734] font-medium text-lg px-8 py-6 rounded-md"
        >
          <Link href="/login">
            Create Your Account <span className="ml-2">→</span>
          </Link>
        </Button>
      </div>
    </section>
  )
}
