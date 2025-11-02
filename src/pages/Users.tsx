import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Check, X } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { toast } from "sonner";

type AdminUser = Tables<"admin_users">;

const Users = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    role: "user",
    password: ""
  });

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setUsers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();

    // Setup realtime subscription
    const channel = supabase
      .channel('admin-users-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'admin_users'
        },
        () => {
          fetchUsers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create user in auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.full_name
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Add user to admin_users table
        const { error: insertError } = await supabase
          .from("admin_users")
          .insert({
            id: crypto.randomUUID(),
            full_name: formData.full_name,
            email: formData.email,
            role: formData.role,
            status: "active"
          });

        if (insertError) throw insertError;

        toast.success("User created successfully. Please verify their email.");
        setIsDialogOpen(false);
        setFormData({ email: "", full_name: "", role: "user", password: "" });
        fetchUsers();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create user");
    }
  };

  const handleVerifyUser = async (userId: string) => {
    const { error } = await supabase
      .from("admin_users")
      .update({ verified: true })
      .eq("id", userId);

    if (error) {
      toast.error("Failed to verify user");
    } else {
      toast.success("User verified successfully");
      fetchUsers();
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const { error } = await supabase
      .from("admin_users")
      .delete()
      .eq("id", userId);

    if (error) {
      toast.error("Failed to delete user");
    } else {
      toast.success("User deleted successfully");
      fetchUsers();
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active" 
      ? "bg-green-500/10 text-green-500 border-green-500/20"
      : "bg-red-500/10 text-red-500 border-red-500/20";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">Users</h1>
          <p className="text-gray-400">Manage admin users and permissions</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#6B7FC1] text-white hover:bg-[#6B7FC1]/90">
              <Plus size={16} className="mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1f37] border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Admin User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  required
                  className="bg-secondary/20 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="bg-secondary/20 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  minLength={6}
                  className="bg-secondary/20 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                  <SelectTrigger className="bg-secondary/20 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Create User
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground py-8">Loading...</p>
          ) : users.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No users found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Verified</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-dashed border-border hover:bg-secondary/5">
                      <td className="py-3 px-4 font-medium">{user.full_name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20 capitalize">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium border capitalize ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {user.verified ? (
                          <span className="flex items-center text-green-500 text-sm">
                            <Check size={16} className="mr-1" />
                            Verified
                          </span>
                        ) : (
                          <span className="flex items-center text-yellow-500 text-sm">
                            <X size={16} className="mr-1" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          {!user.verified && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-border"
                              onClick={() => handleVerifyUser(user.id)}
                            >
                              Verify
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-border text-destructive"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Delete
                          </Button>
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
    </div>
  );
};

export default Users;