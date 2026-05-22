"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Upload, Image as ImageIcon, X, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockGalleryImages, type GalleryImage } from "@/lib/mock-data"

export function GalleryContent() {
  const [images, setImages] = useState<GalleryImage[]>(mockGalleryImages)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [newImage, setNewImage] = useState({
    url: "",
    alt: "",
    category: "transformation" as const
  })

  const handleAdd = () => {
    const image: GalleryImage = {
      id: Date.now().toString(),
      ...newImage
    }
    setImages([...images, image])
    setNewImage({
      url: "",
      alt: "",
      category: "transformation"
    })
    setIsAddingNew(false)
  }

  const handleDelete = (id: string) => {
    setImages(images.filter(img => img.id !== id))
  }

  const categories = [
    { value: "all", label: "All Photos" },
    { value: "transformation", label: "Transformations" },
    { value: "training", label: "Training" },
    { value: "lifestyle", label: "Lifestyle" }
  ]

  const filteredImages = (category: string) => {
    if (category === "all") return images
    return images.filter(img => img.category === category)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Gallery</h1>
          <p className="text-muted-foreground mt-1">Manage transformation photos and media</p>
        </div>
        <Button onClick={() => setIsAddingNew(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Image
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
                <CardTitle className="text-lg">Add New Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      value={newImage.url}
                      onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Alt Text</Label>
                    <Input
                      value={newImage.alt}
                      onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
                      placeholder="Client transformation - 12 weeks"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <div className="flex gap-2">
                    {["transformation", "training", "lifestyle"].map((cat) => (
                      <Button
                        key={cat}
                        variant={newImage.category === cat ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewImage({ ...newImage, category: cat as typeof newImage.category })}
                      >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAdd} disabled={!newImage.url || !newImage.alt}>
                    Add Image
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-muted/50">
          {categories.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value}>
              {cat.label} ({filteredImages(cat.value).length})
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat.value} value={cat.value} className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages(cat.value).map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative aspect-square rounded-lg overflow-hidden bg-muted"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-12 w-12" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-medium truncate">{image.alt}</p>
                    <p className="text-white/70 text-xs capitalize">{image.category}</p>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelectedImage(image)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDelete(image.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full aspect-video bg-muted rounded-lg flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageIcon className="h-24 w-24 text-muted-foreground" />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-medium">{selectedImage.alt}</p>
                <p className="text-white/70 text-sm capitalize">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
