import { supabase } from './supabase';

export const UserDetailsStorage = {
    async saveUserDetails(userDetails) {
      console.log('Saving User details:', userDetails);
    try {
      const { data, error } = await supabase
        .from('user_details')
        .insert({  
          name: userDetails.name,
          mobile_number: userDetails.mobileNumber,
          model_number: userDetails.modelNumber,
          language: userDetails.language,
          type: userDetails.type,
        })
        .select('id, request_number')
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error saving User details:', error);
      throw error;
    }
  }
}