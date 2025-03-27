import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
} from "./ui/Card";

export default function SummaryCard({ title, value, Icon, footerValue }) {
    return (
        <Card className="bg-white shadow-md rounded-lg px-4">
            <CardHeader className="flex flex-row  items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>

            <CardContent>
                <div className="text-2xl font-bold">
                    {title.includes("Revenue") ? `$${value}` : value}
                </div>
                {footerValue && (
                    <p className="text-xs text-muted-foreground">
                        {footerValue > 0 ? "↑" : "↓"} {Math.abs(footerValue)} % from last month
                    </p>
                )}
            </CardContent>
        </Card>
    );
}