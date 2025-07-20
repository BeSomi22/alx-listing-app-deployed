// 

import axios from "axios";
import { useState } from "react";

interface BookingDetails {
    propertyName: string;
    price: number;
    bookingFee: number;
    totalNights: number;
    startDate: string;
}

export default function BookingForm({ bookingDetails }: { bookingDetails: BookingDetails }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        billingAddress: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        return (
            formData.firstName &&
            formData.lastName &&
            formData.email &&
            formData.phoneNumber &&
            formData.cardNumber &&
            formData.expirationDate &&
            formData.cvv &&
            formData.billingAddress
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const payload = {
                ...formData,
                booking: bookingDetails,
            };

            await axios.post("/api/bookings", payload);
            setSuccess(true);
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                cardNumber: "",
                expirationDate: "",
                cvv: "",
                billingAddress: "",
            });
        } catch (err) {
            console.error(err);
            setError("Failed to submit booking.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">Guest Information</h2>
            <div className="grid grid-cols-2 gap-4">
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="p-2 border rounded" />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="p-2 border rounded" />
            </div>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded" />

            <h2 className="text-xl font-semibold mt-6 mb-2">Payment Details</h2>
            <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} className="w-full p-2 border rounded" />
            <div className="grid grid-cols-2 gap-4">
                <input type="text" name="expirationDate" placeholder="MM/YY" value={formData.expirationDate} onChange={handleChange} className="p-2 border rounded" />
                <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} className="p-2 border rounded" />
            </div>
            <input type="text" name="billingAddress" placeholder="Billing Address" value={formData.billingAddress} onChange={handleChange} className="w-full p-2 border rounded" />

            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                {loading ? "Processing..." : "Confirm & Pay"}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-600 mt-2">Booking confirmed!</p>}
        </form>
    );
}
