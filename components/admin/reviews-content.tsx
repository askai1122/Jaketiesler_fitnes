'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Eye, Star, Trash2 } from 'lucide-react'
import { mockReviews } from '@/lib/mock-data'

export default function ReviewsContent() {
  const [reviews, setReviews] = useState(mockReviews)

  const removeReview = (id: number) => {
    setReviews(reviews.filter((review) => review.id !== id))
  }

  const publishReview = (id: number) => {
    setReviews(reviews.map((review) => (
      review.id === id ? { ...review, status: 'published' } : review
    )))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl md:text-4xl text-heading dark:text-pearl">
          Reviews
        </h1>
        <p className="text-body dark:text-pearl/70 mt-1">
          Manage Yelp and Google reviews shown across the site.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <ReviewMetric label="Published Reviews" value={reviews.length.toString()} />
        <ReviewMetric label="Average Rating" value="5.0" />
        <ReviewMetric label="Review Sources" value="2" />
      </div>

      <motion.div
        className="rounded-lg bg-surface dark:bg-charcoal border border-border overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Client</th>
              <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Review</th>
              <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Rating</th>
              <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Platform</th>
              <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Status</th>
              <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-b border-border last:border-0 hover:bg-background dark:hover:bg-obsidian transition-colors">
                <td className="p-4 text-body dark:text-pearl font-medium">{review.client}</td>
                <td className="p-4 text-muted-foreground max-w-sm">{review.preview}</td>
                <td className="p-4">
                  <div className="flex">
                    {Array.from({ length: review.stars }).map((_, index) => (
                      <Star key={index} className="w-4 h-4 fill-amber text-amber" />
                    ))}
                  </div>
                </td>
                <td className="p-4 text-body dark:text-pearl">{review.platform}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-500 capitalize">
                    {review.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded hover:bg-amber/10 transition-colors">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button onClick={() => publishReview(review.id)} className="p-1.5 rounded hover:bg-amber/10 transition-colors">
                      <Check className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button onClick={() => removeReview(review.id)} className="p-1.5 rounded hover:bg-red-500/10 transition-colors">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}

function ReviewMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6 rounded-lg bg-surface dark:bg-charcoal border border-border">
      <p className="font-display text-4xl text-amber">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  )
}
