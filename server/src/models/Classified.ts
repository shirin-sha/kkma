import mongoose, { Document, Schema } from 'mongoose';

export interface IClassified extends Document {
  title: string;
  description: string;
  price: string;
  category: string;
  location: string;
  phone?: string;
  email?: string;
  images: string[];
  userId: mongoose.Types.ObjectId;
  status: 'active' | 'inactive' | 'pending';
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const ClassifiedSchema = new Schema<IClassified>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    images: [{ type: String }],
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'pending' },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IClassified>('Classified', ClassifiedSchema);

