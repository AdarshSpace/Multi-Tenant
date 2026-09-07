
import {GraduationCap, Mail, Phone } from 'lucide-react'

const  tenant = {
    id: 'motionkart-lms-01',
    name: 'Motionkart Academy',
    tagline: 'Empowering Next-Gen Professionals with Interactive Learning',
    logo: {
      text: 'Motionkart',
      subtext: 'Academy',
    },
    contactEmail: 'support@motionkartacademy.edu',
    contactPhone: '+1 (800) 456-7890',
  }

const footer = {
    about:
      'Motionkart Academy is a premier multi-tenant educational platform empowering individuals and organizations with industry-grade skills and live interactive learning.',
    columns: [
      {
        title: 'Platform',
        links: [
          { label: 'All Courses', href: '#courses' },
          { label: 'Live Classes Schedule', href: '#live' },
          { label: 'Instructors Directory', href: '#instructors' },
          { label: 'Student Pricing', href: '#pricing' },
          { label: 'Certifications', href: '#certifications' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Learning Blog', href: '/blog' },
          { label: 'Community Forum', href: '/community' },
          { label: 'Student Help Center', href: '/help' },
          { label: 'System Status', href: '/status' },
        ],
      },
      {
        title: 'Company & Legal',
        links: [
          { label: 'About Tenant', href: '/about' },
          { label: 'Careers', href: '/careers' },
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
        ],
      },
    ],
    socials: [
      { platform: 'Twitter', href: 'https://twitter.com', icon: 'Globe' },
      { platform: 'LinkedIn', href: 'https://linkedin.com', icon: 'Globe' },
      { platform: 'YouTube', href: 'https://youtube.com', icon: 'Video' },
    ],
    copyright: `© ${new Date().getFullYear()} Motionkart Academy LMS. All rights reserved.`,
  }

export function Footer() {

    return (
        <div>
             {/* ----------------------------------------------------------------------
         FOOTER SECTION
      ---------------------------------------------------------------------- */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* About Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-xl text-white tracking-tight">
                  {tenant.name}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-slate-400 max-w-sm">{footer.about}</p>

              <div className="pt-2 flex flex-col space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>{tenant.contactEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-indigo-400" />
                  <span>{tenant.contactPhone}</span>
                </div>
              </div>
            </div>

            {/* Link Columns */}
            {footer.columns.map((col, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-sm font-bold text-white tracking-wider uppercase">
                  {col.title}
                </h4>
                <ul className="space-y-2.5 text-sm">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a href={link.href} className="hover:text-white transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>{footer.copyright}</p>
            <div className="flex items-center gap-6">
              {footer.socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-400 transition-colors"
                >
                  {s.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
        </div>
    )
}