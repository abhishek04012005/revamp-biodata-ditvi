import { supabase } from './Supabase';

export const ContactUsStorage = {
    async saveContactUs(contactUs) {
        try {
            const { data, error } = await supabase
                .from('contact_us')
                .insert({
                    name: contactUs.name,
                    email: contactUs.email,
                    mobile: contactUs.mobile,
                    message: contactUs.message,
                })
                .select('*')
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Error saving contact us:', error);
            throw error;
        }
    },

    async getAllContactUs() {
        try {
            const { data, error } = await supabase
                .from('contact_us')
                .select('*')
                .eq('deleted', false)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Error fetching contact us:', error);
            throw error;
        }
    },

    async deleteContactUsById(id) {
        try {
            const { data, error } = await supabase
                .from('contact_us')
                .update({ deleted: true })
                .eq('id', id)
                .select('*')
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Error deleting contact us:', error);
            throw error;
        }
    },
}