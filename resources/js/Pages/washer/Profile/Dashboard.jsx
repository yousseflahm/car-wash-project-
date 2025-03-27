import SummaryCard from "@/Components/SummaryCard";
import WasherAuthentificatedLayout from "@/Layouts/WasherLayout";
import WasherChart from "@/Components/WasherTrendBooking";
import { Head } from "@inertiajs/react";
import { MdOutlineDownloadDone } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";

export default function Dashboard({
    CurrentBookings,
    PendingBookings,
    CompletedBookings,
    chartData,
}) {
    const SummaryData = [
        {
            title: "Current Bookings",
            value: CurrentBookings,
            icon: FaClipboardList,
        },
        {
            title: "Pending Bookings",
            value: PendingBookings,
            icon: MdPendingActions,
        },
        {
            title: "Completed Bookings",
            value: CompletedBookings,
            icon: MdOutlineDownloadDone,
        },
    ];

    return (
        <WasherAuthentificatedLayout>
            <Head title="Washer  Dashboard" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {SummaryData.map((data, index) => (
                    <SummaryCard
                        key={index}
                        title={data.title}
                        value={data.value}
                        Icon={data.icon}
                    />
                ))}
            </div>

            <div className="mt-4 w-[500px] "  >
                <WasherChart chartData={chartData} />
            </div>
        </WasherAuthentificatedLayout>
    );
}
