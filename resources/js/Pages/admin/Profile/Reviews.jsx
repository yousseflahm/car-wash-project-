import React from "react";
import AdminAuthenticatedLayout from "@/Layouts/AdminLayout";

export default function Reviews({ reviews }) {
    const renderStars = (rating) => {
        return [1, 2, 3, 4, 5].map((star) => (
            <svg
                key={star}
                className={`w-6 h-6 ms-2 ${
                    star <= rating ? "text-yellow-300" : "text-gray-300"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
        ));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return (
        <AdminAuthenticatedLayout>
            <h1 className="text-2xl font-bold mb-6">Reviews</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div
                            key={review.id_review}
                            className="bg-white shadow-md rounded-lg p-6 mb-6"
                        >
                            <p className="text-lg font-semibold mb-2">
                                <strong>User:</strong> {review.user_name}
                            </p>
                            <p className="mb-2">
                                <strong>Rating:</strong>{" "}
                                <span className="flex items-center">
                                    {renderStars(review.rating)}
                                </span>
                            </p>
                            <p className="mb-2">
                                <strong>Comment:</strong>{" "}
                                {review.comment || "No comment provided"}
                            </p>
                            <p className="text-sm text-gray-500">
                                <strong>Date:</strong>{" "}
                                {formatDate(review.created_at)}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No reviews found.</p>
                )}
            </div>
        </AdminAuthenticatedLayout>
    );
}
