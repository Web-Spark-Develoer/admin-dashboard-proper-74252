import PublicHeader from "./PublicHeader";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default PublicLayout;
