import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/Components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

// Define the chart configuration
const chartConfig = {
    completed: {
        label: "Completed Bookings",
        color: "hsl(var(--chart-1))",
    },
};

export default function WasherChart({ chartData }) {
    // Map day numbers to day names
    const dayNames = {
        1: "Sunday",
        2: "Monday",
        3: "Tuesday",
        4: "Wednesday",
        5: "Thursday",
        6: "Friday",
        7: "Saturday",
    };

    // Format the chart data to include day names
    const formattedChartData = chartData.map((item) => ({
        ...item,
        day: dayNames[item.day], // Replace day number with day name
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Completed Bookings</CardTitle>
                <CardDescription>
                    Showing completed bookings for each day of the week
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        width={600} // Set a fixed width or make it responsive
                        height={200} // Set height to 200px
                        data={formattedChartData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                        accessibilityLayer
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="day" // Use "day" as the data key
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)} // Shorten day names (e.g., "Sunday" => "Sun")
                        />
                        <Tooltip
                            cursor={{
                                stroke: "hsl(var(--chart-1))",
                                strokeWidth: 2,
                            }}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="completed"
                            type="natural"
                            stroke="hsl(var(--chart-1))"
                            fill="hsl(var(--chart-1))"
                            fillOpacity={0.4}
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this week{" "}
                            <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Sunday - Saturday
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
