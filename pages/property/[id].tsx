import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import PropertyDetail from "@/components/property/PropertyDetail";

export default function PropertyDetailPage() {
    const router = useRouter();
    const { id } = router.query;

    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperty = async () => {
            if (!id) return; // wait until id is available

            try {
                setLoading(true);
                const response = await axios.get(`/api/properties/${id}`);
                setProperty(response.data);
            } catch (err) {
                console.error("Error fetching property details:", err);
                setError("Failed to load property details");
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 mt-10">{error}</p>;
    }

    if (!property) {
        return <p className="text-center mt-10">Property not found</p>;
    }

    return <PropertyDetail property={property} />;
}
