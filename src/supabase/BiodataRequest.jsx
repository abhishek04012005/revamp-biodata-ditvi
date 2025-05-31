import { supabase } from "./Supabase";
import { FlowType } from "../constants/FlowType";

const biodataRequestTableName = "biodata_request";

export const BiodataRequestStorage = {
  async getAllBiodataRequest() {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .select(
          `
                    id,
                    created_at,
                    request_number,
                    flow_type,
                    status,
                    user_details,
                    model_details,
                    profile_url,
                    biodata_url,
                    personal_details,
                    professional_details,
                    examination_details,
                    education_details,
                    family_details,
                    contact_details,
                    completed
                    `
        )
        .eq("deleted", false)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error getAllBiodataRequest:", error);
      throw error;
    }
  },
  async saveBiodataRequestFromWhatsapp(biodataRequest) {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .insert({
          request_number: biodataRequest.requestNumber,
          flow_type: FlowType.FLOW_WHATSAPP,
          status: [
            {
              id: 0,
              created: new Date().toISOString(),
            },
          ],
          user_details: biodataRequest.userDetails,
          model_details: biodataRequest.modelDetails,
        })
        .select("*")
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error saveBiodataRequestFromWhatsapp:", error);
      throw error;
    }
  },

  async saveBiodataRequestFromUploadBiodata(biodataRequest) {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .insert({
          request_number: biodataRequest.requestNumber,
          status: [
            {
              id: 0,
              created: new Date().toISOString(),
            },
          ],
          flow_type: FlowType.FLOW_UPLOAD_BIODATA,
          user_details: biodataRequest.userDetails,
          model_details: biodataRequest.modelDetails,
          profile_url: biodataRequest.profileUrl,
          biodata_url: biodataRequest.biodataUrl,
        })
        .select("*")
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error saveBiodataRequestFromUploadBiodata:", error);
      throw error;
    }
  },

  async saveBiodataRequestFromCreateBiodata(biodataRequest) {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .insert({
          request_number: biodataRequest.requestNumber,
          status: [
            {
              id: 0,
              created: new Date().toISOString(),
            },
          ],
          flow_type: FlowType.FLOW_CREATE_BIODATA,
          user_details: biodataRequest.userDetails,
          model_details: biodataRequest.modelDetails,
          profile_url: biodataRequest.profileUrl,
          personal_details: biodataRequest.personalDetails,
          professional_details: biodataRequest.professionalDetails,
          examination_details: biodataRequest.examinationDetails,
          education_details: biodataRequest.educationDetails,
          family_details: biodataRequest.familyDetails,
          contact_details: biodataRequest.contactDetails,
        })
        .select("*")
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error saveBiodataRequestFromCreateBiodata:", error);
      throw error;
    }
  },

  async updateBiodataRequestById(requestId, biodataRequest) {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .update({
          profile_url: biodataRequest.profileUrl,
          personal_details: biodataRequest.personalDetails,
          professional_details: biodataRequest.professionalDetails,
          examination_details: biodataRequest.examinationDetails,
          education_details: biodataRequest.educationDetails,
          family_details: biodataRequest.familyDetails,
          contact_details: biodataRequest.contactDetails,
        })
        .eq("id", requestId)
        .select("*")
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error updateBiodataRequestById:", error);
      throw error;
    }
  },

  async updateStatusBiodataRequestById(requestId, status) {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .update({
          status: status,
        })
        .eq("id", requestId)
        .select("*")
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error updateStatusBiodataRequestById:", error);
      throw error;
    }
  },

  async updateStatusBiodataRequestByRequestNumber(requestNumber, status) {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .update({
          status: status,
        })
        .eq("request_number", requestNumber)
        .select("*")
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error updateStatusBiodataRequestById:", error);
      throw error;
    }
  },

  async updateStatusBiodataRequestFromFeedback(requestNumber, status) {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .update({
          status: status,
          completed: true,
        })
        .eq("request_number", requestNumber)
        .select("*")
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error updateStatusBiodataRequestFromFeedback:", error);
      throw error;
    }
  },

  async deleteBiodataRequestById(requestId) {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .update({
          deleted: true,
        })
        .eq("id", requestId)
        .select("*")
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error deleteBiodataRequestById:", error);
      throw error;
    }
  },

  async getBiodataRequestByRequestNumber(requestNumber) {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .select("*")
        .eq("request_number", requestNumber)
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error getBiodataRequestByRequestNumber:", error);
      throw error;
    }
  },

  async getBiodataRequestByRequestId(requestId) {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .select("*")
        .eq("id", requestId)
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error getBiodataRequestByRequestId:", error);
      throw error;
    }
  },

  async searchBiodataRequests(searchTerm) {
    try {
      const numericSearchTerm = parseInt(searchTerm);

      if (isNaN(numericSearchTerm)) {
        return [];
      }

      // Create array of numbers for the search
      const searchNumbers = [
        ...Array.from({ length: 10 }, (_, i) => parseInt(`${searchTerm}${i}`)),
        ...Array.from({ length: 10 }, (_, i) => parseInt(`${i}${searchTerm}`)),
        numericSearchTerm,
      ];

      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .select("*")
        .eq("deleted", false)
        .in("request_number", searchNumbers)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error searching biodata requests:", error);
      throw error;
    }
  },
};
