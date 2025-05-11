import React from 'react'
import './Background.css'

const Background = (props) => {
    return (
        <>
            <section className="background">
                <div className="background-inner">
                    <div className="background-circle circle-1"></div>
                    <div className="background-circle circle-2"></div>
                </div>
                {props.children}
            </section>
        </>
    )
}

export default Background