"use client";

export default function Hero() {
  return (
    <section id="home" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Fast & Reliable Truck Booking Service
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Hassle Free Cargo Transportation Across Bangladesh
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Quick Booking</h3>
            <p className="text-sm opacity-90">Book your truck in just a few clicks</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Best Rates</h3>
            <p className="text-sm opacity-90">Affordable pricing for all truck sizes</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-sm opacity-90">Round the clock customer support</p>
          </div>
        </div>
      </div>
    </section>
  );
}