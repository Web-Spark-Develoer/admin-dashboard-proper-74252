import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import heroPlane from "@/assets/hero-plane.jpg";
import deliveryPerson from "@/assets/delivery-person.jpg";
import mobileTracking from "@/assets/mobile-tracking.jpg";
import dropOffLocation from "@/assets/drop-off-location.jpg";
import businessSupport from "@/assets/business-support.jpg";
import deliveryTruck from "@/assets/delivery-truck.jpg";
import airFreight from "@/assets/air-freight.jpg";

const Home = () => {
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  const handleTrack = () => {
    if (!trackingId.trim()) {
      toast.error("Please enter a tracking ID");
      return;
    }
    navigate(`/track-parcel?id=${trackingId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${heroPlane})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-blue-600/50" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg">
            Ship, manage, track, deliver.
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
            <Input
              placeholder="TRACKING ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
              className="flex-1 h-12 md:h-14 text-base md:text-lg bg-white border-0"
            />
            <Button 
              onClick={handleTrack}
              className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              TRACK →
            </Button>
          </div>
        </div>
      </section>

      {/* Why Ship Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-foreground">
            Why ship with Excel logistics?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-foreground">
                Innovative solutions for reliability & speed
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Whether it's across states or worldwide, we prioritize the secure and swift arrival of your shipments.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-foreground">
                Premium shipping at professional rates
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                When you need reliable delivery and careful handling, trust Excel logistics to get your items where they need to go on time.
              </p>
            </div>
            
            <div className="hidden lg:block">
              <img 
                src={deliveryPerson}
                alt="Delivery professional"
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
            
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-foreground">
                We ship everywhere*
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                From major cities to remote locations, your goods can reach worldwide.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-foreground">
                Excel logistics can ship for less than the Post Office
              </h3>
              <p className="text-muted-foreground text-sm md:text-base mb-2">
                Two-day retail shipping, one flat rate.
              </p>
              <p className="text-primary font-semibold">Excel logistics One Rate**</p>
            </div>
          </div>
          
          <p className="text-xs md:text-sm text-muted-foreground mt-6 md:mt-8">
            *Excel logistics doesn't ship anywhere sanctioned by the U.S.<br />
            **Visit the Excel logistics One Rate page for details.
          </p>
          
          <Button 
            onClick={() => navigate('/shipping')}
            className="mt-6 md:mt-8 bg-primary hover:bg-primary/90 text-white border-2 border-primary font-semibold"
          >
            START SHIPPING
          </Button>
        </div>
      </section>

      {/* Your Packages Section */}
      <section className="py-12 md:py-16 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-foreground">
            Your packages. Your way.
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-card p-5 md:p-6 rounded-lg shadow-sm">
              <img 
                src={mobileTracking}
                alt="Manage shipments"
                className="w-full h-40 md:h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">
                Manage shipments on the move
              </h3>
              <p className="text-muted-foreground text-sm md:text-base mb-4">
                Create labels in seconds, find nearby drop off spots, and track packages in real time. The Excel logistics Web app helps you stay on top of every delivery—no matter where your day takes you.
              </p>
              <Button 
                variant="link" 
                className="text-accent p-0 font-semibold"
                onClick={() => navigate('/customer-auth')}
              >
                ENROLL NOW
              </Button>
            </div>
            
            <div className="bg-card p-5 md:p-6 rounded-lg shadow-sm">
              <img 
                src={dropOffLocation}
                alt="Track delivery"
                className="w-full h-40 md:h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">
                Always know what's on the way
              </h3>
              <p className="text-muted-foreground text-sm md:text-base mb-4">
                Get familiar with Excel logistics Delivery Manager® so you're ready when the shopping season starts. Enroll today to get tracking alerts, proof of delivery, and a live map view of your package.
              </p>
              <Button 
                variant="link" 
                className="text-accent p-0 font-semibold"
                onClick={() => navigate('/customer-auth')}
              >
                ENROLL NOW
              </Button>
            </div>
            
            <div className="bg-card p-5 md:p-6 rounded-lg shadow-sm">
              <img 
                src={deliveryPerson}
                alt="Delivery pause"
                className="w-full h-40 md:h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">
                Put your delivery on pause
              </h3>
              <p className="text-muted-foreground text-sm md:text-base mb-4">
                Secure your incoming packages until you're ready for them. You can request to hold shipments at a nearby retail location for easy pickup. Or request to redirect an in-transit delivery and get it on your schedule.
              </p>
              <Button 
                variant="link" 
                className="text-accent p-0 font-semibold"
                onClick={() => navigate('/support')}
              >
                REQUEST A HOLD
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-foreground">
              Changing regulations. Solid support.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Excel logistics has been helping customers navigate U.S. tariffs and trade regulations for 50+ years. And with the Excel logistics Import Tool, non-account holders can opt in to securely pay fees online.
            </p>
          </div>
          <img 
            src={businessSupport}
            alt="Customer support"
            className="rounded-lg w-full h-64 md:h-80 object-cover"
          />
        </div>
      </section>

      {/* Peak Season Section */}
      <section className="py-12 md:py-16 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-foreground">
            Power your business through peak season
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12">
            Reach more customers in less time
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center text-left mb-8 md:mb-12">
            <img 
              src={deliveryTruck}
              alt="Excel Logistics truck"
              className="rounded-lg w-full h-48 md:h-64 object-cover"
            />
            <div>
              <p className="text-base md:text-lg text-foreground">
                Want to stay miles ahead of the competition? Excel logistics Ground® is faster to more locations than UPS Ground. That means your customers can get what they need—sooner.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center text-left">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-foreground">
                Last-minute shipments? Don't stress.
              </h3>
              <p className="text-base md:text-lg text-foreground">
                Deliver on your tightest deadlines with the speed and reliability of Excel logistics International Air Freight. Take advantage of our deep discounts with last-minute rates. Get fast booking, international shipping support, and real-time tracking that make rush shipments a breeze.
              </p>
            </div>
            <img 
              src={airFreight}
              alt="Air freight"
              className="rounded-lg w-full h-48 md:h-64 object-cover order-1 md:order-2"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 text-foreground">OUR COMPANY</h4>
              <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                <li><button onClick={() => navigate('/support')} className="hover:text-accent">About Excel logistics</button></li>
                <li><button onClick={() => navigate('/support')} className="hover:text-accent">Our Portfolio</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">SERVICES</h4>
              <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                <li><button onClick={() => navigate('/shipping')} className="hover:text-accent">Shipping</button></li>
                <li><button onClick={() => navigate('/track-parcel')} className="hover:text-accent">Tracking</button></li>
                <li><button onClick={() => navigate('/locations')} className="hover:text-accent">Locations</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">SUPPORT</h4>
              <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                <li><button onClick={() => navigate('/support')} className="hover:text-accent">Contact Us</button></li>
                <li><button onClick={() => navigate('/support')} className="hover:text-accent">FAQs</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">LANGUAGE</h4>
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <span className="text-blue-600">🌐</span>
                <span>United States</span>
              </div>
              <select className="mt-2 border rounded px-3 py-2 text-sm md:text-base bg-card text-foreground">
                <option>English</option>
              </select>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-muted-foreground text-xs md:text-sm">
            © 2025 Excel Secure. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
