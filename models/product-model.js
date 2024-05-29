import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
    },
    price: {
      type: Number,
    },
    discount_price: {
      type: Number,
    },
    reviewsNumber: {
      type: Number,
    },
    ratings: {
      type: Number,
    },
    availability: {
      type: Boolean,
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
    },
    details: {
      material: String,
      dimensions: String,
      weight: String,
    },
    description: {
      type: String,
    },
    sizes: {
      type: Array,
    },
    colors: {
      type: Array,
    },
    sku: {
      type: Number,
    },
    soldCounts: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel =
  mongoose.models.Products || mongoose.model("Products", productSchema);

export default ProductModel;
