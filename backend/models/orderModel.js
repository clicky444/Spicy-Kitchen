import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [
    {
      title: {
        type: String,
        required: true
      },
      qty: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      }
    }
  ],
  deliveryAddress: {
    address1: {
      type: String,
      required: true
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
      required: true
    },
    landMark: {
      type: String,
    },
  },
  instruction: {
    type: String,
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentResult: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    update_time: {
      type: String,
    },
    email_address: {
      type: String,
    }
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  deliveryFee: {
    type: Number,
    required: true,
    default: 0.0
  },
  serviceFee: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: {
    type: Date
  },
  isCancelled: {
    type: Boolean,
    required: true,
    default: false
  },
  cancelledAt: {
    type: Date
  }
},
{
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
