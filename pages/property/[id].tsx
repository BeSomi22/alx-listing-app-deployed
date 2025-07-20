// pages/property/[id].tsx
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import PropertyDetail from "@/components/property/PropertyDetail";
import { PropertyProps } from "@/interfaces";

export default function PropertyDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const [property, setProperty] = useState<PropertyProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            if (!id) return;

            setLoading(true);
            setError(false);

            try {
                const response = await axios.get(`/${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${id}`);
                setProperty(response.data);
            } catch (err) {
                console.error("Error fetching property:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">Failed to load property.</p>;
    if (!property) return <p className="text-center mt-10">Property not found.</p>;

    return <PropertyDetail property={property} />;
}
