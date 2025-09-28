import Image from "next/image"

export default function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/money-hands.jpeg"
                alt="Person holding cash - representing financial transactions and money management"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About REACH</h2>
            <p className="text-gray-700 mb-8">
              REACH is a leading digital financial platform that connects people to seamless transaction solutions. Our
              mission is to make digital transactions accessible, secure, and efficient for everyone.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl font-bold text-[#1a4734] mb-2">1M+</h3>
                <p className="text-gray-600">Active Users</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#1a4734] mb-2">50+</h3>
                <p className="text-gray-600">Countries Served</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#1a4734] mb-2">$500M+</h3>
                <p className="text-gray-600">Transaction Volume</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#1a4734] mb-2">24/7</h3>
                <p className="text-gray-600">Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
