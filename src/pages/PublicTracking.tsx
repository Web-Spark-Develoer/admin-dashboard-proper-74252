import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Package, Calendar, User } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const PublicTracking = () => {
  const [searchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState(searchParams.get("id") || "");
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'delivered') return 'bg-green-500';
    if (statusLower === 'in transit' || statusLower === 'in-transit') return 'bg-blue-500';
    if (statusLower === 'pending') return 'bg-yellow-500';
    if (statusLower === 'out for delivery') return 'bg-orange-500';
    return 'bg-gray-500';
  };

  const handleTrack = async () => {
    if (!trackingId.trim()) {
      toast.error("Please enter a tracking ID");
      return;
    }

    setLoading(true);
    
    try {
      // Try to fetch from parcels table first
      const { data: parcelData, error: parcelError } = await supabase
        .from('parcels')
        .select(`
          *,
          parcel_locations (
            location_text,
            recorded_at,
            note
          )
        `)
        .eq('tracking_code', trackingId)
        .order('recorded_at', { foreignTable: 'parcel_locations', ascending: true });

      if (parcelData && parcelData.length > 0) {
        const parcel = parcelData[0] as any;
        setTrackingData({
          trackingCode: parcel.tracking_code,
          status: parcel.status,
          origin: parcel.origin,
          destination: parcel.destination,
          senderName: parcel.sender_name,
          receiverName: parcel.receiver_name,
          currentLocation: parcel.parcel_locations?.[parcel.parcel_locations.length - 1]?.location_text || 'Processing',
          estimatedDelivery: parcel.estimated_delivery 
            ? new Date(parcel.estimated_delivery).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : 'TBD',
          amount: parcel.amount ? `$${parseFloat(parcel.amount).toFixed(2)}` : 'N/A',
          locations: parcel.parcel_locations?.map((loc: any) => ({
            location: loc.location_text,
            date: new Date(loc.recorded_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: loc.note || 'Processed'
          })) || []
        });
        setLoading(false);
        return;
      }

      // If not found in parcels, try shipments table (use any to bypass type checking for new table)
      const { data: shipmentData, error: shipmentError } = await (supabase as any)
        .from('shipments')
        .select('*')
        .eq('tracking_code', trackingId);

      if (shipmentData && shipmentData.length > 0) {
        const shipment = shipmentData[0];
        setTrackingData({
          trackingCode: shipment.tracking_code,
          status: shipment.status,
          origin: shipment.sender_address,
          destination: shipment.receiver_address,
          senderName: shipment.sender_name,
          receiverName: shipment.receiver_name,
          currentLocation: 'Processing at origin facility',
          estimatedDelivery: 'TBD',
          amount: shipment.amount ? `$${parseFloat(shipment.amount).toFixed(2)}` : 'N/A',
          locations: [
            {
              location: shipment.sender_address,
              date: new Date(shipment.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              status: 'Shipment created'
            }
          ]
        });
      } else {
        toast.error("Tracking ID not found");
        setTrackingData(null);
      }
    } catch (error) {
      console.error('Tracking error:', error);
      toast.error("Failed to fetch tracking information");
    } finally {
      setLoading(false);
    }
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
                <CardTitle className="flex items-center gap-2 flex-wrap">
                  <Package className="text-primary" />
                  <span>Tracking ID: {trackingData.trackingCode}</span>
                  <Badge className={`${getStatusColor(trackingData.status)} text-white`}>
                    {trackingData.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Current Location</p>
                    <p className="font-semibold text-foreground">{trackingData.currentLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                    <p className="font-semibold text-foreground">{trackingData.estimatedDelivery}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Shipping Cost</p>
                    <p className="font-semibold text-primary">{trackingData.amount}</p>
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
                    <User className="text-primary mt-1" size={20} />
                    <div>
                      <p className="text-sm text-muted-foreground">Sender</p>
                      <p className="font-semibold text-foreground">{trackingData.senderName}</p>
                      <p className="text-sm text-muted-foreground">{trackingData.origin}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="text-primary mt-1" size={20} />
                    <div>
                      <p className="text-sm text-muted-foreground">Receiver</p>
                      <p className="font-semibold text-foreground">{trackingData.receiverName}</p>
                      <p className="text-sm text-muted-foreground">{trackingData.destination}</p>
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
                  {trackingData.locations.length > 0 ? (
                    trackingData.locations.map((loc: any, index: number) => (
                      <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                        <div className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full ${
                            index === trackingData.locations.length - 1 ? 'bg-primary' : 'bg-green-500'
                          }`} />
                          {index < trackingData.locations.length - 1 && (
                            <div className="w-0.5 h-12 bg-border my-1" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin size={16} className="text-muted-foreground" />
                            <p className="font-semibold text-foreground">{loc.location}</p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                            <Calendar size={14} />
                            <span>{loc.date}</span>
                            <span className="mx-2">•</span>
                            <span className={
                              index === trackingData.locations.length - 1 
                                ? 'text-primary font-semibold' 
                                : 'text-green-600'
                            }>{loc.status}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No tracking history available yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Shipment Route</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary rounded-lg h-64 flex items-center justify-center border">
                  <p className="text-muted-foreground">Interactive map coming soon</p>
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
