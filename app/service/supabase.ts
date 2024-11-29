import { createClient } from "@supabase/supabase-js";
import { Wallpaper } from "../types/wallpaper";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

// 创建 Supabase 客户端实例
export const supabase = createClient(supabaseUrl, supabaseKey);

export class SupabaseService {
  // 获取所有壁纸
  static async getAllWallpapers(): Promise<Wallpaper[]> {
    const { data, error } = await supabase
      .from("wallpapers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("获取壁纸失败:", error);
      throw error;
    }

    return data || [];
  }

  // 插入新壁纸
  static async insertWallpaper(wallpaper: Wallpaper): Promise<Wallpaper> {
    const { data, error } = await supabase
      .from("wallpapers")
      .insert([
        {
          ...wallpaper,
          user_email: wallpaper.user_email || "default@example.com",
          user_nickname: wallpaper.user_nickname || "访客用户",
          user_avatar: wallpaper.user_avatar || "/default-avatar.png",
          model_used: wallpaper.model_used || "dall-e-3",
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("插入壁纸失败:", error);
      throw error;
    }

    return data;
  }

  static async getWallpapers(
    page: number,
    pageSize: number
  ): Promise<Wallpaper[]> {
    const { data, error } = await supabase
      .from("wallpapers")
      .select("*")
      .order("created_at", { ascending: false })
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error) {
      console.error("获取壁纸失败:", error);
      throw error;
    }

    return data || [];
  }
}
