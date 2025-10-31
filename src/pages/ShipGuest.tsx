import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const ShipGuest = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(10);
  const [weight, setWeight] = useState("");
  const navigate = useNavigate();

  const calculateCost = (weightValue: string) => {
    const w = parseFloat(weightValue) || 0;
    const cost = 10 + (w * 2); // $10 base + $2 per kg
    setEstimatedCost(cost);
  };

  const handleWeightChange = (value: string) => {
    setWeight(value);
    calculateCost(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      const shipmentData = {
        sender_name: formData.get('sender-name') as string,
        sender_email: formData.get('sender-email') as string,
        sender_phone: formData.get('sender-phone') as string,
        sender_address: `${formData.get('sender-address')}, ${formData.get('sender-city')}, ${formData.get('sender-zip')}`,
        receiver_name: formData.get('receiver-name') as string,
        receiver_phone: formData.get('receiver-phone') as string,
        receiver_address: `${formData.get('receiver-address')}, ${formData.get('receiver-city')}, ${formData.get('receiver-zip')}`,
        package_weight: parseFloat(formData.get('weight') as string),
        package_dimensions: `${formData.get('length')}x${formData.get('width')}x${formData.get('height')} in`,
        is_guest: true
      };

      const { data, error } = await supabase.functions.invoke('create-shipment', {
        body: shipmentData
      });

      if (error) throw error;

      toast.success(`Shipping label created! Tracking code: ${data.tracking_code}`);
      
      // Redirect to tracking page with the new tracking code
      setTimeout(() => {
        navigate(`/track-parcel?id=${data.tracking_code}`);
      }, 2000);
    } catch (error) {
      console.error('Error creating shipment:', error);
      toast.error('Failed to create shipment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Ship as Guest</CardTitle>
            <CardDescription>
              Fill out the shipping information below to create your shipping label
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sender Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Sender Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sender-name">Full Name *</Label>
                    <Input id="sender-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender-email">Email *</Label>
                    <Input id="sender-email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender-phone">Phone Number *</Label>
                    <Input id="sender-phone" type="tel" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender-address">Address *</Label>
                    <Input id="sender-address" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender-city">City *</Label>
                    <Input id="sender-city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender-zip">ZIP Code *</Label>
                    <Input id="sender-zip" required />
                  </div>
                </div>
              </div>

              {/* Receiver Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Receiver Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="receiver-name">Full Name *</Label>
                    <Input id="receiver-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiver-email">Email</Label>
                    <Input id="receiver-email" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiver-phone">Phone Number *</Label>
                    <Input id="receiver-phone" type="tel" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiver-address">Address *</Label>
                    <Input id="receiver-address" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiver-city">City *</Label>
                    <Input id="receiver-city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiver-zip">ZIP Code *</Label>
                    <Input id="receiver-zip" required />
                  </div>
                </div>
              </div>

              {/* Package Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Package Information</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg) *</Label>
                    <Input 
                      id="weight" 
                      name="weight"
                      type="number" 
                      step="0.1" 
                      value={weight}
                      onChange={(e) => handleWeightChange(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="length">Length (in) *</Label>
                    <Input id="length" type="number" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (in) *</Label>
                    <Input id="width" type="number" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (in) *</Label>
                    <Input id="height" type="number" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Package Description</Label>
                  <Input id="description" placeholder="Optional" />
                </div>
              </div>

              {/* Estimated Cost */}
              <div className="bg-secondary p-4 rounded-lg border">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Estimated Shipping Cost:</span>
                  <span className="text-2xl font-bold text-primary">${estimatedCost.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Calculated as: $10 base + $2 per kg. Final cost shown after submission.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 h-12 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Create Shipping Label"}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                By submitting, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShipGuest;
