"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react"

// Mock data
const revenueData = [
  { month: "Jan", revenue: 4000, orders: 24 },
  { month: "Feb", revenue: 3000, orders: 18 },
  { month: "Mar", revenue: 2000, orders: 12 },
  { month: "Apr", revenue: 2780, orders: 39 },
  { month: "May", revenue: 1890, orders: 28 },
  { month: "Jun", revenue: 2390, orders: 35 },
]

const categoryData = [
  { name: "Decking Materials", value: 45, fill: "#4B3B2A" },
  { name: "Tools", value: 25, fill: "#2F5233" },
  { name: "Fasteners", value: 20, fill: "#E67E22" },
  { name: "Other", value: 10, fill: "#F9F9F9" },
]

const metrics = [
  {
    title: "Total Revenue",
    value: "£14,060",
    change: "+12.5%",
    icon: DollarSign,
    color: "bg-secondary",
  },
  {
    title: "Total Orders",
    value: "156",
    change: "+8.2%",
    icon: ShoppingCart,
    color: "bg-accent",
  },
  {
    title: "Total Customers",
    value: "89",
    change: "+5.1%",
    icon: Users,
    color: "bg-primary",
  },
  {
    title: "Growth Rate",
    value: "23.5%",
    change: "+4.3%",
    icon: TrendingUp,
    color: "bg-secondary",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold mt-2">{metric.value}</p>
                    <p className="text-xs text-green-600 mt-1">{metric.change} from last month</p>
                  </div>
                  <div className={`${metric.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue & Orders</CardTitle>
            <CardDescription>Monthly revenue and order count</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#2F5233" name="Revenue (£)" />
                <Bar dataKey="orders" fill="#E67E22" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Product category breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: "ORD-001", customer: "John Smith", amount: "£450", status: "Completed", date: "2025-10-24" },
              { id: "ORD-002", customer: "Sarah Johnson", amount: "£320", status: "Processing", date: "2025-10-23" },
              { id: "ORD-003", customer: "Mike Davis", amount: "£680", status: "Shipped", date: "2025-10-22" },
              { id: "ORD-004", customer: "Emma Wilson", amount: "£245", status: "Pending", date: "2025-10-21" },
            ].map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.amount}</p>
                  <p
                    className={`text-xs font-medium ${
                      order.status === "Completed"
                        ? "text-green-600"
                        : order.status === "Processing"
                          ? "text-blue-600"
                          : order.status === "Shipped"
                            ? "text-purple-600"
                            : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
