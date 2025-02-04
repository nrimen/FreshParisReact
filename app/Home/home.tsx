import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Home.css";

const Home = () => {
    const [search, setSearch] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const openModal = (item: any) => {
        setSelectedItem(item);
    };


    return (
        <div>
            <section
                className="hero text-center bg-cover"
                style={{ backgroundImage: "url('/assets/images/img_6.png')" }}
            >
                <div className="home-container">
                    <input
                        type="text"
                        className="form-control search-input"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search for equipment, green space, or fountain"
                    />
                </div>

                <h1 className="mt-24 text-white text-5xl font-bold mb-12">Discover the Green Heart of Paris</h1>
                <p className="hero-subtitle">Explore our wide range of</p>
                <p className="hero-subtitle">
                    green spaces, fountains, and essential urban equipment.
                </p>
                <div className="buttons">
                    <a href="/some-link" className="button">
                        Learn More
                    </a>
                    <a href="/another-link" className="button">
                        Get Started
                    </a>
                </div>
            </section>

            <section className="features-section text-center">
                <h2 className="section-title">What We Offer</h2>
                <div className="feature-cards">
                    <a href="/green-spaces" className="feature-card">
                        <i className="fa fa-tree"></i>
                        <h3>Green Spaces</h3>
                        <p>Discover lush parks and gardens around the city.</p>
                    </a>
                    <a href="/fontaines" className="feature-card">
                        <i className="fa fa-tint"></i>
                        <h3>Fountains</h3>
                        <p>Explore the beautiful water features scattered across Paris.</p>
                    </a>
                    <a href="/equipements" className="feature-card">
                        <i className="fa fa-tools"></i>
                        <h3>Equipment</h3>
                        <p>Find essential public equipment like benches and recycling bins.</p>
                    </a>
                </div>
            </section>

            <section className="testimonial-section text-center">
                <h2 className="section-title">What People Are Saying</h2>
                <div className="testimonial-cards">
                    <div className="testimonial-card">
                        <p>"This platform helped me find amazing green spaces to relax in Paris!"</p>
                        <p><strong>- Emma</strong></p>
                    </div>
                    <div className="testimonial-card">
                        <p>"The fountains map is a life-saver on hot days. Such a great idea!"</p>
                        <p><strong>- Lucas</strong></p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
