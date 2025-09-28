import { CreditCard, Coins, ArrowRightLeft, Wallet } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: "Gift Cards",
      description: "Buy and sell gift cards at competitive rates with instant processing.",
      icon: CreditCard,
    },
    {
      id: 2,
      title: "Cryptocurrency",
      description: "Trade popular cryptocurrencies with real-time market data and secure storage.",
      icon: Coins,
    },
    {
      id: 3,
      title: "Money Transfer",
      description: "Send money globally with low fees and fast delivery to over 50 countries.",
      icon: ArrowRightLeft,
    },
    {
      id: 4,
      title: "Digital Wallet",
      description: "Store, manage, and protect your digital assets in our secure wallet.",
      icon: Wallet,
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Services</h2>
        <p className="text-center text-gray-600 mb-12">
          Comprehensive financial solutions designed to meet your digital transaction needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div key={service.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-[#1a4734]/10 p-3 rounded-full w-fit mb-4">
                  <Icon className="h-6 w-6 text-[#1a4734]" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
