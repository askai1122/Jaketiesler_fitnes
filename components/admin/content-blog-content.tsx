'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit, Eye, FileText, Plus, Trash2 } from 'lucide-react'
import { mockBlogPosts } from '@/lib/mock-data'

type BlogPost = (typeof mockBlogPosts)[number]

export default function ContentBlogContent() {
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts)

  const toggleStatus = (id: number) => {
    setPosts(posts.map((post) => (
      post.id === id
        ? { ...post, status: post.status === 'published' ? 'draft' : 'published' }
        : post
    )))
  }

  const deletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-heading dark:text-pearl">
            Content & Blog
          </h1>
          <p className="text-body dark:text-pearl/70 mt-1">
            Manage blog articles, content status, and publishing flow.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber text-charcoal font-medium hover:bg-amber/90 transition-colors">
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <ContentMetric label="Total Posts" value={posts.length.toString()} />
        <ContentMetric label="Published" value={posts.filter((post) => post.status === 'published').length.toString()} />
        <ContentMetric label="Drafts" value={posts.filter((post) => post.status === 'draft').length.toString()} />
      </div>

      <motion.div
        className="rounded-lg bg-surface dark:bg-charcoal border border-border overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Title</th>
              <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Category</th>
              <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Date</th>
              <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Status</th>
              <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-border last:border-0 hover:bg-background dark:hover:bg-obsidian transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber/10">
                      <FileText className="w-4 h-4 text-amber" />
                    </div>
                    <span className="text-body dark:text-pearl font-medium">{post.title}</span>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">{post.category}</td>
                <td className="p-4 text-muted-foreground">{post.date}</td>
                <td className="p-4">
                  <button
                    onClick={() => toggleStatus(post.id)}
                    className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                      post.status === 'published'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}
                  >
                    {post.status}
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded hover:bg-amber/10 transition-colors">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-amber/10 transition-colors">
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button onClick={() => deletePost(post.id)} className="p-1.5 rounded hover:bg-red-500/10 transition-colors">
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

function ContentMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6 rounded-lg bg-surface dark:bg-charcoal border border-border">
      <p className="font-display text-4xl text-amber">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  )
}
