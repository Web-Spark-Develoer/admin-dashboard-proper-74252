import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";

interface ParcelLocation {
  id: number;
  location_text: string;
  latitude: number | null;
  longitude: number | null;
  note: string | null;
  recorded_at: string;
}

interface TrackingMapProps {
  trackingCode: string;
}

export const TrackingMap = ({ trackingCode }: TrackingMapProps) => {
  const [locations, setLocations] = useState<ParcelLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      // First get the parcel ID from tracking code
      const { data: parcelData } = await supabase
        .from("parcels")
        .select("id")
        .eq("tracking_code", trackingCode)
        .single();

      if (parcelData) {
        const { data, error } = await supabase
          .from("parcel_locations")
          .select("*")
          .eq("parcel_id", parcelData.id)
          .order("recorded_at", { ascending: true });

        if (!error && data) {
          setLocations(data);
        }
      }
      setLoading(false);
    };

    fetchLocations();

    // Setup realtime subscription for location updates
    const channel = supabase
      .channel('tracking-locations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'parcel_locations'
        },
        () => {
          fetchLocations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [trackingCode]);

  if (loading) {
    return <p className="text-center text-muted-foreground py-8">Loading tracking info...</p>;
  }

  if (locations.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No tracking information available</p>;
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Tracking History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {locations.map((location, index) => (
            <div key={location.id} className="relative pl-8 pb-8 last:pb-0">
              {/* Timeline line */}
              {index !== locations.length - 1 && (
                <div className="absolute left-3 top-6 bottom-0 w-px bg-border" />
              )}
              
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>

              <div className="space-y-1">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    <h4 className="font-semibold">{location.location_text}</h4>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={12} />
                    {new Date(location.recorded_at).toLocaleString()}
                  </div>
                </div>
                
                {location.note && (
                  <p className="text-sm text-muted-foreground pl-6">{location.note}</p>
                )}
                
                {location.latitude && location.longitude && (
                  <p className="text-xs text-muted-foreground pl-6">
                    Coordinates: {location.latitude}, {location.longitude}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};