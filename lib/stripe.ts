import Stripe from "stripe"

let stripeInstance: Stripe | null = null

export function getStripe(): Stripe | null {
  if (stripeInstance) return stripeInstance
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    return null
  }
  stripeInstance = new Stripe(key, {
    apiVersion: "2024-11-20",
  })
  return stripeInstance
}
