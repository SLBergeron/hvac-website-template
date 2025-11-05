/**
 * Cloudflare Pages Function - Contact Form Handler
 *
 * Handles form submissions with spam protection and stores them in Supabase.
 * For Tier 2+ customers, also triggers n8n webhook for SMS/email notifications.
 *
 * Route: /api/contact
 * Method: POST
 */

import { createClient } from '@supabase/supabase-js';

// Simple in-memory rate limiting (resets on function restart)
// In production, consider using Cloudflare KV for persistent storage
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS = 3; // Max 3 submissions per hour per IP

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  businessName: string;
  webhookUrl?: string;
  honeypot?: string; // Hidden field to catch bots
  submissionTime?: number; // Timestamp when form was rendered
}

export async function onRequest(context: any) {
  const { request, env } = context;

  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    // Parse request body
    const formData: FormData = await request.json();

    // --- SPAM PROTECTION ---

    // 1. Honeypot check (hidden field that humans won't fill)
    if (formData.honeypot && formData.honeypot.trim() !== '') {
      console.log('Spam detected: Honeypot field filled');
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Time-based validation (reject if submitted too quickly)
    if (formData.submissionTime) {
      const timeTaken = Date.now() - formData.submissionTime;
      if (timeTaken < 2000) {
        // Less than 2 seconds
        console.log('Spam detected: Form submitted too quickly');
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // 3. Rate limiting by IP
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const now = Date.now();

    const rateLimit = rateLimitMap.get(ip);
    if (rateLimit) {
      // Check if within rate limit window
      if (now - rateLimit.timestamp < RATE_LIMIT_WINDOW) {
        if (rateLimit.count >= MAX_REQUESTS) {
          console.log(`Rate limit exceeded for IP: ${ip}`);
          return new Response(
            JSON.stringify({ error: 'Too many requests. Please try again later.' }),
            { status: 429, headers: { 'Content-Type': 'application/json' } }
          );
        }
        rateLimit.count++;
      } else {
        // Reset if outside window
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    } else {
      // First request from this IP
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    // 4. Validate required fields
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.message ||
      !formData.businessName
    ) {
      return new Response(
        JSON.stringify({ error: 'All fields are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 5. Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // --- SUPABASE STORAGE (ALL TIERS) ---

    // Initialize Supabase client
    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert into Supabase
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([
        {
          business_name: formData.businessName,
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_email: formData.email,
          message: formData.message,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to save form submission.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // --- N8N WEBHOOK (TIER 2+ ONLY) ---

    // If webhook URL provided, also send to n8n for notifications
    if (formData.webhookUrl && formData.webhookUrl.trim() !== '') {
      try {
        await fetch(formData.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            businessName: formData.businessName,
            customerName: formData.name,
            customerPhone: formData.phone,
            customerEmail: formData.email,
            message: formData.message,
            submittedAt: new Date().toISOString(),
          }),
        });
      } catch (webhookError) {
        // Don't fail the entire request if webhook fails
        // Data is already saved in Supabase
        console.error('Webhook error:', webhookError);
      }
    }

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Form submitted successfully!',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
