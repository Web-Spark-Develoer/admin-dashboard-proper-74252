import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PublicShipping = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 md:py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Create a shipment</h1>
        <p className="text-center text-muted-foreground mb-8 md:mb-12">How would you like to ship?</p>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Login to Ship */}
          <div className="bg-secondary p-6 md:p-8 rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground">I already have an account</h2>
            
            <Button 
              onClick={() => navigate('/customer-auth')}
              className="w-full bg-primary hover:bg-primary/90 text-white mb-6 h-12"
            >
              LOG IN TO SHIP
            </Button>

            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-foreground">Get discounted shipping rates</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-foreground">Connect your e-commerce store</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-foreground">Request pickups</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-foreground">Track in detail</span>
              </li>
            </ul>
          </div>

          {/* Ship as Guest */}
          <div className="bg-secondary p-6 md:p-8 rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground">I want to ship without an account</h2>
            
            <Button 
              onClick={() => navigate('/ship-guest')}
              className="w-full bg-primary hover:bg-primary/90 text-white mb-6 h-12"
            >
              SHIP AS A GUEST
            </Button>

            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-foreground">No need to sign up</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-foreground">Ship right away</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-foreground">Pay by card</span>
              </li>
            </ul>

            <div className="flex gap-2 mt-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicShipping;
