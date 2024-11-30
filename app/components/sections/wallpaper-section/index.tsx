"use client"; // 声明这是一个客户端组件

// 导入必要的依赖
import { useState, useEffect } from "react";
import { Wallpaper } from "@/app/types/wallpaper";
import Input from "./input/input";
import WallpaperList from "./wallpapers/WallpaperList";
import { SupabaseService } from "@/app/service/supabase";
import Loading from "@/app/components/ui/loading";

// 定义每页加载的壁纸数量
const PAGE_SIZE = 60;

export default function WallpaperSection() {
  // 状态管理
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]); // 存储壁纸列表
  const [loading, setLoading] = useState(true); // 控制加载状态
  const [hasMore, setHasMore] = useState(true); // 是否还有更多数据
  const [page, setPage] = useState(0); // 当前页码

  // 从 Supabase 加载壁纸数据的函数
  const loadWallpapers = async (pageNumber: number) => {
    try {
      // 调用 SupabaseService 获取壁纸数据
      const data = await SupabaseService.getWallpapers(pageNumber, PAGE_SIZE);
      if (pageNumber === 0) {
        // 如果是第一页，直接设置数据
        setWallpapers(data);
      } else {
        // 如果是加载更多，将新数据追加到现有数据后面
        setWallpapers((prev) => [...prev, ...data]);
      }
      // 根据返回数据长度判断是否还有更多数据
      setHasMore(data.length === PAGE_SIZE);
    } catch (error) {
      console.error("加载壁纸失败:", error);
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时加载第一页数据
  useEffect(() => {
    loadWallpapers(0);
  }, []);

  // 处理加载更多的事件
  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await loadWallpapers(nextPage);
  };

  // 处理添加新壁纸的事件
  const handleAddWallpaper = async (newWallpaper: Wallpaper) => {
    try {
      // 检查是否已存在相同的壁纸
      if (wallpapers.some((w) => w.img_url === newWallpaper.img_url)) {
        alert("壁纸已存在！");
        return;
      }
      // 将新壁纸添加到列表开头，确保包含完整的用户信息
      setWallpapers([
        {
          ...newWallpaper,
          created_at: newWallpaper.created_at || new Date().toISOString(),
          user: newWallpaper.user || {
            email: "default@example.com",
            nickname: "访客用户",
            avatar_url:
              "https://api.dicebear.com/7.x/personas/svg?seed=default",
          },
        },
        ...wallpapers,
      ]);
    } catch (error) {
      console.error("添加壁纸失败:", error);
    }
  };

  // 加载状态显示 Loading 组件
  if (loading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
        <Loading />
      </div>
    );
  }

  // 渲染主要内容
  return (
    <section>
      {/* 输入组件，用于添加新壁纸 */}
      <Input onAddWallpaper={handleAddWallpaper} />
      {/* 壁纸列表组件，显示所有壁纸 */}
      <WallpaperList
        wallpapers={wallpapers}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
      />
    </section>
  );
}
