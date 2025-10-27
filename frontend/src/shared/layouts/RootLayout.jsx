import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function RootLayout() {

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-sphere-deep-space via-sphere-graphite to-sphere-deep-space">
      <Header />
      <main className="flex-1 bg-sphere-mist">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
