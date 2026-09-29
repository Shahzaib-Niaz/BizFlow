import {
  CheckSquare,
  DollarSign,
  ShoppingCart,
  Users,
} from "lucide-react";

import StatCard from "../ui/StatCard";
import RevenueChart from "../dashboard/RevenueChart";
import RecentOrders from "../dashboard/RecentOrders";

import { customers } from "../data/Customers";
import { orders } from "../data/orders";
import { tasks } from "../data/Tasks";

function Dashboard() {
  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((total, order) => total + order.total, 0);

  const totalOrders = orders.length;

  const totalCustomers = customers.length;

  const activeTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString(),
      change: "+8.2%",
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      value: totalCustomers.toLocaleString(),
      change: "+5.4%",
      icon: Users,
    },
    {
      title: "Active Tasks",
      value: activeTasks.toLocaleString(),
      change: "+3.1%",
      icon: CheckSquare,
    },
  ];

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Here's what's happening with your business today.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <RecentOrders />
      </div>
    </div>
  );
}

export default Dashboard;