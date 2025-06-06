import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Edit, Save, Cancel, ArrowBack, Visibility } from "@mui/icons-material";
import { getLanguageData } from "../../../json/languageCofig";
import {
  PersonalData,
  ProfessionalData,
  EducationData,
  FamilyData,
  ExaminationData,
  ContactData,
} from "../../../json/createBiodata";

import {
  PersonalDataHindi,
  ProfessionalDataHindi,
  EducationDataHindi,
  FamilyDataHindi,
  ExaminationDataHindi,
  ContactDataHindi,
} from "../../../json/CreateBiodataHindi";
import { UploadFile } from "../../../supabase/UploadFile";
import StorageBucket from "../../../constants/StorageBucket";
import Loader from "../../../structure/Loader/Loader";
import ModelTypes from "../../../json/ModelTypes";
import "./ProductionBiodataDetail.css";
import { MAXIMUM_IMAGE_SIZE } from "../../../utils/Constants";
import { ProfileSection } from "./Sections/ProfileSection";
import { BiodataDownloadSection } from "./Sections/BiodataDownloadSection";
import { PersonalInfoSection } from "./Sections/PersonalInfoSection";
import { ProfessionalInfoSection } from "./Sections/ProfessionalInfoSection";
import { ExaminationInfoSection } from "./Sections/ExaminationInfoSection";
import { EducationInfoSection } from "./Sections/EducationInfoSection";
import { FamilyInfoSection } from "./Sections/FamilyInfoSection";
import { ContactInfoSection } from "./Sections/ContactInfoSection";
import { ProductionRequestStorage } from "../../../supabase/ProductionRequest";
import Languages from "../../../json/Languages";

const ProductionBiodataDetail = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [requestNumber, setRequestNumber] = useState(null);
  const [langData, setLangData] = useState(null);
  // const [isLanguageHindi, setIsLanguageHindi] = useState(false);

  useEffect(() => {
    fetchRequestData(requestId);
  }, [requestId]);

  const fetchRequestData = async (requestId) => {
    try {
      setIsLoading(true);
      const response = await ProductionRequestStorage.getProductionRequestById(
        requestId
      );

      if (response) {
        const languageData = getLanguageData(response.model_details);
        const isLanguageHindi =
          response.model_details.language === Languages.Hindi.Name;
        setLangData(languageData);
        
        const initialFormData = {
          profileImage: response.profile_url,
          biodataUrl: response.biodata_url,
          userDetails: response.user_details,
          modelDetails: response.model_details,
          personalDetails:
            response.personal_details ||
            (isLanguageHindi ? PersonalDataHindi : PersonalData),
          professionalDetails:
            response.professional_details ||
            (isLanguageHindi ? ProfessionalDataHindi : ProfessionalData),
          examinationDetails:
            response.examination_details ||
            (isLanguageHindi ? ExaminationDataHindi : ExaminationData),
          educationDetails:
            response.education_details ||
            (isLanguageHindi ? [EducationDataHindi] : [EducationData]),
          familyDetails:
            response.family_details ||
            (isLanguageHindi ? FamilyDataHindi : FamilyData),
          contactDetails:
            response.contact_details ||
            (isLanguageHindi ? ContactDataHindi : ContactData),
        };

        setRequestNumber(response.request_number);
        setFormData(initialFormData);
        setOriginalData(initialFormData);
      }
    } catch (error) {
      console.error("Error fetching request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAXIMUM_IMAGE_SIZE) {
      // setNotification({
      //   show: true,
      //   title: "File Size Too Large",
      //   message:
      //     "Please upload an image that is less than or equal to 1MB in size. Large images may affect the loading time of your biodata.",
      // });
      alert(
        "Please upload an image that is less than or equal to 1MB in size. Large images may affect the loading time of your biodata."
      );
      return;
    }

    if (!file.type.startsWith("image/")) {
      // setNotification({
      //   show: true,
      //   title: "Invalid File Type",
      //   message:
      //     "Please upload a valid image file (JPG, PNG, etc.). Other file types are not supported.",
      // });
      alert(
        "Please upload a valid image file (JPG, PNG, etc.). Other file types are not supported."
      );
      return;
    }

    try {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.onerror = () => {
        alert("Error reading file");
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    } catch (error) {
      console.error("Error handling image:", error);
      alert("Failed to process image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      let profileUrl = formData.profileImage;

      if (selectedImage) {
        profileUrl = await UploadFile(
          selectedImage,
          `${requestNumber}_profile_${new Date().getTime()}`,
          StorageBucket.CREATE_BIODATA
        );
      }

      await ProductionRequestStorage.updateProductionRequestById(requestId, {
        profileUrl,
        personalDetails: formData.personalDetails,
        professionalDetails: formData.professionalDetails,
        examinationDetails: formData.examinationDetails,
        educationDetails: formData.educationDetails,
        familyDetails: formData.familyDetails,
        contactDetails: formData.contactDetails,
      });

      setIsEditing(false);
      fetchRequestData();
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  if (isLoading || !langData) return <Loader />;
  if (!formData)
    return (
      <div className="not-found">{langData?.placeholders.requestNotFound}</div>
    );

  return (
    <div className="request-detail">
      <header className="detail-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowBack /> Back
          </button>
          <div className="header-info">
            <h1>Production Request Details</h1>
            <h3 className="request-id">Request No. : {requestNumber}</h3>
          </div>
        </div>

        <div className="detail-actions">
          {isEditing ? (
            <div className="edit-actions">
              <button className="action-btn save" onClick={handleSave}>
                <Save /> Save
                <span className="btn-highlight"></span>
              </button>
              <button className="action-btn cancel" onClick={handleCancel}>
                <Cancel /> Cancel
                <span className="btn-highlight"></span>
              </button>
            </div>
          ) : (
            <div className="">
              <Link
                to={`/admin/production/preview/${requestId}`}
                className="action-btn preview"
              >
                <Visibility />
                Preview
                <span className="btn-highlight"></span>
              </Link>

              <button
                className="action-btn edit"
                onClick={() => setIsEditing(true)}
              >
                <Edit /> Edit Details
                <span className="btn-highlight"></span>
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="detail-content">
        <div className="content-grid">
          <ProfileSection
            formData={formData}
            isEditing={isEditing}
            handleImageChange={handleImageChange}
            langData={langData}
          />

          {formData.biodataUrl && (
            <BiodataDownloadSection
              biodataUrl={formData.biodataUrl}
              langData={langData}
            />
          )}

          <PersonalInfoSection
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
            langData={langData}
          />
          {formData.modelDetails?.type === ModelTypes.Student.Name ? (
            <ExaminationInfoSection
              formData={formData}
              setFormData={setFormData}
              isEditing={isEditing}
              langData={langData}
            />
          ) : (
            <ProfessionalInfoSection
              formData={formData}
              setFormData={setFormData}
              isEditing={isEditing}
              langData={langData}
            />
          )}

          <EducationInfoSection
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
            langData={langData}
          />

          <FamilyInfoSection
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
            langData={langData}
          />

          <ContactInfoSection
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
            langData={langData}
          />
        </div>

        {isLoading && <Loader />}
      </main>
    </div>
  );
};

export default ProductionBiodataDetail;
