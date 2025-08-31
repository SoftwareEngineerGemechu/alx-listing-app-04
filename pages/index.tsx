import axios from "axios";
import { useEffect, useState } from "react";
import PropertyCard from "@/components/property/PropertyCard";

interface Property {
    id: number;
    title: string;
    location: string;
    price: number;
    image: string;
}

export default function Home() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get("/api/properties"); // backend API endpoint
                setProperties(response.data);
            } catch (err: any) {
                console.error("Error fetching properties:", err);
                setError("Failed to fetch properties. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center mt-10">{error}</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>
    );
}
