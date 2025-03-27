import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
  } from "@/components/ui/card";
  import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
  
  export default function TopServices({ topServices }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Services</CardTitle>
          <CardDescription>Most used services</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Total Bookings</TableHead>
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