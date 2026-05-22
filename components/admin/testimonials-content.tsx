"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Star, Edit2, Trash2, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { mockTestimonials, type Testimonial } from "@/lib/mock-data"

export function TestimonialsContent() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80"
  })

  const handleAdd = () => {
    const testimonial: Testimonial = {
      id: Date.now().toString(),
      ...newTestimonial
    }
    setTestimonials([...testimonials, testimonial])
    setNewTestimonial({
      name: "",
      role: "",
      content: "",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80"
    })
    setIsAddingNew(false)
  }

  const handleDelete = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id))
  }

  const handleToggleFeatured = (id: string) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, featured: !t.featured } : t
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Testimonials</h1>
          <p className="text-muted-foreground mt-1">Manage client reviews and success stories</p>
        </div>
        <Button onClick={() => setIsAddingNew(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <AnimatePresence>
        {isAddingNew && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">New Testimonial</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Client Name</Label>
                    <Input
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Achievement/Role</Label>
                    <Input
                      value={newTestimonial.role}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                      placeholder="Lost 30lbs in 3 months"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Testimonial</Label>
                  <Textarea
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                    placeholder="Share the client's experience..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewTestimonial({ ...newTestimonial, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= newTestimonial.rating
                              ? "fill-primary text-primary"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAdd} disabled={!newTestimonial.name || !newTestimonial.content}>
                    Add Testimonial
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={testimonial.featured ? "border-primary/30 bg-primary/5" : ""}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                        {testimonial.featured && (
                          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <div className="flex gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= testimonial.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mt-3 text-foreground/80 leading-relaxed">
                        &quot;{testimonial.content}&quot;
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleFeatured(testimonial.id)}
                      className={testimonial.featured ? "text-primary" : ""}
                    >
                      <Star className={`h-4 w-4 ${testimonial.featured ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(testimonial.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
