import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  totalAmount: { type: Number, required: true, min: 0 },
  orderDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
});

const OrderModel =
  mongoose.models.Orders || mongoose.model("Orders", orderSchema);

export default OrderModel;
