import Link from 'next/link'
import { Phone, Shield, Heart } from 'lucide-react'

const helplines = [
  { name: 'Tele-MANAS', number: '14416', description: '24/7, Free' },
  { name: 'iCALL', number: '9152987821', description: 'Mon-Sat' },
  { name: 'Vandrevala', number: '1860-2662-345', description: '24/7' },
]

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🪷</span>
              <span className="font-bold text-lg text-foreground">Ojas Circle</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              India&apos;s anonymous platform for sexual wellness, mental health support, and Ayurvedic guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/feed" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Feed</Link>
              <Link href="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Community</Link>
              <Link href="/ai" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Consultant</Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
            </div>
          </div>

          {/* Privacy */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Shield className="h-4 w-4 text-secondary" />
              Privacy First
            </h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Zero personal data collected</p>
              <p>Auto-delete after 30 days</p>
              <p>DPDP Act 2023 Compliant</p>
            </div>
          </div>

          {/* Helplines */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              24/7 Helplines
            </h3>
            <div className="space-y-3">
              {helplines.map((line) => (
                <a 
                  key={line.name}
                  href={`tel:${line.number}`}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <div>
                    <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{line.name}</div>
                    <div className="text-xs text-muted-foreground">{line.description}</div>
                  </div>
                  <div className="text-sm font-mono text-primary">{line.number}</div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-destructive" /> by Team Dark Horses
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
