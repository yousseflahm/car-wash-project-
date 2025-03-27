<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
          
            margin: 0;
            padding: 0;
        }

        .invoice-container {
            max-width: 800px;
            margin: 2rem auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 2rem;
        }

        .invoice-header {
            text-align: center;
            margin-bottom: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

        }

        .invoice-header img {
            max-width: 150px;
            margin-bottom: 1rem;
        }

        .invoice-header h1 {
            font-size: 1rem;
            color: #3182ce;
            margin: 0;
        }

        .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1.5rem;
        }

        .invoice-table thead {
            background-color: #ebf8ff;
        }

        .invoice-table th,
        .invoice-table td {
            padding: 12px 16px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }

        .invoice-table th {
            font-weight: 600;
            color: #4a5568;
            text-transform: uppercase;
            font-size: 0.875rem;
        }

        .invoice-table td {
            color: #4a5568;
            font-size: 0.875rem;
        }

        .status-badge {
            display: inline-block;
            padding: 4px 8px;
            font-size: 0.75rem;
            font-weight: 600;
            border-radius: 12px;
            background-color: #ebf8ff;
            color: #3182ce;
        }

        .service-list {
            list-style-type: disc;
            padding-left: 1.5rem;
            margin: 0;
        }

        .service-list li {
            margin-bottom: 4px;
        }

        .invoice-footer {
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            font-size: 0.875rem;
            color: #4a5568;
        }

        .invoice-footer p {
            margin: 0.5rem 0;
        }

        .invoice-footer a {
            color: #3182ce;
            text-decoration: none;
        }

        .invoice-footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <!-- Invoice Header -->
        <div class="invoice-header">
            <img src="{{ public_path('CarWashLogo.svg') }}" alt="Glow Wash Logo">
            <h1>Booking Invoice</h1>
        </div>

        <!-- Invoice Table -->
        <table class="invoice-table">
            <thead>
                <tr>
                    <th>Booking ID</th>
                    <th>Car</th>
                    <th>Status</th>
                    <th>Services</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $booking['id'] }}</td>
                    <td>{{ $booking['car'] }}</td>
                    <td>
                        <span class="status-badge">{{ $booking['status'] }}</span>
                    </td>
                    <td>
                        <ul class="service-list">
                            @foreach ($booking['services'] as $service)
                                <li>{{ $service['name'] }}</li>
                            @endforeach
                        </ul>
                    </td>
                    <td>${{ number_format($totalPrice, 2) }}</td>
                </tr>
            </tbody>
        </table>

        <!-- Invoice Footer -->
        <div class="invoice-footer">
            <p>Address: Casablanca, Oulfa</p>
            <p>Telephone: <a href="tel:0766229899">0766229899</a></p>
            <p>Website: <a href="https://glowWash.com" target="_blank">glowWash.com</a></p>
            <p>Email: <a href="mailto:contact@glowwash.ma">contact@glowwash.ma</a></p>
            <p>&copy; {{ date('Y') }} Glow Wash. All rights reserved.</p>
        </div>
    </div>
</body>
</html>