import Image from "next/image"
import { Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Owner",
      image: "/images/testimonial-1.png",
      content:
        "REACH has transformed how I handle international payments. The platform is intuitive and the rates are unbeatable.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Crypto Enthusiast",
      image: "/images/testimonial-2.png",
      content:
        "The crypto trading experience on REACH is seamless. I particularly appreciate the security features and real-time market updates.",
    },
    {
      id: 3,
      name: "Emma Williams",
      role: "Digital Nomad",
      image: "/images/testimonial-3.png",
      content:
        "As someone who travels frequently, REACH's gift card service has been a game-changer. Fast, reliable, and great customer support!",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What Our Users Say</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Don't just take our word for it. Here's what our community has to say about their experience with REACH.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{testimonial.content}</p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
