import { supabase } from './Supabase';

export const UserFeedbackStorage = {
    async saveUserFeedback(userFeedback) {
        try {
        const { data, error } = await supabase
            .from('user_feedback')
            .insert({
            request_number: userFeedback.requestNumber,
            comment: userFeedback.comment,
            rating: userFeedback.rating,
            })
            .select('id, request_number')
            .single();
    
        if (error) throw error;
    
        return data;
        } catch (error) {
        console.error('Error saving User Feedback:', error);
        throw error;
        }
    },

    async getUserFeedback(requestNumber) {
        try {
            const { data, error } = await supabase
                .from('user_feedback')
                .select('*')
                .eq('request_number', requestNumber)
                .single();
    
            if (error) throw error;
    
            return data;
        } catch (error) {
            console.error('Error fetching User Feedback:', error);
            throw error;
        }
    },
}