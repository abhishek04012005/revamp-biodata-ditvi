import { supabase } from './Supabase';

export const UserDetailsStorage = {
    async saveUserDetails(userDetails) {
    try {
      const { data, error } = await supabase
        .from('user_details')
        .insert({  
          user_details: userDetails.userDetails,
          model_details: userDetails.modelDetails,
        })
        .select('id, request_number')
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error saving User details:', error);
      throw error;
    }
  },
  async getAllUsers() {
    try {
      const { data, error } = await supabase
        .from('user_details')
        .select('*');

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  }
}