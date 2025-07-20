import axios from "axios";
import { useState, useEffect } from "react";
import Image from 'next/image';

interface Review {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    comment: string;
}

const ReviewSection: React.FC<{ propertyId: string }> = ({ propertyId }) => {
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

        if (propertyId) fetchReviews();
    }, [propertyId]);

    if (loading) return <p className="text-gray-500">Loading reviews...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (reviews.length === 0) return <p className="text-gray-500">No reviews yet.</p>;

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
            {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 mb-4">
                    <div className="flex items-center mb-2">
                        <Image
                            src={review.avatar}
                            alt={review.name}
                            width={48}
                            height={48}
                            className="rounded-full mr-4 object-cover"
                        />
                        <div>
                            <p className="font-bold">{review.name}</p>
                            <p className="text-yellow-500">{review.rating} stars</p>
                        </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewSection;
