import React from 'react';
import './Loader.css';

const Loader = () => {
    // if (!isLoading) return null;

    return (
        <div className="loader-container">
            <div className="loader-content">
                <div className="loader-animation">
                    <div className="loader-rings">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="loader-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="loader-text">
                    <span>P</span>
                    <span>l</span>
                    <span>e</span>
                    <span>a</span>
                    <span>s</span>
                    <span>e</span>
                    <span>&nbsp;</span>
                    <span>w</span>
                    <span>a</span>
                    <span>i</span>
                    <span>t</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </div>
            </div>
        </div>
    );
};

export default Loader;