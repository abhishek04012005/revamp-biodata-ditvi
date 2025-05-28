import { supabase } from "./Supabase";
import { PaymentStatus } from "../json/PaymentStatus";

const paymentRequestTable = "payment_request";

export const PaymentRequestStorage = {
  async initiatePaymentRequest(paymentRequest) {
    try {
      const { data, error } = await supabase
        .from(paymentRequestTable)
        .insert({
          request_number: paymentRequest.requestNumber,
          status: PaymentStatus.Initiated,
          amount: paymentRequest.amount,
        })
        .select("*")
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error initiating payment request:", error);
      throw error;
    }
  },

  async getPaymentRequestByRequestNumber(requestNumber) {
    try {
      const { data, error } = await supabase
        .from(paymentRequestTable)
        .select("*")
        .eq("request_number", requestNumber)
        .eq("status", PaymentStatus.Completed)
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error fetching payment request by request number:", error);
      throw error;
    }
  },

  async updatePaymentStatus(id, paymentDetails) {
    try {
      const { data, error } = await supabase
        .from(paymentRequestTable)
        .update({
          status: paymentDetails.status,
          transaction_id: paymentDetails.transactionId,
          payment_response: paymentDetails.response,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select("*")
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating payment status:", error);
      throw error;
    }
  },

  async getAllPayments({
    startDate,
    endDate,
    status = null,
    searchQuery = "",
  } = {}) {
    try {
      let query = supabase
        .from(paymentRequestTable)
        .select(
          `id,
        request_number,
        amount,
        status,
        transaction_id,
        created_at,
        updated_at
      `
        )
        .eq("deleted", false);

      // Apply date range filter
      if (startDate && endDate) {
        query = query.gte("created_at", startDate).lte("created_at", endDate);
      }

      // Apply status filter
      if (status) {
        query = query.eq("status", status);
      }

      // Apply search filter
      if (searchQuery) {
        query = query.or(
          `request_number.ilike.%${searchQuery}%,request_biodata.user_details->name.ilike.%${searchQuery}%`
        );
      }

      // Sort by creation date
      query = query.order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) throw error;

      return data.map((payment) => ({
        ...payment,
        userName: payment.request_biodata?.user_details?.name || "N/A",
      }));
    } catch (error) {
      console.error("Error getting payments:", error);
      throw error;
    }
  },
};
