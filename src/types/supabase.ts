/**
 * Supabase database types
 *
 * This file contains TypeScript types for the Supabase database schema.
 * In a real implementation, these types would be generated from the database schema
 * using the Supabase CLI: npx supabase gen types typescript
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EmptyObject {}

export interface Database {
  public: {
    Tables: EmptyObject
    Views: EmptyObject
    Functions: EmptyObject
    Enums: EmptyObject
  }
}
