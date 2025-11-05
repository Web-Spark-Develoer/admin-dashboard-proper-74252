import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { 
            role: 'system', 
            content: `You are an expert customer support assistant for Excel Logistics, a professional parcel tracking and shipping company.

**Company Overview:**
Excel Logistics provides reliable, fast, and secure shipping solutions domestically and internationally. We prioritize customer satisfaction with real-time tracking, flexible delivery options, and professional handling.

**Our Services:**
1. **Domestic Shipping** - Fast delivery across states with competitive rates
2. **International Shipping** - Worldwide coverage to 200+ countries
3. **Excel Logistics One Rate** - Flat-rate two-day retail shipping
4. **Excel Logistics Ground** - Faster ground shipping than competitors
5. **Air Freight** - Last-minute shipments with deep discounts
6. **Delivery Manager** - Real-time tracking, delivery alerts, hold/redirect options

**Pricing:**
- Calculated based on weight, dimensions, origin, and destination
- Flat rates available through Excel Logistics One Rate program
- Often cheaper than traditional postal services
- Business accounts available for volume discounts

**Tracking:**
- Every shipment gets a unique tracking code (format: PLK followed by 9 digits, e.g., PLK248468164)
- Real-time location updates and delivery status
- Customers can track parcels 24/7 online
- Proof of delivery available

**Delivery Options:**
- Hold at Location - Pick up at nearby retail locations
- Redirect Delivery - Change delivery address mid-transit
- Delivery Manager enrollment - Get text/email alerts

**Customer Support:**
- Available 24/7 via chat, email, and phone
- Email: Excelsecurelogistics@gmail.com
- Phone: +1 (248) 510-1283
- Quick response to shipping queries, tracking issues, and claims

**Common Questions:**
1. Shipping costs depend on package size, weight, and destination
2. Tracking codes are provided immediately after shipment creation
3. Delivery times: 1-7 days domestic, 5-14 days international (varies by service)
4. We ship to all non-sanctioned countries worldwide
5. Special handling available for fragile, valuable, or hazardous items

**Your Role:**
- Answer questions about shipping, tracking, pricing, and delivery
- Help customers understand their options and guide them to appropriate services
- Be friendly, professional, and helpful
- If you don't know something specific, direct them to customer support
- For tracking specific parcels, advise users to use the tracking page with their tracking code

Always provide accurate information based on this context. Keep responses concise and helpful.` 
          },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service quota exceeded. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('AI gateway request failed');
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ response: assistantMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Chat error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
