import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, TrendingUp, Clock } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type Parcel = Tables<"parcels">;

const Dashboard = () => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParcels = async () => {
      const { data, error } = await supabase
        .from("parcels")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (!error && data) {
        setParcels(data);
      }
      setLoading(false);
    };

    fetchParcels();

    // Setup realtime subscription
    const channel = supabase
      .channel('dashboard-parcels-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'parcels'
        },
        () => {
          fetchParcels();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const stats = {
    total: parcels.length,
    delivered: parcels.filter(p => p.status === "delivered").length,
    inTransit: parcels.filter(p => p.status === "in_transit").length,
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
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of parcel management system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Parcels</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Transit</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inTransit}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Delivered</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.delivered}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Parcels */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Parcels</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground py-8">Loading...</p>
          ) : parcels.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No parcels yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tracking ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Sender</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Receiver</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Origin → Destination</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {parcels.map((parcel) => (
                    <tr key={parcel.id} className="border-b border-dashed border-border">
                      <td className="py-3 px-4 font-mono text-sm">{parcel.tracking_code}</td>
                      <td className="py-3 px-4">{parcel.sender_name}</td>
                      <td className="py-3 px-4">{parcel.receiver_name}</td>
                      <td className="py-3 px-4 text-sm">{parcel.origin} → {parcel.destination}</td>
                      <td className="py-3 px-4">
                        <span className={`text-sm font-medium capitalize ${getStatusColor(parcel.status)}`}>
                          {parcel.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(parcel.updated_at || parcel.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;