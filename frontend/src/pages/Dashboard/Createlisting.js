import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../Dashboard/Dashboard.css";

function Createlisting() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        description: "",
        bedrooms: "",
        bathrooms: "",
        guests: "",
        type: "",
        price: "",
        amenities: [],
        images: [],
        weeklyDiscount: "",
        cleaningFee: "",
        serviceFee: "",
        occupancyTaxes: ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Check if user is logged in, if not redirect to login
    useEffect(() => {
        if (!user) {
            localStorage.setItem('redirectAfterLogin', '/dashboard/create-listing');
            navigate('/login');
        }
    }, [user, navigate]);

    // Don't render the form if user is not logged in
    if (!user) {
        return (
            <div>
                <Header />
                <div className="loading-container">
                    <p>Redirecting to login...</p>
                </div>
                <Footer />
            </div>
        );
    }

    const propertyTypes = [
        "Entire place",
        "Private room",
        "Shared room",
        "Hotel room"
    ];

    const availableAmenities = [
        "WiFi", "Kitchen", "Washer", "Dryer", "Air conditioning",
        "Heating", "Dedicated workspace", "TV", "Hair dryer",
        "Iron", "Pool", "Hot tub", "Free parking", "Gym",
        "Breakfast", "Smoking allowed", "Pets allowed"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleAmenityChange = (amenity) => {
        const updatedAmenities = formData.amenities.includes(amenity)
            ? formData.amenities.filter(a => a !== amenity)
            : [...formData.amenities, amenity];

        setFormData({ ...formData, amenities: updatedAmenities });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        // In a real app, you'd upload to a service like AWS S3
        // For now, we'll create temporary URLs
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setFormData({ ...formData, images: [...formData.images, ...imageUrls] });
    };

    const removeImage = (index) => {
        const updatedImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: updatedImages });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.location.trim()) newErrors.location = "Location is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.bedrooms || formData.bedrooms < 1) newErrors.bedrooms = "At least 1 bedroom is required";
        if (!formData.bathrooms || formData.bathrooms < 1) newErrors.bathrooms = "At least 1 bathroom is required";
        if (!formData.guests || formData.guests < 1) newErrors.guests = "At least 1 guest is required";
        if (!formData.type) newErrors.type = "Property type is required";
        if (!formData.price || formData.price < 1) newErrors.price = "Price per night is required";
        if (formData.images.length === 0) newErrors.images = "At least one image is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:5000/api/accommodations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Listing created successfully:", data);
                alert("Listing created successfully!");
                navigate("/dashboard");
            } else {
                throw new Error("Failed to create listing");
            }
        } catch (error) {
            console.error("Error creating listing:", error);
            alert("Error creating listing. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate("/dashboard");
    };

    return (
        <div className="dashboard-container">
            <Header />

            <div className="dashboard-header">
                <div className="dashboard-header-content">
                    <div>
                        <h1 className="dashboard-title">Create New Listing</h1>
                        <p className="dashboard-subtitle">Add a new property to your hosting portfolio</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <form onSubmit={handleSubmit} className="dashboard-form">
                    {/* Basic Information */}
                    <div className="form-section">
                        <h2 className="form-section-title">Basic Information</h2>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Property Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="e.g., Cozy apartment in downtown"
                                />
                                {errors.title && <span className="error-message">{errors.title}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Location *</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="e.g., New York, NY"
                                />
                                {errors.location && <span className="error-message">{errors.location}</span>}
                            </div>
                        </div>

                        <div className="form-group form-group-full">
                            <label className="form-label">Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="form-input"
                                rows="4"
                                placeholder="Describe your property in detail..."
                            />
                            {errors.description && <span className="error-message">{errors.description}</span>}
                        </div>
                    </div>

                    {/* Property Details */}
                    <div className="form-section">
                        <h2 className="form-section-title">Property Details</h2>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Property Type *</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="form-input"
                                >
                                    <option value="">Select property type</option>
                                    {propertyTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                {errors.type && <span className="error-message">{errors.type}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Max Guests *</label>
                                <input
                                    type="number"
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    className="form-input"
                                    min="1"
                                    placeholder="1"
                                />
                                {errors.guests && <span className="error-message">{errors.guests}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Bedrooms *</label>
                                <input
                                    type="number"
                                    name="bedrooms"
                                    value={formData.bedrooms}
                                    onChange={handleChange}
                                    className="form-input"
                                    min="1"
                                    placeholder="1"
                                />
                                {errors.bedrooms && <span className="error-message">{errors.bedrooms}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Bathrooms *</label>
                                <input
                                    type="number"
                                    name="bathrooms"
                                    value={formData.bathrooms}
                                    onChange={handleChange}
                                    className="form-input"
                                    min="1"
                                    step="0.5"
                                    placeholder="1"
                                />
                                {errors.bathrooms && <span className="error-message">{errors.bathrooms}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="form-section">
                        <h2 className="form-section-title">Pricing</h2>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Price per Night ($) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="form-input"
                                    min="1"
                                    placeholder="100"
                                />
                                {errors.price && <span className="error-message">{errors.price}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Weekly Discount (%)</label>
                                <input
                                    type="number"
                                    name="weeklyDiscount"
                                    value={formData.weeklyDiscount}
                                    onChange={handleChange}
                                    className="form-input"
                                    min="0"
                                    max="50"
                                    placeholder="10"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Cleaning Fee ($)</label>
                                <input
                                    type="number"
                                    name="cleaningFee"
                                    value={formData.cleaningFee}
                                    onChange={handleChange}
                                    className="form-input"
                                    min="0"
                                    placeholder="50"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Service Fee ($)</label>
                                <input
                                    type="number"
                                    name="serviceFee"
                                    value={formData.serviceFee}
                                    onChange={handleChange}
                                    className="form-input"
                                    min="0"
                                    placeholder="25"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Occupancy Taxes ($)</label>
                                <input
                                    type="number"
                                    name="occupancyTaxes"
                                    value={formData.occupancyTaxes}
                                    onChange={handleChange}
                                    className="form-input"
                                    min="0"
                                    placeholder="15"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="form-section">
                        <h2 className="form-section-title">Amenities</h2>
                        <div className="amenities-grid">
                            {availableAmenities.map(amenity => (
                                <label key={amenity} className="amenity-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={formData.amenities.includes(amenity)}
                                        onChange={() => handleAmenityChange(amenity)}
                                    />
                                    <span className="checkmark"></span>
                                    {amenity}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Images */}
                    <div className="form-section">
                        <h2 className="form-section-title">Images *</h2>
                        <div className="image-upload-area">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="image-upload-input"
                                id="imageUpload"
                            />
                            <label htmlFor="imageUpload" className="image-upload-label">
                                <div className="upload-icon">📷</div>
                                <p>Click to upload images</p>
                                <p className="upload-subtitle">Choose multiple images (JPG, PNG)</p>
                            </label>
                        </div>

                        {errors.images && <span className="error-message">{errors.images}</span>}

                        {formData.images.length > 0 && (
                            <div className="image-preview-grid">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="image-preview">
                                        <img src={image} alt={`Preview ${index + 1}`} />
                                        <button
                                            type="button"
                                            className="image-remove"
                                            onClick={() => removeImage(index)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="btn-secondary"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating..." : "Create Listing"}
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
}

export default Createlisting;