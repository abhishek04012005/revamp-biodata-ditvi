import { supabase } from './Supabase';


const productionRequestTableName= 'production_request';

export const ProductionRequestStorage = {
    async getAllProductionRequest() {
        try {
            const { data, error } = await supabase
                .from(productionRequestTableName)
                .select(`
                    id,
                    biodata_request_id,
                    request_number,
                    flow_type,
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
                    created_at
                `)
                .eq('deleted', false)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Error getAllBiodataRequest:', error);
            throw error;
        }
    },

    async saveProductionRequest(productionRequest) {
        try {
            const { data, error } = await supabase
                .from(productionRequestTableName)
                .insert({
                    biodata_request_id: productionRequest.biodataRequestId,
                    request_number: productionRequest.requestNumber,
                    flow_type: productionRequest.flowType,
                    profile_url: productionRequest.profileUrl,
                    biodata_url: productionRequest.biodataUrl,
                    user_details: productionRequest.userDetails,
                    model_details: productionRequest.modelDetails,
                    personal_details: productionRequest.personalDetails,
                    professional_details: productionRequest.professionalDetails,
                    examination_details: productionRequest.examinationDetails,
                    education_details: productionRequest.educationDetails,
                    family_details: productionRequest.familyDetails,
                    contact_details: productionRequest.contactDetails,
                })
                .select('*')
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Error saveProductionRequest:', error);
            throw error;
        }
    },

    async getProductionRequestById(id) {   
        try {
            const { data, error } = await supabase
                .from(productionRequestTableName)
                .select(`
                    id,
                    biodata_request_id,
                    request_number,
                    flow_type,
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
                    style_settings,
                    created_at
                `)
                .eq('id', id)
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Error getProductionRequestById:', error);
            throw error;
        }
    },

    async updateProductionRequestById(id, productionRequest) {
        try {
            console.log('updateProductionRequestById', id, productionRequest.educationDetails);
            const { data, error } = await supabase
                .from(productionRequestTableName)
                .update({
                    profile_url: productionRequest.profileUrl,
                    personal_details: productionRequest.personalDetails,
                    professional_details: productionRequest.professionalDetails,
                    examination_details: productionRequest.examinationDetails,
                    education_details: productionRequest.educationDetails,
                    family_details: productionRequest.familyDetails,
                    contact_details: productionRequest.contactDetails,
                    style_settings: productionRequest.styleSettings,    
                })
                .eq('id', id)
                .select('*')
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Error updateProductionRequestById:', error);
            throw error;
        }
    },

    async deleteProductionRequestByRequestNumber(requestNumber) {
        try {
            const { data, error } = await supabase
                .from(productionRequestTableName)
                .update({
                    deleted: true,
                })
                .eq('request_number', requestNumber)

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Error deleteProductionRequestById:', error);
            throw error;
        }
    },

}             