import React from 'react'
import BiodataCard from '../../structure/BiodataCards/BiodataCard'
import biodataList from '../../json/biodataDetails'

const BiodataHome = () => {
    return (
        <>
            <div className="biodata">
                <BiodataCard
                    title="biodata"
                    subtitle="Discover our handcrafted traditional biodata designs"
                    biodataDetails={biodataList}
                    isSlider={true} 
                />
            </div>
        </>
    )
}

export default BiodataHome