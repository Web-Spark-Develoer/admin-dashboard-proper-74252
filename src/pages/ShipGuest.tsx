import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const ShipGuest = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Connect to backend when ready
    setTimeout(() => {
      toast.success("Shipping label created! Check your email for details.");
      setIsSubmitting(false);
    }, 1500);
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
                    <Label htmlFor="weight">Weight (lbs) *</Label>
                    <Input id="weight" type="number" step="0.1" required />
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
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Estimated Shipping Cost:</span>
                  <span className="text-2xl font-bold text-green-600">$45.00</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Final cost will be calculated based on actual package dimensions and destination
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FF6B00] hover:bg-[#E55F00] h-12 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Create Shipping Label"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShipGuest;
