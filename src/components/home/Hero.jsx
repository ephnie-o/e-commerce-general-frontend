const Hero = () => {
  return (
    <div>
        <div className="relative">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            alt=""
            src="https://tailwindui.com/plus/img/ecommerce-images/home-page-01-hero-full-width.jpg"
            className="size-full object-cover"
          />
        </div>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">Welcome to Your Favorite Pharmacy</h1>
          <p className="mt-4 text-xl text-white">
            Buy medicines from wherever you are and have us deliver to you.
          </p>
          <a
            href="/products"
            className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            Shop Now
          </a>
        </div>
        </div>
    </div>
  )
}

export default Hero