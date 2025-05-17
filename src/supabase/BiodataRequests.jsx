import { FlowType } from '../constants/FlowType';
import { supabase } from './Supabase';

const biodataRequestsTableName= 'biodata_requests';

export const BiodataRequestsStorage = {

  async getAllBiodataRequest() {
        try {
          const { data, error } = await supabase
            .from(biodataRequestsTableName)
            .select(`
                    id,
                    created_at,
                    request_number,
                    flow_type,
                    status,
                    user_details,
                    model_details,
                    profile_url,
                    biodata_url
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
     async saveBiodataRequestFromWhatsapp(biodataRequest) {
        try {
          const { data, error } = await supabase
            .from(biodataRequestsTableName)
            .insert({
            request_number: biodataRequest.requestNumber,
            flow_type: FlowType.FLOW_WHATSAPP,
            status: [{
              id: 0,
              created: new Date().toISOString(),
            }],
            user_details: biodataRequest.userDetails,
            model_details: biodataRequest.modelDetails,
            })
            .select('*')
            .single();
    
          if (error) throw error;
    
          return data;
        } catch (error) {
          console.error('Error saveBiodataRequestFromWhatsapp:', error);
          throw error;
        }
      },

     async saveBiodataRequestFromUploadBiodata(biodataRequest) {
        try {
          const { data, error } = await supabase
            .from(biodataRequestsTableName)
            .insert({
            request_number: biodataRequest.requestNumber,
            status: [{
              id: 0,
              created: new Date().toISOString(),
            }],
            flow_type: FlowType.FLOW_UPLOAD_BIODATA,
            user_details: biodataRequest.userDetails,
            model_details: biodataRequest.modelDetails,
            profile_url: biodataRequest.profileUrl,
            biodata_url: biodataRequest.biodataUrl,
            })
            .select('*')
            .single();
    
          if (error) throw error;
    
          return data;
        } catch (error) {
          console.error('Error saveBiodataRequestFromUploadBiodata:', error);
          throw error;
        }
      },

      async updateStatusBiodataRequestById(requestId, status) {
        try {
          const { data, error } = await supabase
            .from(biodataRequestsTableName)
            .update({
              status: status,
            })
            .eq('id', requestId)
            .select('*')
            .single();
    
          if (error) throw error;
    
          return data;
        } catch (error) {
          console.error('Error updateStatusBiodataRequestById:', error);
          throw error;
        }
      },

      async deleteBiodataRequestById(requestId) {
        try {
          const { data, error } = await supabase
            .from(biodataRequestsTableName)
            .update({
              deleted: true,
            })
            .eq('id', requestId)
            .select('*')
            .single();
    
          if (error) throw error;
    
          return data;
        } catch (error) {
          console.error('Error deleteBiodataRequestById:', error);
          throw error;
        }
      },

}