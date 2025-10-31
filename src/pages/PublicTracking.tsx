import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Package, Calendar, User } from "lucide-react";
import { toast } from "sonner";

const PublicTracking = () => {
  const [searchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState(searchParams.get("id") || "");
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!trackingId.trim()) {
      toast.error("Please enter a tracking ID");
      return;
    }

    setLoading(true);
    
    // TODO: Connect to backend when ready
    // For now, show placeholder data
    setTimeout(() => {
      setTrackingData({
        trackingCode: trackingId,
        status: "In Transit",
        origin: "New York, NY",
        destination: "Los Angeles, CA",
        senderName: "John Doe",
        receiverName: "Jane Smith",
        currentLocation: "Chicago, IL Distribution Center",
        estimatedDelivery: "Dec 25, 2025",
        amount: "$150.00",
        locations: [
          { location: "New York, NY - Origin", date: "Dec 20, 2025", status: "Picked up" },
          { location: "Philadelphia, PA Hub", date: "Dec 21, 2025", status: "In Transit" },
          { location: "Chicago, IL Distribution Center", date: "Dec 23, 2025", status: "Current Location" },
          { location: "Los Angeles, CA", date: "Dec 25, 2025", status: "Estimated Delivery" },
        ]
      });
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (searchParams.get("id")) {
      handleTrack();
    }
  }, []);

  return (
    <div className="min-h-screen py-12 md:py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">Track Your Parcel</h1>

        <div className="flex gap-2 mb-12">
          <Input
            placeholder="Enter tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
            className="flex-1 h-12"
          />
          <Button 
            onClick={handleTrack}
            disabled={loading}
            className="bg-primary hover:bg-primary/90 h-12 px-8"
          >
            {loading ? "Tracking..." : "Track"}
          </Button>
        </div>

        {trackingData && (
          <div className="space-y-6">
            {/* Tracking Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="text-[#FF6B00]" />
                  Tracking ID: {trackingData.trackingCode}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <p className="font-semibold text-lg">{trackingData.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Current Location</p>
                    <p className="font-semibold">{trackingData.currentLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                    <p className="font-semibold">{trackingData.estimatedDelivery}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Shipping Cost</p>
                    <p className="font-semibold text-green-600">{trackingData.amount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Shipment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <User className="text-[#FF6B00] mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Sender</p>
                      <p className="font-semibold">{trackingData.senderName}</p>
                      <p className="text-sm text-gray-600">{trackingData.origin}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="text-[#FF6B00] mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Receiver</p>
                      <p className="font-semibold">{trackingData.receiverName}</p>
                      <p className="text-sm text-gray-600">{trackingData.destination}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Tracking History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingData.locations.map((loc: any, index: number) => (
                    <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${
                          loc.status === 'Current Location' ? 'bg-[#FF6B00]' : 
                          loc.status === 'Estimated Delivery' ? 'bg-gray-300' : 
                          'bg-green-500'
                        }`} />
                        {index < trackingData.locations.length - 1 && (
                          <div className="w-0.5 h-12 bg-gray-300 my-1" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin size={16} className="text-gray-500" />
                          <p className="font-semibold">{loc.location}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={14} />
                          <span>{loc.date}</span>
                          <span className="mx-2">•</span>
                          <span className={
                            loc.status === 'Current Location' ? 'text-[#FF6B00] font-semibold' :
                            loc.status === 'Estimated Delivery' ? 'text-gray-500 italic' :
                            'text-green-600'
                          }>{loc.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Shipment Route</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <p className="text-gray-500">Map will be displayed here when backend is connected</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicTracking;
