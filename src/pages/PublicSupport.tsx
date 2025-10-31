import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

const PublicSupport = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 md:py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Account Management */}
        <section className="mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Access and manage your Excel-Secure account
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8">
            All your account management tools are in one place. This is your go-to spot for making changes to your Excel-Secure account, crossing tasks off your list, and getting answers to common questions. Don't have an account? Open a personal or business account.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <button 
              onClick={() => navigate('/customer-auth')}
              className="text-center p-4 rounded-lg hover:bg-secondary transition-colors"
            >
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <span className="text-4xl">⚙️</span>
              </div>
              <h3 className="font-semibold text-accent text-sm md:text-base">
                ACCOUNT MANAGEMENT TOOLS
              </h3>
            </button>
            <button 
              onClick={() => navigate('/customer-auth')}
              className="text-center p-4 rounded-lg hover:bg-secondary transition-colors"
            >
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <span className="text-4xl">💳</span>
              </div>
              <h3 className="font-semibold text-accent text-sm md:text-base">
                BILLING AND REPORTING
              </h3>
            </button>
            <button 
              onClick={() => navigate('/shipping')}
              className="text-center p-4 rounded-lg hover:bg-secondary transition-colors"
            >
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <span className="text-4xl">📦</span>
              </div>
              <h3 className="font-semibold text-accent text-sm md:text-base">
                SHIPPING AND TRACKING
              </h3>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <button 
              onClick={() => navigate('/customer-auth')}
              className="text-center p-4 rounded-lg hover:bg-secondary transition-colors"
            >
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <span className="text-4xl">📋</span>
              </div>
              <h3 className="font-semibold text-accent text-sm md:text-base">
                CLAIMS AND SUPPORT
              </h3>
            </button>
            <button 
              onClick={() => navigate('/shipping')}
              className="text-center p-4 rounded-lg hover:bg-secondary transition-colors"
            >
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <span className="text-4xl">⚡</span>
              </div>
              <h3 className="font-semibold text-accent text-sm md:text-base">
                MANAGED SPECIALIZED SERVICES
              </h3>
            </button>
          </div>
        </section>

        {/* Specialized Services */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Manage your account for specialized services
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-8">
            Whether you're shipping items that require special attention, need help with ocean and air cargo, or want to ship fast, we can help.
          </p>

          <Accordion type="single" collapsible className="mb-8">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base md:text-lg font-semibold text-foreground hover:text-accent">
                Manage your Excel-Secure Custom Critical® shipments
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Access specialized tools and support for time-critical shipments that require immediate attention and custom handling.
                </p>
                <Button 
                  onClick={() => navigate('/customer-auth')}
                  className="mt-4 bg-primary hover:bg-primary/90"
                >
                  Get Started
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">
            Excel Logistics FAQs
          </h2>

          <Accordion type="single" collapsible>
            <AccordionItem value="faq-1">
              <AccordionTrigger className="text-lg md:text-xl font-semibold text-accent hover:text-accent/80">
                1. What services does Excel Logistics offer?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Excel Logistics provides a wide range of services including freight forwarding, warehousing, inventory management, last-mile delivery, and supply chain consulting. We specialize in both domestic and international logistics solutions.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2">
              <AccordionTrigger className="text-lg md:text-xl font-semibold text-accent hover:text-accent/80">
                2. How can I track my shipment?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  You can track your shipment using the tracking number provided at the time of dispatch. Visit our Tracking Portal and enter your tracking ID to get real-time updates on your package status.
                </p>
                <Button 
                  onClick={() => navigate('/track-parcel')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Track Package
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3">
              <AccordionTrigger className="text-lg md:text-xl font-semibold text-accent hover:text-accent/80">
                3. Does Excel Logistics support Excel-based reporting tools?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Yes! We offer Excel-compatible templates for inventory tracking, delivery schedules, and performance analytics. You can easily export data from our system into Excel format for custom reporting and analysis.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-4">
              <AccordionTrigger className="text-lg md:text-xl font-semibold text-accent hover:text-accent/80">
                4. What are your shipping rates?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  Shipping rates vary based on package weight, dimensions, destination, and service level. Contact our sales team or use our online rate calculator for accurate pricing. We also offer discounted rates for high-volume shippers.
                </p>
                <Button 
                  onClick={() => navigate('/shipping')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Get Shipping Quote
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-5">
              <AccordionTrigger className="text-lg md:text-xl font-semibold text-accent hover:text-accent/80">
                5. How do I file a claim for damaged or lost items?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  To file a claim, log into your account and navigate to the Claims section. Provide your tracking number, photos of damage (if applicable), and supporting documentation. Our claims team will review your case within 3-5 business days.
                </p>
                <Button 
                  onClick={() => navigate('/customer-auth')}
                  className="bg-primary hover:bg-primary/90"
                >
                  File a Claim
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-6">
              <AccordionTrigger className="text-lg md:text-xl font-semibold text-accent hover:text-accent/80">
                6. Do you offer international shipping?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Yes, Excel Logistics ships to over 200 countries worldwide. We handle all customs documentation and provide door-to-door international shipping services with full tracking capabilities.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-7">
              <AccordionTrigger className="text-lg md:text-xl font-semibold text-accent hover:text-accent/80">
                7. How do I create a shipping account?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  Creating an account is easy! Click the button below to get started. You'll enjoy benefits like discounted rates, shipment history, and easy label creation.
                </p>
                <Button 
                  onClick={() => navigate('/customer-auth')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Create Account
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-8">
              <AccordionTrigger className="text-lg md:text-xl font-semibold text-accent hover:text-accent/80">
                8. Can I ship without an account?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  Yes! You can ship as a guest without creating an account. Simply use our guest shipping option to create labels and pay for shipping.
                </p>
                <Button 
                  onClick={() => navigate('/ship-guest')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Ship as Guest
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <Button 
            onClick={() => navigate('/customer-auth')}
            className="bg-primary hover:bg-primary/90"
          >
            Contact Customer Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublicSupport;
