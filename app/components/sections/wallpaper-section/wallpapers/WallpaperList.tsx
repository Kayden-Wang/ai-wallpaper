// 导入必要的类型和工具函数
import { Wallpaper } from "@/app/types/wallpaper";
import { formatDate } from "@/app/utils/date";
import DefaultAvatar from "./DefaultAvatar";
import { useState } from "react";

// 定义组件的Props接口
interface WallpaperListProps {
  wallpapers: Wallpaper[]; // 壁纸数组
  onLoadMore: () => Promise<void>; // 加载更多的回调函数
  hasMore: boolean; // 是否还有更多数据
}

export default function WallpaperList({
  wallpapers,
  onLoadMore,
  hasMore,
}: WallpaperListProps) {
  // 控制"加载更多"按钮的loading状态
  const [loadingMore, setLoadingMore] = useState(false);

  // 处理加载更多的点击事件
  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      await onLoadMore();
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    // 主容器section, 使用渐变背景
    <section className="bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50">
      {/* 内容容器, 控制最大宽度和内边距 */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="flex flex-col items-center">
          {/* 网格布局容器, 响应式列数(sm:2列, md:3列) */}
          <div className="mb-6 grid gap-6 sm:grid-cols-2 sm:justify-items-stretch md:mb-10 md:grid-cols-3 lg:mb-12 lg:gap-8">
            {wallpapers.map((wallpaper, index) => (
              // 单个壁纸卡片
              <div
                key={index}
                className="group flex flex-col gap-2 rounded-2xl cursor-pointer
                         bg-gradient-to-br from-white/95 to-white/90 dark:from-gray-800/95 dark:to-gray-900/90
                         border border-white/20 dark:border-gray-700/30
                         shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
                         hover:scale-[1.02]" // 悬停时放大效果
              >
                {/* 图片容器 */}
                <div className="h-60 w-full overflow-hidden rounded-t-2xl">
                  <img
                    src={wallpaper.img_url}
                    alt={wallpaper.description}
                    className="h-full w-full object-cover transform transition-transform duration-300 
                             group-hover:scale-105" // 悬停时图片放大
                  />
                </div>
                {/* 内容区域 */}
                <div className="px-6 pb-5 pt-3 flex-1 relative">
                  {/* 标签 */}
                  <p className="text-sm font-semibold uppercase text-blue-500/80 dark:text-blue-400/80">
                    AI壁纸
                  </p>
                  {/* 描述文本 */}
                  <p className="mb-2 text-lg pt-1 font-semibold text-gray-800 dark:text-gray-100">
                    {wallpaper.description}
                  </p>
                  {/* 图片尺寸标签 */}
                  <p
                    className="absolute bottom-5 right-6 text-sm text-gray-500 dark:text-gray-400
                              bg-gray-100/80 dark:bg-gray-800/80 px-2 py-1 rounded-md"
                  >
                    {wallpaper.img_size || "1792x1024"}
                  </p>
                  {/* 用户信息区域 */}
                  <div className="flex items-center mt-2">
                    {/* 用户头像 */}
                    <div className="mr-4 h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src={wallpaper.user?.avatar_url}
                        alt=""
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = DefaultAvatar({
                            seed: wallpaper.user?.email || "default",
                            size: 40,
                          });
                        }}
                      />
                    </div>
                    {/* 用户名称和创建时间 */}
                    <div className="flex flex-col pt-3">
                      <h6 className="text-base font-bold text-gray-800 dark:text-gray-100">
                        {wallpaper.user?.nickname || "访客用户"}
                      </h6>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(wallpaper.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 加载更多按钮 */}
          {hasMore && (
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 
                       hover:from-blue-600 hover:to-indigo-600 text-white font-semibold 
                       rounded-lg transition-all hover:shadow-lg hover:scale-105
                       disabled:opacity-70 disabled:cursor-not-allowed" // 禁用状态样式
            >
              {loadingMore ? "加载中..." : "加载更多"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
