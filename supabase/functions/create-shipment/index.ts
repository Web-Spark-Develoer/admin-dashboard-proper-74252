import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('authorization');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader || '' } } }
    );

    const {
      sender_name,
      sender_email,
      sender_phone,
      sender_address,
      receiver_name,
      receiver_phone,
      receiver_address,
      package_weight,
      package_dimensions,
      is_guest = true
    } = await req.json();

    // Get user ID if authenticated
    const { data: { user } } = await supabase.auth.getUser();

    // Generate tracking code
    const generateCode = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = 'PLK';
      for (let i = 0; i < 10; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    };

    let tracking_code = generateCode();
    
    // Calculate shipping cost based on weight (simple formula: $10 base + $2 per kg)
    const baseRate = 10;
    const perKgRate = 2;
    const amount = baseRate + (package_weight ? parseFloat(package_weight) * perKgRate : 0);

    // Create shipment
    const { data: shipment, error } = await supabase
      .from('shipments')
      .insert({
        tracking_code,
        customer_id: user?.id || null,
        sender_name,
        sender_email,
        sender_phone,
        sender_address,
        receiver_name,
        receiver_phone,
        receiver_address,
        package_weight,
        package_dimensions,
        amount,
        is_guest,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating shipment:', error);
      throw error;
    }

    console.log('Shipment created:', shipment);

    return new Response(
      JSON.stringify({ 
        success: true, 
        shipment,
        tracking_code 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in create-shipment function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
