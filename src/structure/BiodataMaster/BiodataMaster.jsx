import React from 'react'
import './BiodataMaster.css'
import BackgroundBiodata1111 from '../../assets/background/1111.svg'
import { Work, School, People, ContactPhone } from '@mui/icons-material'
import AdminHeader from '../../components/Admin/AdminHeader/AdminHeader'

const BiodataMaster = () => {
    return (
        <>
            <div className="biodata-master">
                <AdminHeader />
                <div className="biodata-master-biodata-page">
                    <div
                        className="biodata-master-a4-container"
                        style={{
                            backgroundImage: `url(${BackgroundBiodata1111})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',

                        }}
                    >

                        <div className="biodata-master-biodata-content">
                            {/* Personal Section */}
                            <div className="biodata-master-personal-section">
                                <div className="biodata-master-photo-section">
                                    <div className="biodata-master-photo-frame">
                                        <img
                                            src=""
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="biodata-master-name-text">
                                        <h3>Stark</h3>
                                    </div>
                                </div>
                                {/* Personal Information  */}
                                <div className="biodata-master-personal-info">
                                    <table className="biodata-master-bio-table personal-table">
                                        <tbody>
                                            <tr>
                                                <th className="biodata-master-personal-icon-alignment">
                                                    Religion
                                                </th>
                                                <th>
                                                    Hindu
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* Professional Section  */}
                            <div className="biodata-master-section professional-table">
                                <div className="biodata-master-section-title">
                                    <span className="biodata-master-flex-section">
                                        <Work className='biodata-master-section-icon' />
                                        <h3>Professional Details</h3>
                                    </span>
                                </div>
                                <table className="biodata-master-bio-table">
                                    <tbody>
                                        <tr>
                                            <th>Company Name</th>
                                            <th>Position</th>
                                            <th>Years of Experience</th>
                                            <th>Salary</th>
                                        </tr>
                                        <tr>
                                            <td>Google</td>
                                            <td>Manager</td>
                                            <td>3+</td>
                                            <td>12 LPA</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Education Details  */}
                            <div className="biodata-master-section education-section">
                                <div className="biodata-master-section-title">
                                    <span className="biodata-master-flex-section">
                                        <School className='biodata-master-section-icon' />
                                        <h3>Education Details</h3>
                                    </span>
                                </div>
                                <table className="biodata-master-bio-table">
                                    <thead>
                                        <tr>
                                            <th>Degree</th>
                                            <th>Institution</th>
                                            <th>Year</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>B.Sc</td>
                                            <td>Patna University</td>
                                            <td>2018</td>
                                            <td>89%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Family Section  */}

                            <div className="biodata-master-section family-section">
                                <div className="biodata-master-section-title">
                                    <span className="biodata-master-flex-section">
                                        <People className='biodata-master-section-icon' />
                                        <h3>Family Details</h3>
                                    </span>
                                </div>
                                <table className="biodata-master-bio-table">
                                    <thead>
                                        <tr>
                                            <th>Relation</th>
                                            <th>Name</th>
                                            <th>Occupation</th>
                                            <th>Married</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Brother</td>
                                            <td>ANkit</td>
                                            <td>College</td>
                                            <td>No</td>
                                        </tr>
                                        <tr>
                                            <td>Brother</td>
                                            <td>ANkit</td>
                                            <td>College</td>
                                            <td>No</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Contact Section */}

                            <div className="biodata-master-section contact-sectio">
                                <div className="biodata-master-section-title">
                                    <span className="biodata-master-flex-section">
                                        <ContactPhone className='biodata-master-section-icon' />
                                        <h3>Contact Details</h3>
                                    </span>
                                </div>
                                <table className="biodata-master-bio-table">
                                    <thead>
                                        <tr>
                                            <th>Address</th>
                                            <th>Mobile No.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Near B.D. College, Yarpur Yogiya Tola, Mithapur, Patna-800001</td>
                                            <td>+919264248504</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default BiodataMaster