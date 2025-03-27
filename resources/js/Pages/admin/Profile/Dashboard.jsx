import AdminAuthenticatedLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { DollarSign, Users } from "lucide-react";
import SummaryCard from "@/Components/SummaryCard";

import BookingTrendsChart from "@/Components/BookingTrendsChart";
import TopUsers from "@/Components/TopUsers";
import TopServices from "@/Components/TopServices";

export default function Dashboard({
    totalRevenue,
    todayRevenue,
    totalClients,
    percentageClientLastMonth,
    bookingTrends , 
    topUsers ,
    topServices
}) {
    console.log(
        totalRevenue,
        todayRevenue,
        totalClients,
        percentageClientLastMonth
    );

    const SummaryData = [
        {
            title: "Total Revenue",
            value: totalRevenue,
            icon: DollarSign,
            footerValue: "",
        },
        {
            title: "Today Revenue",
            value: todayRevenue,
            icon: DollarSign,
            footerValue: "",
        },
        {
            title: "Total Clients",
            value: totalClients,
            icon: Users,
            footerValue: 17.22 || "",
        },
    ];


    const fakeBookingTrends = [
        { month: "2024-9", bookings: 120 },
        { month: "2024-10", bookings: 150 },
        { month: "2024-11", bookings: 180 },
        { month: "2024-12", bookings: 90 },
        { month: "2025-1", bookings: 210 },
        { month: "2025-2", bookings: 240 },
      ];

    return (
        <AdminAuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {SummaryData.map((item) => (
                    <SummaryCard
                        key={item.title}
                        title={item.title}
                        value={item.value}
                        Icon={item.icon}
                        footerValue={item.footerValue}
                    />
                ))}
            </div>
            <div className="mt-6    grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <BookingTrendsChart bookingTrends={fakeBookingTrends}   />
                <TopUsers topUsers={topUsers} />
            </div>
            <div className="mt-5">
                <TopServices topServices={topServices} />
            </div>
        </AdminAuthenticatedLayout>
    );
}
