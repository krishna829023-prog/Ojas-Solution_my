'use client'

import { Navbar } from '@/components/ojas/navbar'
import { Footer } from '@/components/ojas/footer'
import { Shield, Lock, Eye, Trash2, Server, Clock } from 'lucide-react'

const sections = [
  {
    icon: Shield,
    title: 'Zero Personal Data Collection',
    content: 'We do not collect, store, or process any personally identifiable information (PII). No email addresses, phone numbers, real names, or IP addresses are ever recorded.',
  },
  {
    icon: Lock,
    title: 'Anonymous Identity System',
    content: 'Your identity is randomly generated using a combination of adjectives, nouns, and numbers. This anonymous identity is stored locally on your device only and is never transmitted to our servers.',
  },
  {
    icon: Eye,
    title: 'End-to-End Privacy',
    content: 'All data remains on your device. We use local storage (browser) to maintain your session. No server-side user accounts exist.',
  },
  {
    icon: Trash2,
    title: 'Data Deletion Rights',
    content: 'You can delete all your data at any time by clicking "Delete All My Data" in your profile settings. Sessions automatically expire after 30 days of inactivity.',
  },
  {
    icon: Server,
    title: 'No Third-Party Tracking',
    content: 'We do not use any third-party analytics, advertising trackers, or cookies that can identify you. Your browsing behavior is completely private.',
  },
  {
    icon: Clock,
    title: 'DPDP Act 2023 Compliance',
    content: 'Ojas Circle is fully compliant with India\'s Digital Personal Data Protection Act 2023. Since we don\'t collect personal data, there is nothing to protect or breach.',
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Your privacy is not just a feature—it&apos;s the foundation of Ojas Circle. 
            We believe true healing requires complete anonymity.
          </p>
        </div>

        {/* Key Points */}
        <div className="glass-card p-6 mb-8 bg-secondary/10 border-secondary/30">
          <h2 className="font-semibold text-foreground mb-3">Key Points</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-secondary">✓</span>
              No email, phone, or real name required
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary">✓</span>
              All data stored locally on your device
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary">✓</span>
              Auto-delete after 30 days of inactivity
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary">✓</span>
              Delete all data anytime with one click
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary">✓</span>
              Fully DPDP Act 2023 compliant
            </li>
          </ul>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{section.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Last updated: March 2026</p>
          <p className="mt-2">
            Questions about our privacy practices? 
            <br />
            Contact Team Dark Horses at privacy@ojascircle.in
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}
