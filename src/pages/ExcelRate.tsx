import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ExcelRate = () => {
  const [weight, setWeight] = useState("");
  const [destination, setDestination] = useState("");
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);

  const calculateRate = () => {
    const baseRate = 29.99;
    const weightFactor = parseFloat(weight) * 0.50;
    const total = baseRate + weightFactor;
    setEstimatedCost(total);
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Excel Logistics One Rate
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Simple, flat-rate shipping for predictable costs
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-foreground">What is One Rate?</h2>
              <p className="text-muted-foreground mb-4">
                Excel Logistics One Rate is our simplified shipping solution that offers:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">✓</span>
                  Flat-rate pricing - no surprises
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">✓</span>
                  Two-day delivery to most locations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">✓</span>
                  No dimensional weight calculations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">✓</span>
                  Free packaging materials
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">✓</span>
                  Up to $100 declared value included
                </li>
              </ul>

              <div className="mt-8 p-6 bg-accent/10 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-foreground">Starting at $29.99</h3>
                <p className="text-sm text-muted-foreground">
                  For packages up to 50 lbs within the continental U.S.
                </p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Rate Calculator</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Package Weight (lbs)</label>
                  <Input
                    type="number"
                    placeholder="Enter weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Destination</label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="domestic">Domestic (US)</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="mexico">Mexico</SelectItem>
                      <SelectItem value="international">International</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={calculateRate} 
                  className="w-full"
                  disabled={!weight || !destination}
                >
                  Calculate Rate
                </Button>

                {estimatedCost !== null && (
                  <div className="mt-6 p-4 bg-accent/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Estimated Cost</p>
                    <p className="text-3xl font-bold text-accent">
                      ${estimatedCost.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      *Final price may vary based on exact dimensions and destination
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-secondary rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-foreground">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-foreground">What sizes are eligible?</h4>
                <p className="text-sm text-muted-foreground">
                  Packages up to 50 lbs and not exceeding 108 inches in combined length and girth.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Can I ship internationally?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! One Rate is available to over 200 countries and territories worldwide.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Is insurance included?</h4>
                <p className="text-sm text-muted-foreground">
                  Up to $100 declared value is included. Additional insurance can be purchased.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExcelRate;
