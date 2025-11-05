/**
 * Supabase Client Configuration
 *
 * Handles Supabase connections for form submission storage.
 * Used by both client-side components and Cloudflare Pages Functions.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase configuration from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client only if credentials are provided
// This allows the app to build without Supabase configured (for demos)
let supabaseClient: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseClient as SupabaseClient;

// Form submission type
export interface FormSubmission {
  id?: string;
  created_at?: string;
  business_name: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  message: string;
}

/**
 * Insert a form submission into Supabase
 * @param submission Form submission data
 * @returns Promise with insert result
 */
export async function insertFormSubmission(submission: FormSubmission) {
  if (!supabase) {
    console.warn('Supabase not configured - form submission not saved');
    throw new Error('Database not configured');
  }

  const { data, error } = await supabase
    .from('form_submissions')
    .insert([submission])
    .select()
    .single();

  if (error) {
    console.error('Supabase insert error:', error);
    throw new Error('Failed to save form submission');
  }

  return data;
}

/**
 * Get form submissions for a specific business
 * @param businessName Business name to filter by
 * @param limit Number of submissions to return
 * @returns Promise with submissions
 */
export async function getFormSubmissions(businessName: string, limit: number = 50) {
  if (!supabase) {
    console.warn('Supabase not configured - returning empty submissions');
    return [];
  }

  const { data, error } = await supabase
    .from('form_submissions')
    .select('*')
    .eq('business_name', businessName)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Supabase fetch error:', error);
    throw new Error('Failed to fetch form submissions');
  }

  return data;
}
