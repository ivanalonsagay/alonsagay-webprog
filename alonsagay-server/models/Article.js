import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    paragraphs: {
      type: [String],
      default: [],
    },
    preview: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model('Article', articleSchema);

export default Article;