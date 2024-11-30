import Image from "next/image";
import WallpaperSection from "./components/sections/wallpaper-section";
import Hero from "./components/sections/hero";
import Footer from "./components/sections/footer";
import Header from "./components/sections/header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <Hero />
        <WallpaperSection />
      </main>
      <Footer />
    </div>
  );
}

// original UI

// export default function Home() {
//   return (
//     <div>
//       <Header />
//       <Hero />
//       <WallpaperSection initialWallpapers={[]} />
//       <Footer />
//     </div>
//   );
// }
