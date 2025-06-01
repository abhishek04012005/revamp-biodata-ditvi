import { supabase } from "./Supabase";

export const AdmingLoginStorage = {
  async adminLogin(credential) {
    try {
      const { data, error } = await supabase
        .from("admin_login")
        .select()
        .eq("username", credential.username)
        .eq("password", credential.password)
        .eq("active", true)
        .maybeSingle("id, username, name");

      if (error) throw error;

      return data
        ? { success: true, data: data }
        : {
            success: false,
            message: "Invalid credentials. Please, try again.",
          };
    } catch (error) {
      console.error("Error fetching admin details:", error);
      throw error;
    }
  },
};
