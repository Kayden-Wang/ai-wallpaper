import { Wallpaper } from "@/app/types/wallpaper";

interface WallpaperListProps {
  wallpapers: Wallpaper[];
}

export default function WallpaperList({ wallpapers }: WallpaperListProps) {
  return (
    // bg-gradient-to-b: 背景渐变方向从上到下
    // from-transparent: 渐变起始色为透明
    // to-gray-50/50: 渐变结束色为浅灰色,透明度50%
    // dark:to-gray-900/50: 暗色模式下渐变结束色为深灰色,透明度50%
    <section className="bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50">
      {/* mx-auto: 水平居中
          w-full: 宽度100%
          max-w-7xl: 最大宽度80rem
          px-5: 左右内边距1.25rem
          py-16: 上下内边距4rem
          md:px-10: 中等屏幕左右内边距2.5rem
          md:py-20: 中等屏幕上下内边距5rem */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        {/* flex: 弹性布局
            flex-col: 垂直方向排列
            items-center: 水平居中对齐 */}
        <div className="flex flex-col items-center">
          {/* mb-6: 下外边距1.5rem
              grid: 网格布局
              gap-6: 网格间距1.5rem
              sm:grid-cols-2: 小屏幕2列
              md:grid-cols-3: 中等屏幕3列
              lg:gap-8: 大屏幕网格间距2rem */}
          <div className="mb-6 grid gap-6 sm:grid-cols-2 sm:justify-items-stretch md:mb-10 md:grid-cols-3 lg:mb-12 lg:gap-8">
            {wallpapers.map((wallpaper, index) => (
              // group: 用于group-hover等群组效果
              // flex-col: 垂直排列
              // gap-2: 子元素间距0.5rem
              // rounded-2xl: 圆角1rem
              // cursor-pointer: 鼠标指针样式
              // bg-gradient-to-br: 背景渐变从左上到右下
              // hover:scale-[1.02]: 悬停时放大1.02倍
              <div
                key={index}
                className="group flex flex-col gap-2 rounded-2xl cursor-pointer
                         bg-gradient-to-br from-white/95 to-white/90 dark:from-gray-800/95 dark:to-gray-900/90
                         border border-white/20 dark:border-gray-700/30
                         shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
                         hover:scale-[1.02]"
              >
                {/* h-60: 高度15rem
                    overflow-hidden: 溢出隐藏
                    rounded-t-2xl: 上方圆角1rem */}
                <div className="h-60 w-full overflow-hidden rounded-t-2xl">
                  {/* object-cover: 图片填充方式
                      group-hover:scale-105: 群组悬停时放大1.05倍 */}
                  <img
                    src={wallpaper.img_url}
                    alt={wallpaper.description}
                    className="h-full w-full object-cover transform transition-transform duration-300 
                             group-hover:scale-105"
                  />
                </div>
                {/* px-6: 左右内边距1.5rem
                    pb-5: 下内边距1.25rem
                    pt-3: 上内边距0.75rem
                    flex-1: 弹性增长系数1
                    relative: 相对定位 */}
                <div className="px-6 pb-5 pt-3 flex-1 relative">
                  {/* text-sm: 字体大小0.875rem
                      font-semibold: 字体粗细600
                      uppercase: 文字大写
                      text-blue-500/80: 蓝色文字,透明度80% */}
                  <p className="text-sm font-semibold uppercase text-blue-500/80 dark:text-blue-400/80">
                    AI壁纸
                  </p>
                  <p className="mb-2 text-lg pt-1 font-semibold text-gray-800 dark:text-gray-100">
                    {wallpaper.description}
                  </p>
                  {/* absolute: 绝对定位
                      bottom-5: 距底部1.25rem
                      right-6: 距右侧1.5rem */}
                  <p
                    className="absolute bottom-5 right-6 text-sm text-gray-500 dark:text-gray-400
                              bg-gray-100/80 dark:bg-gray-800/80 px-2 py-1 rounded-md"
                  >
                    {wallpaper.img_size || "1792x1024"}
                  </p>
                  {/* flex: 弹性布局
                      items-center: 垂直居中对齐
                      mt-2: 上外边距0.5rem */}
                  <div className="flex items-center mt-2">
                    {/* mr-4: 右外边距1rem
                        h-10: 高度2.5rem
                        w-10: 宽度2.5rem
                        rounded-full: 完全圆角 */}
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
                    {/* flex-col: 垂直排列
                        pt-3: 上内边距0.75rem */}
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
