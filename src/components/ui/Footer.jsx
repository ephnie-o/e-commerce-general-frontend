const { FaFacebook, FaInstagram, FaTwitter } = require("react-icons/fa6");

const navigation = {
    main: [
      { name: 'Home', href: '#' },
      { name: 'About', href: '#' },
      { name: 'Shop', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    social: [
      {
        name: 'Facebook',
        href: '#',
        icon: (props) => (
          <FaFacebook />
        ),
      },
      {
        name: 'Instagram',
        href: '#',
        icon: (props) => (
          <FaInstagram />
        ),
      },
      {
        name: 'X',
        href: '#',
        icon: (props) => (
          <FaTwitter />
        ),
      },
    ],
  }

  export default function Footer() {
    return (
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
          <nav aria-label="Footer" className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6">
            {navigation.main.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-600 hover:text-gray-900">
                {item.name}
              </a>
            ))}
          </nav>
          <div className="mt-16 flex justify-center gap-x-10">
            {navigation.social.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-600 hover:text-gray-800">
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
          <p className="mt-10 text-center text-sm/6 text-gray-600">&copy; 2024 E-commerce, Inc. All rights reserved.</p>
        </div>
      </footer>
    )
  }
