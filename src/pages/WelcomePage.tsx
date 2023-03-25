import React from "react";
import { Link } from "react-router-dom";

export default function WelcomePage() {
    return (
        <div className="welcome-container">
            <div className="welcome-navbar"></div>
            <div className="welcome-main">
                <Link to="/signup" className="welcome-link">
                    Sign Up
                </Link>
                <Link to="/login" className="welcome-link">
                    Log In
                </Link>
            </div>
        </div>
    );
}
