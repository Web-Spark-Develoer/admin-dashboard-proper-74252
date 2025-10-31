import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrackingMap } from "@/components/TrackingMap";
import { Search } from "lucide-react";
import { toast } from "sonner";

const Tracking = () => {
  const [trackingCode, setTrackingCode] = useState("");
  const [searchedCode, setSearchedCode] = useState("");
  const [parcelInfo, setParcelInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from("parcels")
      .select("*")
      .eq("tracking_code", trackingCode.toUpperCase())
      .single();

    if (error || !data) {
      toast.error("Parcel not found");
      setParcelInfo(null);
      setSearchedCode("");
    } else {
      setParcelInfo(data);
      setSearchedCode(trackingCode.toUpperCase());
      toast.success("Parcel found!");
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-500";
      case "in_transit":
        return "text-blue-500";
      case "pending":
        return "text-yellow-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Track Your Parcel</h1>
        <p className="text-muted-foreground">Enter your tracking code to see parcel status</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Enter Tracking Code</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Label>Tracking Code</Label>
              <div className="flex gap-2">
                <Input
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  placeholder="PLK00000001"
                  required
                  className="bg-secondary/20 border-border"
                />
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Search size={16} className="mr-2" />
                  Track
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {parcelInfo && (
        <>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Parcel Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tracking Code</p>
                  <p className="font-mono font-semibold">{parcelInfo.tracking_code}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className={`font-semibold capitalize ${getStatusColor(parcelInfo.status)}`}>
                    {parcelInfo.status.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sender</p>
                  <p className="font-medium">{parcelInfo.sender_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Receiver</p>
                  <p className="font-medium">{parcelInfo.receiver_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Origin</p>
                  <p className="font-medium">{parcelInfo.origin}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Destination</p>
                  <p className="font-medium">{parcelInfo.destination}</p>
                </div>
                {parcelInfo.amount && (
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-medium">${parcelInfo.amount.toFixed(2)}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">
                    {new Date(parcelInfo.updated_at || parcelInfo.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <TrackingMap trackingCode={searchedCode} />
        </>
      )}
    </div>
  );
};

export default Tracking;