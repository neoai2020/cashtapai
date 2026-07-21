'use client'

import { useEffect, useState } from 'react'
import { Lightbulb } from 'lucide-react'

const TIPS = [
  {
    title: 'Tip',
    body: 'Start with one clear topic — weight loss, dog training, skincare, etc.',
  },
  {
    title: 'Tip',
    body: 'Pick ads with high engagement so more people see your reply.',
  },
  {
    title: 'Tip',
    body: 'Paste your affiliate link in Step 4 so replies include your tracking URL.',
  },
  {
    title: 'Tip',
    body: 'Post consistently — a few replies daily beats one big burst.',
  },
]

export function DashboardTipsWidget() {
  const [tipIndex, setTipIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTipIndex((i) => (i + 1) % TIPS.length)
    }, 12000)
    return () => window.clearInterval(timer)
  }, [])

  const tip = TIPS[tipIndex]

  return (
    <div className="card-base border-border-dim/40 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={16} className="text-accent shrink-0" />
        <p className="ds-h4">{tip.title}</p>
      </div>
      <p className="text-sm leading-relaxed text-text-muted">{tip.body}</p>
      <p className="mt-3 text-xs text-text-muted italic">Individual results vary.</p>
    </div>
  )
}
