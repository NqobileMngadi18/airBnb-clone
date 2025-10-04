import { useState } from "react";

function Createlisting() {
    const [formData, setFormData] = useState ({
        title: "",
        description: "",
        price: "",
        image: ""
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/api/listings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        console.log("Listing created successfully:", data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="Listing Name" placeholder="Title" onChange={handleChange} Listing Name />
            <input name="Rooms" type="number" onChange={handleChange} />
            <input name="Baths" type="number" placeholder="Price" onChange={handleChange} />
            <input name="location" placeholder="" onChange={handleChange} />
            <input name="location" placeholder="" onChange={handleChange} />
            <input name="description" placeholder="" onChange={handleChange}/>
            <input name="amenities" placeholder="" onChange={handleChange} />
            <input name="image" placeholder="Image URL" onChange={handleChange} />
            <button type="submit">Create Listing</button>
            <button type="submit">Cancel</button>
        </form>
    );
}

export default Createlisting;