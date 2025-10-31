import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Eye, Pencil } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

type Parcel = Tables<"parcels">;

const Parcels = () => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [parcelLocations, setParcelLocations] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    sender_name: "",
    receiver_name: "",
    origin: "",
    destination: "",
    amount: "",
    status: "pending"
  });

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

  useEffect(() => {
    fetchParcels();

    // Setup realtime subscription
    const channel = supabase
      .channel('parcels-changes')
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

  const handleView = async (parcel: Parcel) => {
    setSelectedParcel(parcel);
    // Fetch locations for this parcel
    const { data: locations } = await supabase
      .from('parcel_locations')
      .select('*')
      .eq('parcel_id', parcel.id)
      .order('recorded_at', { ascending: false });
    setParcelLocations(locations || []);
    setViewOpen(true);
  };

  const handleEdit = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setFormData({
      sender_name: parcel.sender_name,
      receiver_name: parcel.receiver_name,
      origin: parcel.origin,
      destination: parcel.destination,
      amount: parcel.amount?.toString() || '',
      status: parcel.status,
    });
    setEditOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedParcel) return;

    const { error } = await supabase
      .from('parcels')
      .update({
        sender_name: formData.sender_name,
        receiver_name: formData.receiver_name,
        origin: formData.origin,
        destination: formData.destination,
        amount: parseFloat(formData.amount),
        status: formData.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', selectedParcel.id);

    if (error) {
      toast.error("Failed to update parcel");
    } else {
      toast.success("Parcel updated successfully");
      fetchParcels();
      setEditOpen(false);
      setSelectedParcel(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    const { error } = await supabase.from("parcels").insert({
      sender_name: formData.sender_name,
      receiver_name: formData.receiver_name,
      origin: formData.origin,
      destination: formData.destination,
      amount: parseFloat(formData.amount),
      status: formData.status,
      created_by: user.id,
    });

    if (error) {
      toast.error("Failed to create parcel");
    } else {
      toast.success("Parcel created successfully");
      setIsDialogOpen(false);
      setFormData({
        sender_name: "",
        receiver_name: "",
        origin: "",
        destination: "",
        amount: "",
        status: "pending"
      });
      fetchParcels();
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string }> = {
      'in_transit': { bg: 'bg-blue-500/20', text: 'text-blue-400' },
      'delivered': { bg: 'bg-green-500/20', text: 'text-green-400' },
      'pending': { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
    };
    const config = statusMap[status] || statusMap['pending'];
    return (
      <Badge className={`${config.bg} ${config.text} border-0 capitalize`}>
        {status.replace("_", " ")}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">📦 Parcel Management</h1>
          <p className="text-muted-foreground text-sm">Manage and track all parcels</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus size={16} className="mr-2" />
              Add Parcel
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>Add New Parcel</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Sender Name</Label>
                <Input
                  value={formData.sender_name}
                  onChange={(e) => setFormData({...formData, sender_name: e.target.value})}
                  required
                  className="bg-secondary/20 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Receiver Name</Label>
                <Input
                  value={formData.receiver_name}
                  onChange={(e) => setFormData({...formData, receiver_name: e.target.value})}
                  required
                  className="bg-secondary/20 border-border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Origin</Label>
                  <Input
                    value={formData.origin}
                    onChange={(e) => setFormData({...formData, origin: e.target.value})}
                    required
                    className="bg-secondary/20 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Destination</Label>
                  <Input
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    required
                    className="bg-secondary/20 border-border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Amount ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="bg-secondary/20 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger className="bg-secondary/20 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Create Parcel
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-card border-border overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <p className="text-center text-muted-foreground py-8">Loading...</p>
          ) : parcels.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No parcels yet. Create your first parcel!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs lg:text-sm font-semibold text-muted-foreground">Tracking ID</th>
                    <th className="text-left py-3 px-4 text-xs lg:text-sm font-semibold text-muted-foreground">Sender</th>
                    <th className="text-left py-3 px-4 text-xs lg:text-sm font-semibold text-muted-foreground">Receiver</th>
                    <th className="text-left py-3 px-4 text-xs lg:text-sm font-semibold text-muted-foreground">Route</th>
                    <th className="text-left py-3 px-4 text-xs lg:text-sm font-semibold text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-4 text-xs lg:text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-xs lg:text-sm font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {parcels.map((parcel) => (
                    <tr key={parcel.id} className="border-b border-dashed border-border hover:bg-secondary/5">
                      <td className="py-3 px-4 font-mono text-xs lg:text-sm font-medium">{parcel.tracking_code}</td>
                      <td className="py-3 px-4 text-xs lg:text-sm">{parcel.sender_name}</td>
                      <td className="py-3 px-4 text-xs lg:text-sm">{parcel.receiver_name}</td>
                      <td className="py-3 px-4 text-xs lg:text-sm">
                        <span>{parcel.origin}</span>
                        <span className="mx-1 text-muted-foreground">→</span>
                        <span>{parcel.destination}</span>
                      </td>
                      <td className="py-3 px-4 text-xs lg:text-sm">${parcel.amount?.toLocaleString()}</td>
                      <td className="py-3 px-4">{getStatusBadge(parcel.status)}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-1">
                          <button 
                            onClick={() => handleView(parcel)}
                            className="bg-transparent border border-white/10 text-white px-2 py-1 rounded-lg hover:bg-white/5 transition-colors text-xs"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => handleEdit(parcel)}
                            className="bg-transparent border border-white/10 text-white px-2 py-1 rounded-lg hover:bg-white/5 transition-colors text-xs"
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Modal */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle>Parcel Details</DialogTitle>
          </DialogHeader>
          {selectedParcel && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-xs">Tracking Code</Label>
                  <p className="font-mono text-base lg:text-lg font-bold">{selectedParcel.tracking_code}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedParcel.status)}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-xs">Sender</Label>
                  <p className="text-sm lg:text-base">{selectedParcel.sender_name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Receiver</Label>
                  <p className="text-sm lg:text-base">{selectedParcel.receiver_name}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-xs">Origin</Label>
                  <p className="text-sm lg:text-base">{selectedParcel.origin}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Destination</Label>
                  <p className="text-sm lg:text-base">{selectedParcel.destination}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Amount</Label>
                <p className="text-lg lg:text-xl font-bold">${selectedParcel.amount?.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Location History</Label>
                <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                  {parcelLocations.length > 0 ? (
                    parcelLocations.map((loc) => (
                      <div key={loc.id} className="border border-white/10 rounded-lg p-3">
                        <p className="font-medium text-sm">{loc.location_text}</p>
                        {loc.note && <p className="text-xs text-muted-foreground">{loc.note}</p>}
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(loc.recorded_at).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No location history yet</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Edit Parcel</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <Label className="text-xs">Tracking Code (Read-only)</Label>
              <Input value={selectedParcel?.tracking_code || ''} disabled className="font-mono bg-secondary/20" />
            </div>
            <div>
              <Label className="text-xs">Sender Name</Label>
              <Input
                value={formData.sender_name}
                onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                required
                className="bg-secondary/20 border-border"
              />
            </div>
            <div>
              <Label className="text-xs">Receiver Name</Label>
              <Input
                value={formData.receiver_name}
                onChange={(e) => setFormData({ ...formData, receiver_name: e.target.value })}
                required
                className="bg-secondary/20 border-border"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs">Origin</Label>
                <Input
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  required
                  className="bg-secondary/20 border-border"
                />
              </div>
              <div>
                <Label className="text-xs">Destination</Label>
                <Input
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  required
                  className="bg-secondary/20 border-border"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Amount ($)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
                className="bg-secondary/20 border-border"
              />
            </div>
            <div>
              <Label className="text-xs">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="bg-secondary/20 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Update Parcel
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Parcels;