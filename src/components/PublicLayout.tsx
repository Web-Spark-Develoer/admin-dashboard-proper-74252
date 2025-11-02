import PublicHeader from "./PublicHeader";
import Footer from "./Footer";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Chat Widget */}
      {chatOpen && (
        <Card className="fixed bottom-24 right-6 w-96 shadow-2xl z-50">
          <CardHeader className="bg-[#FF6B00] text-white">
            <CardTitle className="flex items-center justify-between">
              <span>Excel Logistics Support</span>
              <button onClick={() => setChatOpen(false)} className="text-white hover:text-gray-200">✕</button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="h-64 overflow-y-auto space-y-2 mb-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm">Hello! Welcome to Excel Logistics. How can I help you today?</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Type your message..." />
              <Button className="bg-[#FF6B00] hover:bg-[#E55F00]">Send</Button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              AI chatbot will be connected when backend is ready
            </p>
          </CardContent>
        </Card>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#FF6B00] hover:bg-[#E55F00] rounded-full shadow-lg flex items-center justify-center text-white z-40 transition-transform hover:scale-110"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default PublicLayout;
