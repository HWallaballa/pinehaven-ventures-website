/**
 * Supabase database types for Crypto Transaction Log.
 * These mirror the SQL schema in supabase/migrations/001_initial_schema.sql.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          stripe_customer_id: string | null;
          subscription_status: string | null;
          tier: 'free' | 'premium';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          stripe_customer_id?: string | null;
          subscription_status?: string | null;
          tier?: 'free' | 'premium';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string | null;
          stripe_customer_id?: string | null;
          subscription_status?: string | null;
          tier?: 'free' | 'premium';
          updated_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          trans_type: 'Buy' | 'Sell' | 'Deposit' | 'Withdraw';
          exchange: string;
          buy_amt: number | null;
          buy_cur: string | null;
          sell_amt: number | null;
          sell_cur: string | null;
          deposit_amt: number | null;
          deposit_cur: string | null;
          withdraw_amt: number | null;
          withdraw_cur: string | null;
          tag: string | null;
          note: string | null;
          date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          trans_type: 'Buy' | 'Sell' | 'Deposit' | 'Withdraw';
          exchange: string;
          buy_amt?: number | null;
          buy_cur?: string | null;
          sell_amt?: number | null;
          sell_cur?: string | null;
          deposit_amt?: number | null;
          deposit_cur?: string | null;
          withdraw_amt?: number | null;
          withdraw_cur?: string | null;
          tag?: string | null;
          note?: string | null;
          date: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          trans_type?: 'Buy' | 'Sell' | 'Deposit' | 'Withdraw';
          exchange?: string;
          buy_amt?: number | null;
          buy_cur?: string | null;
          sell_amt?: number | null;
          sell_cur?: string | null;
          deposit_amt?: number | null;
          deposit_cur?: string | null;
          withdraw_amt?: number | null;
          withdraw_cur?: string | null;
          tag?: string | null;
          note?: string | null;
          date?: string;
          updated_at?: string;
        };
      };
      imports: {
        Row: {
          id: string;
          user_id: string;
          filename: string;
          exchange: string;
          row_count: number;
          status: 'pending' | 'completed' | 'failed';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          filename: string;
          exchange: string;
          row_count: number;
          status?: 'pending' | 'completed' | 'failed';
          created_at?: string;
        };
        Update: {
          status?: 'pending' | 'completed' | 'failed';
          row_count?: number;
        };
      };
    };
  };
}
