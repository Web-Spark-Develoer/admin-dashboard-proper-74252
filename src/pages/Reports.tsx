import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tables } from "@/integrations/supabase/types";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Download } from "lucide-react";
import { toast } from "sonner";

type Parcel = Tables<"parcels">;

const Reports = () => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParcels = async () => {
      const { data, error } = await supabase
        .from("parcels")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setParcels(data);
      }
      setLoading(false);
    };

    fetchParcels();

    // Setup realtime subscription
    const channel = supabase
      .channel('reports-parcels-changes')
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

  const exportToCSV = () => {
    if (parcels.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = ["Date", "Parcel ID", "Status", "Customer", "Amount"];
    const csvData = parcels.map(p => [
      new Date(p.created_at).toLocaleDateString(),
      p.tracking_code,
      p.status.replace("_", " "),
      p.sender_name,
      `$${(p.amount || 0).toFixed(2)}`
    ]);

    const csv = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reports-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Report exported successfully");
  };

  const stats = {
    total: parcels.length,
    delivered: parcels.filter(p => p.status === "delivered").length,
    pending: parcels.filter(p => p.status === "pending").length,
    revenue: parcels.reduce((sum, p) => sum + (p.amount || 0), 0),
  };

  // Generate chart data
  const chartData = parcels.slice(0, 5).map(p => ({
    date: new Date(p.created_at).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }),
    delivered: p.status === "delivered" ? 1 : 0,
    pending: p.status === "pending" ? 1 : 0,
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports Overview</h1>
          <p className="text-muted-foreground">Analytics and statistics</p>
        </div>
        <Button 
          onClick={exportToCSV}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Download size={16} className="mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Parcels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "hsl(var(--status-delivered))" }}>{stats.delivered}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "hsl(var(--status-pending))" }}>{stats.pending}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${stats.revenue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Parcel Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--status-delivered))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--status-delivered))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--status-pending))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--status-pending))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="delivered"
                  stroke="hsl(var(--status-delivered))"
                  fillOpacity={1}
                  fill="url(#colorDelivered)"
                  name="Delivered"
                />
                <Area
                  type="monotone"
                  dataKey="pending"
                  stroke="hsl(var(--status-pending))"
                  fillOpacity={1}
                  fill="url(#colorPending)"
                  name="Pending"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground py-8">Loading...</p>
          ) : parcels.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No data available</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Parcel ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Customer</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {parcels.map((parcel) => (
                    <tr key={parcel.id} className="border-b border-dashed border-border">
                      <td className="py-3 px-4 text-sm">
                        {new Date(parcel.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-mono text-sm">{parcel.tracking_code}</td>
                      <td className="py-3 px-4 capitalize">{parcel.status.replace("_", " ")}</td>
                      <td className="py-3 px-4">{parcel.sender_name}</td>
                      <td className="py-3 px-4 text-right font-medium">
                        ${(parcel.amount || 0).toFixed(2)}
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

export default Reports;