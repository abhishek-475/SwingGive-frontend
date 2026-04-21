import React from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const quickLinks = [
    { name: "How It Works", path: "/how-it-works" },
    { name: "Charities", path: "/charities" },
    { name: "Draws", path: "/draws" },
    { name: "Winners", path: "/winners" }
  ]

  const supportLinks = [
    { name: "FAQ", path: "/faq" },
    { name: "Contact Us", path: "/contact" },
    { name: "Terms", path: "/terms" },
    { name: "Privacy", path: "/privacy" }
  ]

  const socialLinks = [
    { icon: FaGithub, url: "https://github.com" },
    { icon: FaTwitter, url: "https://twitter.com" },
    { icon: FaLinkedin, url: "https://linkedin.com" }
  ]

  return (
    <footer className="relative bg-gray-950 text-white mt-auto overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.15),transparent_55%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <h3 className="text-2xl font-bold">
              Swing<span className="text-emerald-500">Give</span>
            </h3>

            <p className="mt-4 text-gray-400 leading-relaxed">
              Play golf, win rewards, and create real-world impact through charity.
            </p>

            <p className="mt-6 text-sm text-gray-500">
              Built for golfers who care.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              {quickLinks.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="hover:text-emerald-400 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="font-semibold mb-5">Support</h4>
            <ul className="space-y-3 text-gray-400">
              {supportLinks.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="hover:text-emerald-400 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="font-semibold mb-5">Connect</h4>

            <div className="flex gap-3">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-emerald-600 transition"
                >
                  <item.icon />
                </a>
              ))}
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Follow us for updates & winners.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-500 text-sm">
            © 2026 SwingGive. All rights reserved.
          </p>

          <p className="text-gray-400 text-sm flex items-center gap-2">
            Made with <FaHeart className="text-red-500" /> for a better world
          </p>

        </div>

      </div>
    </footer>
  )
}

export default Footer