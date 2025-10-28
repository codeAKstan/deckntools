import mongoose, { Document, Schema } from 'mongoose'

export interface IBank extends Document {
  bankName: string
  accountHolderName: string
  accountNumber: string
  bankAddress: string
  createdAt: Date
  updatedAt: Date
}

const BankSchema = new Schema<IBank>({
  bankName: { type: String, required: true },
  accountHolderName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  bankAddress: { type: String, required: true },
}, {
  timestamps: true,
})

export default mongoose.models.Bank || mongoose.model<IBank>('Bank', BankSchema)