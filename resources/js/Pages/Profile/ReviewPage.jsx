import { useState } from "react";
import ClientAthentificatedLayout from "@/Layouts/ClientLayout";
import { useForm, usePage } from "@inertiajs/react";

export default function ReviewPage({ auth }) {
    const userId = auth.user.id;

    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        user_id: userId,
        rating: 0,
        comment: "",
    });

    const [hoverRating, setHoverRating] = useState(0);

    // Handle rating change
    const handleRatingChange = (newRating) => {
        setData("rating", newRating);
    };

    // Handle mouse enter for hover effect
    const handleMouseEnter = (newHoverRating) => {
        setHoverRating(newHoverRating);
    };

    // Handle mouse leave for hover effect
    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    // Handle review submission
    const handleReviewSubmit = () => {
        post(route("ReviewPage.post"));
        setData("rating", 0);
        setData("comment", "");
    };

    return (
        <ClientAthentificatedLayout>
            <h1 className="text-2xl font-bold mb-5">Review Page</h1>

            {/* Display flash message if it exists */}
            {flash.success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-5">
                    {flash.success}
                </div>
            )}

            <div className="mb-5">
                <h2 className="text-lg font-semibold mb-2">
                    Rate your experience:
                </h2>
                <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                            key={star}
                            className={`w-6 h-6 ms-2 cursor-pointer ${
                                star <= (hoverRating || data.rating)
                                    ? "text-yellow-300"
                                    : "text-gray-300 dark:text-gray-500"
                            }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                            onClick={() => handleRatingChange(star)}
                            onMouseEnter={() => handleMouseEnter(star)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                    ))}
                </div>
                {errors.rating && (
                    <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
                )}
            </div>
            <div className="mb-5">
                <h2 className="text-lg font-semibold mb-2">
                    Write your review:
                </h2>
                <textarea
                    value={data.comment}
                    onChange={(e) => setData("comment", e.target.value)}
                    placeholder="Write your review here..."
                    rows={4}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                {errors.comment && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.comment}
                    </p>
                )}
            </div>
            <button
                onClick={handleReviewSubmit}
                disabled={processing}
                className="px-4 py-2 bg-blue-300 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {processing ? "Submitting..." : "Submit Review"}
            </button>
        </ClientAthentificatedLayout>
    );
}
