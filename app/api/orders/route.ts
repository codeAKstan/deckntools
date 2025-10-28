import { NextResponse, type NextRequest } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Order from '@/models/Order'

function generateOrderId() {
  const ts = Date.now().toString().slice(-6)
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `ORD-${ts}-${rand}`
}

export async function GET(request: NextRequest) {
  await connectToDatabase()
  const orderId = request.nextUrl.searchParams.get('orderId')
  if (orderId) {
    const order = await Order.findOne({ orderId })
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    return NextResponse.json(order)
  }
  const orders = await Order.find({}).sort({ createdAt: -1 })
  return NextResponse.json(orders)
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()
    const body = await request.json()
    const { items, email, firstName, lastName, address, city, postcode } = body
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }
    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    const shipping = subtotal > 500 ? 0 : 15
    const tax = subtotal * 0.2
    const amount = Number((subtotal + shipping + tax).toFixed(2))

    const orderId = generateOrderId()
    const order = await Order.create({
      orderId,
      email,
      firstName,
      lastName,
      address,
      city,
      postcode,
      amount,
      status: 'processing',
      items: items.map((i: any) => ({ name: i.name, quantity: i.quantity, price: i.price, image: i.image })),
    })

    return NextResponse.json({ orderId, order })
  } catch (e) {
    console.error('Order create error:', e)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectToDatabase()
    const body = await request.json()
    const { orderId, status } = body
    if (!orderId || !status) return NextResponse.json({ error: 'orderId and status are required' }, { status: 400 })
    const order = await Order.findOneAndUpdate({ orderId }, { status }, { new: true })
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    return NextResponse.json(order)
  } catch (e) {
    console.error('Order update error:', e)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}