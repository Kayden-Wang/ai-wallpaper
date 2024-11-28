"use client";

import { Wallpaper } from "@/app/types/wallpaper";
import Input from "./input/input";
import { useState } from "react";
import WallpaperList from "./wallpapers/WallpaperList";

interface WallpaperSectionProps {
  initialWallpapers: Wallpaper[];
}

export default function WallpaperSection({
  initialWallpapers,
}: WallpaperSectionProps) {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>(initialWallpapers);

  /**
   * 处理添加单个壁纸的异步函数
   * @param newWallpaper - 需要添加的新壁纸对象,类型为 Wallpaper
   * @returns {Promise<void>} - 可以把它理解为一个"承诺"，表示一个异步操作最终会有一个结果。
   */
  const handleAddWallpaper = async (newWallpaper: Wallpaper) => {
    try {
      // 检查新壁纸是否已存在于当前壁纸数组中
      // 通过 some() 方法遍历数组,比较 img_url 是否重复
      if (wallpapers.some((w) => w.img_url === newWallpaper.img_url)) {
        alert("壁纸已存在！");
        return; // 如果壁纸已存在则直接返回,不执行后续添加操作
      }

      // 使用展开运算符创建新数组,将新壁纸添加到现有壁纸数组开头
      // 通过 setWallpapers 更新状态,触发重新渲染
      setWallpapers([newWallpaper, ...wallpapers]);
    } catch (error) {
      // 捕获并打印添加过程中的任何错误
      console.error("添加壁纸失败:", error);
    }
  };

  return (
    <section>
      <Input onAddWallpaper={handleAddWallpaper} />
      <WallpaperList wallpapers={wallpapers} />
    </section>
  );
}
