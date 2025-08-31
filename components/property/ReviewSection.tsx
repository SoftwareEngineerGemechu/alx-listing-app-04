// components/property/ReviewSection.tsx

import axios from "axios";
import { useState, useEffect } from "react";

interface Review {
    id: number;
    comment: string;
    rating?: number;
    user?: {
        name: string;
    };
}

interface ReviewSectionProps {
    propertyId: string | number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ propertyId }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/api/properties/${propertyId}/reviews`);
                setReviews(response.data);
            } catch (err) {
                console.error("Error fetching reviews:", err);
                setError("Failed to load reviews.");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [propertyId]);

    if (loading) {
        return <p className="text-gray-500">Loading reviews...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (reviews.length === 0) {
        return <p className="text-gray-600">No reviews yet.</p>;
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <div key={review.id} className="p-4 border rounded-lg shadow-sm">
                    <p className="text-gray-800">{review.comment}</p>
                    {review.rating && (
                        <p className="text-yellow-500">⭐ {review.rating}/5</p>
                    )}
                    {review.user && (
                        <p className="text-sm text-gray-500">- {review.user.name}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ReviewSection;
