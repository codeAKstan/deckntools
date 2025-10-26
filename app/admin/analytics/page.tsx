"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, ShoppingCart } from "lucide-react"

// Mock analytics data
const dailyRevenueData = [
  { date: "Oct 1", revenue: 2400, orders: 24, customers: 12 },
  { date: "Oct 2", revenue: 1398, orders: 18, customers: 8 },
  { date: "Oct 3", revenue: 9800, orders: 39, customers: 20 },
  { date: "Oct 4", revenue: 3908, orders: 28, customers: 15 },
  { date: "Oct 5", revenue: 4800, orders: 35, customers: 18 },
  { date: "Oct 6", revenue: 3800, orders: 25, customers: 12 },
  { date: "Oct 7", revenue: 4300, orders: 32, customers: 16 },
]

const productPerformanceData = [
  { name: "Composite Decking", sales: 4200, revenue: 192780 },
  { name: "Wooden Joists", sales: 2800, revenue: 252072 },
  { name: "Fasteners", sales: 6500, revenue: 84435 },
  { name: "Tools", sales: 1200, revenue: 48000 },
  { name: "Finishing", sales: 900, revenue: 27000 },
]

const conversionData = [
  { visitors: 100, conversions: 8 },
  { visitors: 200, conversions: 15 },
  { visitors: 300, conversions: 22 },
  { visitors: 400, conversions: 28 },
  { visitors: 500, conversions: 35 },
  { visitors: 600, conversions: 42 },
  { visitors: 700, conversions: 48 },
]

const topProductsData = [
  { rank: 1, name: "Composite Decking Boards", units: 450, revenue: 20695.5 },
  { rank: 2, name: "Wooden Joists & Beams", units: 312, revenue: 28071.88 },
  { rank: 3, name: "Stainless Steel Fasteners", units: 1200, revenue: 15588 },
  { rank: 4, name: "Power Drill Kit", units: 85, revenue: 4250 },
  { rank: 5, name: "Wood Stain Finish", units: 120, revenue: 3600 },
]

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7days")

  const metrics = [
    {
      title: "Total Revenue",
      value: "£30,408",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Total Orders",
      value: "201",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Conversion Rate",
      value: "6.8%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Avg. Order Value",
      value: "£151.28",
      change: "-1.3%",
      trend: "down",
      icon: TrendingDown,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Detailed business insights and performance metrics</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
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
                    <p className={`text-xs mt-1 ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {metric.change} from previous period
                    </p>
                  </div>
                  <div className={`${metric.trend === "up" ? "bg-green-100" : "bg-red-100"} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Revenue Trend</CardTitle>
            <CardDescription>Revenue and order count over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyRevenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2F5233" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2F5233" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#2F5233" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
            <CardDescription>Sales and revenue by product</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#E67E22" name="Units Sold" />
                <Bar dataKey="revenue" fill="#2F5233" name="Revenue (£)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Visitor to Conversion */}
        <Card>
          <CardHeader>
            <CardTitle>Visitor Conversion Funnel</CardTitle>
            <CardDescription>Relationship between visitors and conversions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="visitors" name="Visitors" />
                <YAxis dataKey="conversions" name="Conversions" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Conversion Rate" data={conversionData} fill="#E67E22" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Orders Trend</CardTitle>
            <CardDescription>Daily order count</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#2F5233" strokeWidth={2} name="Orders" />
                <Line type="monotone" dataKey="customers" stroke="#E67E22" strokeWidth={2} name="New Customers" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
          <CardDescription>Best selling products by revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Rank</th>
                  <th className="text-left py-3 px-4 font-medium">Product Name</th>
                  <th className="text-left py-3 px-4 font-medium">Units Sold</th>
                  <th className="text-left py-3 px-4 font-medium">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {topProductsData.map((product, index) => {
                  const totalRevenue = topProductsData.reduce((sum, p) => sum + p.revenue, 0)
                  const percentage = ((product.revenue / totalRevenue) * 100).toFixed(1)
                  return (
                    <tr key={product.rank} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-medium">#{product.rank}</td>
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">{product.units}</td>
                      <td className="py-3 px-4 font-medium">£{product.revenue.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div className="bg-secondary h-2 rounded-full" style={{ width: `${percentage}%` }} />
                          </div>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
