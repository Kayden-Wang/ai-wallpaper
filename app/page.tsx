import Image from "next/image";
import WallpaperSection from "./components/sections/wallpaper-section";
import Hero from "./components/sections/hero";
import Footer from "./components/sections/footer";
import Header from "./components/sections/header";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <WallpaperSection initialWallpapers={[]} />
      <Footer />
    </div>
  );
}
