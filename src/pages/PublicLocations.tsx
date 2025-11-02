import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import excelDropOff from "@/assets/excel-drop-off.png";
import partnerLogos from "@/assets/partner-logos.jpg";

const PublicLocations = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-primary py-16 md:py-20 px-4 text-white text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Fast and easy package drop off</h1>
        <p className="text-lg md:text-xl mb-8">Drop off packages at a convenient location near you.</p>
        <Button className="bg-white text-foreground hover:bg-gray-100 h-12 px-8 text-base md:text-lg font-semibold">
          FIND A DROP OFF LOCATION
        </Button>
        <button className="mt-4 underline cursor-pointer">Create a shipping label</button>
      </section>

      {/* Drop Off Image */}
      <section className="py-12">
        <img 
          src={excelDropOff}
          alt="Excel Logistics drop off"
          className="w-full max-w-4xl mx-auto rounded-lg"
        />
        <p className="text-center text-gray-600 mt-6 px-4">You're busy. Drop off quickly on the go.</p>
      </section>

      {/* Where to Drop Off */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Where can I drop off an Excel-Logistics package?</h2>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            You can choose from thousands of authorized drop-off locations, parcel centers, and convenient retail and grocery locations nationwide. Some are even open 24 hours.
          </p>

          <Button className="bg-[#FF6B00] hover:bg-[#E55F00] text-white h-12 px-8 mb-12">
            FIND EXCEL-LOGISTICS DROP OFF LOCATIONS NEAR YOU
          </Button>

          {/* Partner Logos */}
          <div className="mb-16">
            <img 
              src={partnerLogos}
              alt="Excel Logistics partner locations"
              className="w-full max-w-4xl mx-auto"
            />
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=400&q=80"
                  alt="Pack and seal"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-[#6B46C1] mb-2">1. PACK AND SEAL YOUR PACKAGE.</h3>
              <p className="text-gray-600">
                Tape all the package seams securely. Make sure the package is in good condition and all old labels and barcodes are blacked out.
              </p>
            </div>

            <div>
              <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400&q=80"
                  alt="Attach label"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-[#6B46C1] mb-2">2. ATTACH YOUR SHIPPING LABEL.</h3>
              <p className="text-gray-600">
                Easily create a label online or with your mobile phone. If you already have a label, you're good to go.
              </p>
            </div>

            <div>
              <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&q=80"
                  alt="Drop off"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-[#6B46C1] mb-2">3. DROP OFF AT A LOCATION NEAR YOU.</h3>
              <p className="text-gray-600">
                Take your package and drop off at a retail location, or if your package is under 20" x 12" x 6", you can also use an **Excel-Logistics Drop Box** near you. There's no additional fees for dropping off a package.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">❓</h2>
        <p className="text-xl">
          If you have questions,{" "}
          <Link to="/support" className="text-blue-600 underline">please contact customer support</Link>
        </p>
      </section>
    </div>
  );
};

export default PublicLocations;
