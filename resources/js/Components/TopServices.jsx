import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
  } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { usePage } from "@inertiajs/react";
  export default function TopServices({ topServices }) {
    const { translations } = usePage().props;
    const t = translations.messages;
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t.TopServices}</CardTitle>
          <CardDescription>{t.mostUsed}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.services}</TableHead>
                <TableHead>{t.TotalBookings}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topServices.map((service) => (
                <TableRow key={service.id_service}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.total_bookings}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }