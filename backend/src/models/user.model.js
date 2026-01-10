import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
  },
  { timestamps: true },
);



userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next;
  this.password = await bcrypt.hash(this.password, 10);
  next;
});


userSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      userId: this._id,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1d' },
  );
};

export const User = mongoose.model('User', userSchema);
