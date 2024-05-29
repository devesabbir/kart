import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const WishlistModel =
  mongoose.models.Wishlists || mongoose.model("Wishlists", wishlistSchema);

export default WishlistModel;
