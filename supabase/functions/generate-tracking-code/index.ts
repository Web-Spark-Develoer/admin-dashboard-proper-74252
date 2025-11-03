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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Generate a unique tracking code: PLK + 9 random digits
    const generateCode = () => {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000000000);
      const combined = (timestamp + random).toString();
      return 'PLK' + combined.slice(-9);
    };

    let trackingCode = generateCode();
    let attempts = 0;
    const maxAttempts = 10;

    // Ensure uniqueness
    while (attempts < maxAttempts) {
      const { data: existing } = await supabase
        .from('parcels')
        .select('tracking_code')
        .eq('tracking_code', trackingCode)
        .single();

      if (!existing) {
        const { data: existingShipment } = await supabase
          .from('shipments')
          .select('tracking_code')
          .eq('tracking_code', trackingCode)
          .single();

        if (!existingShipment) {
          break;
        }
      }

      trackingCode = generateCode();
      attempts++;
    }

    if (attempts >= maxAttempts) {
      throw new Error('Failed to generate unique tracking code');
    }

    console.log('Generated tracking code:', trackingCode);

    return new Response(
      JSON.stringify({ tracking_code: trackingCode }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating tracking code:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
