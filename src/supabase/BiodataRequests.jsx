import FlowType from '../constants/FlowType';
import { supabase } from './Supabase';

const biodataRequestsTableName= 'biodata_requests';

export const BiodataRequestsStorage = {
     async saveBiodataRequestFromWhatsapp(biodataRequest) {
        try {
          const { data, error } = await supabase
            .from(biodataRequestsTableName)
            .insert({
            flow_type: FlowType.FLOW_WHATSAPP,
            request_number: biodataRequest.requestNumber,
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
            flow_type: FlowType.FLOW_UPLOAD_BIODATA,
            request_number: biodataRequest.requestNumber,
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
      }

}