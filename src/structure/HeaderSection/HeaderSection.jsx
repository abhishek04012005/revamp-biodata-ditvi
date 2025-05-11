import React from 'react'
import './HeaderSection.css'

const HeaderSection = ({ title, subtitle }) => {
    return (
        <>
            <div className="heading-section">

                <span className="header-section-design-element"></span>

                <div className="heading-section-text">
                    <p>{title}</p>
                </div>

                <span className="header-section-design-element"></span>

             

            </div>
            <div className="header-section-subtitle">
                    <p>{subtitle}</p>
                </div>



        </>
    )
}

export default HeaderSection