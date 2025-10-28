import { getStripe } from "@/lib/stripe"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, email, firstName, lastName, address, city, postcode } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 })
    }

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    const shipping = subtotal > 500 ? 0 : 1500 // in cents
    const tax = Math.round(subtotal * 0.2 * 100)
    const total = Math.round(subtotal * 100) + shipping + tax

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    // Add shipping as a line item if applicable
    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: "gbp",
          product_data: {
            name: "Shipping",
          },
          unit_amount: shipping,
        },
        quantity: 1,
      })
    }

    // Add tax as a line item
    lineItems.push({
      price_data: {
        currency: "gbp",
        product_data: {
          name: "Tax (20%)",
        },
        unit_amount: tax,
      },
      quantity: 1,
    })

    const stripe = getStripe()
    if (!stripe) {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 })
    }

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      customer_email: email,
      shipping_address_collection: {
        allowed_countries: ["GB"],
      },
      metadata: {
        firstName,
        lastName,
        address,
        city,
        postcode,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error("Stripe error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
