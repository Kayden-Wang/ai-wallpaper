import { Wallpaper } from "@/app/types/wallpaper";

interface WallpaperListProps {
  wallpapers: Wallpaper[];
}

export default function WallpaperList({ wallpapers }: WallpaperListProps) {
  return (
    <section className="bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="flex flex-col items-center">
          <div className="mb-6 grid gap-6 sm:grid-cols-2 sm:justify-items-stretch md:mb-10 md:grid-cols-3 lg:mb-12 lg:gap-8">
            {wallpapers.map((wallpaper, index) => (
              <div
                key={index}
                className="group flex flex-col gap-2 rounded-2xl cursor-pointer
                         bg-gradient-to-br from-white/95 to-white/90 dark:from-gray-800/95 dark:to-gray-900/90
                         border border-white/20 dark:border-gray-700/30
                         shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
                         hover:scale-[1.02]"
              >
                <div className="h-60 w-full overflow-hidden rounded-t-2xl">
                  <img
                    src={wallpaper.img_url}
                    alt={wallpaper.description}
                    className="h-full w-full object-cover transform transition-transform duration-300 
                             group-hover:scale-105"
                  />
                </div>
                <div className="px-6 pb-5 pt-3 flex-1 relative">
                  <p className="text-sm font-semibold uppercase text-blue-500/80 dark:text-blue-400/80">
                    AI壁纸
                  </p>
                  <p className="mb-2 text-lg pt-1 font-semibold text-gray-800 dark:text-gray-100">
                    {wallpaper.description}
                  </p>
                  <p
                    className="absolute bottom-5 right-6 text-sm text-gray-500 dark:text-gray-400
                              bg-gray-100/80 dark:bg-gray-800/80 px-2 py-1 rounded-md"
                  >
                    {wallpaper.img_size || "1792x1024"}
                  </p>
                  <div className="flex items-center mt-2">
                    <div
                      className="mr-4 h-10 w-10 rounded-full overflow-hidden 
                                  bg-gradient-to-br from-blue-500 to-indigo-500"
                    >
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPLaceholder%20Image%20Secondary.svg?alt=media&token=b8276192-19ff-4dd9-8750-80bc5f7d6844"
                        alt=""
                        className="h-full w-full object-cover opacity-80"
                      />
                    </div>
                    <div className="flex flex-col pt-3">
                      <h6 className="text-base font-bold text-gray-800 dark:text-gray-100">
                        AI 创作
                      </h6>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
