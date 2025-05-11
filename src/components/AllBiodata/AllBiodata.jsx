import React from 'react'
import './AllBiodata.css'
import BiodataCard from '../../structure/BiodataCards/BiodataCard'
import biodataList from '../../json/biodataDetails'

const AllBiodata = () => {
    return (
        <>
            <div className="allbiodata">
                <BiodataCard
                className='all-biodata-inner'
                    title="biodata"
                    subtitle="Discover our handcrafted traditional biodata designs"
                    biodataDetails={biodataList}
                    isSlider={false}
                />
            </div>
        </>
    )
}

export default AllBiodata