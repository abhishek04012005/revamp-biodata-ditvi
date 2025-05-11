import React from 'react'
import Hero from './Hero/Hero'
import BiodataHome from './BiodataHome/BiodataHome'
import WhyUs from './WhyUs/WhyUs'
import WeWork from './WeWork/WeWork'
import ContactUs from './ContactUs/ContactUs'
import BlogHome from './BlogHome/BlogHome'
import Testimonial from './Testimonial/Testimonial'
import BlogDetail from './BlogDetail/BlogDetail'

const Main = () => {
    return (
        <>

            <Hero />
            {/* <BlogDetail/> */}
            <BiodataHome />
            <WhyUs />
            <WeWork />
            <BlogHome />
            <Testimonial />
            <ContactUs />
        </>
    )
}

export default Main