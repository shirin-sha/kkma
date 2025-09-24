import mongoose, { Schema, Document, Model } from 'mongoose'

export interface NewsPostDoc extends Document {
  title: string
  href: string
  img?: string
  imagePath?: string
  content?: string
  contentHtml?: string
  excerpt?: string
  slug?: string
  featuredAlt?: string
  featuredCaption?: string
  galleryPaths?: string[]
  tags?: string[]
  seoTitle?: string
  seoDescription?: string
  date: { day: string; monthYear: string }
  category: string
  author: string
  comments: number
  createdAt: Date
  updatedAt: Date
}

const NewsPostSchema = new Schema<NewsPostDoc>({
  title: { type: String, required: true },
  href: { type: String, required: true },
  img: { type: String },
  imagePath: { type: String },
  content: { type: String },
  contentHtml: { type: String },
  excerpt: { type: String },
  slug: { type: String, index: true, unique: false },
  featuredAlt: { type: String },
  featuredCaption: { type: String },
  galleryPaths: { type: [String], default: [] },
  tags: { type: [String], default: [] },
  seoTitle: { type: String },
  seoDescription: { type: String },
  date: {
    day: { type: String, required: true },
    monthYear: { type: String, required: true }
  },
  category: { type: String, required: true },
  author: { type: String, required: true },
  comments: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { collection: 'newposts' })

NewsPostSchema.pre("save", function(next) {
  this.updatedAt = new Date()
  next()
})

export const NewsPost: Model<NewsPostDoc> = mongoose.models.NewsPost || mongoose.model<NewsPostDoc>("NewsPost", NewsPostSchema)