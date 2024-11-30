import { createClient } from "@supabase/supabase-js";
import { Wallpaper } from "../types/wallpaper";
import { User } from "../types/user";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

// 创建 Supabase 客户端实例
export const supabase = createClient(supabaseUrl, supabaseKey);

export class SupabaseService {
  // 添加默认用户信息
  private static readonly DEFAULT_USER = {
    email: "default@example.com",
    nickname: "访客用户",
    avatar_url: "https://api.dicebear.com/7.x/personas/svg?seed=",
  };

  // 获取或创建默认用户
  static async getOrCreateDefaultUser(): Promise<User> {
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", this.DEFAULT_USER.email)
      .single();

    if (existingUser) {
      return existingUser;
    }

    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([this.DEFAULT_USER])
      .select()
      .single();

    if (insertError) {
      console.error("创建默认用户失败:", insertError);
      throw insertError;
    }

    return newUser;
  }

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
    // 获取默认用户
    const defaultUser = await this.getOrCreateDefaultUser();

    const { data, error } = await supabase
      .from("wallpapers")
      .insert([
        {
          ...wallpaper,
          user_id: defaultUser.id,
          model_used: wallpaper.model_used || "dall-e-3",
          created_at: new Date().toISOString(),
        },
      ])
      .select(
        `
        *,
        user:users(
          id,
          email,
          nickname,
          avatar_url
        )
      `
      )
      .single();

    if (error) {
      console.error("插入壁纸失败:", error);
      throw error;
    }

    return data;
  }

  // 修改获取壁纸的方法,添加用户信息关联查询
  static async getWallpapers(
    page: number,
    pageSize: number
  ): Promise<Wallpaper[]> {
    const { data, error } = await supabase
      .from("wallpapers")
      .select(
        `
        *,
        user:users(*)
      `
      )
      .order("created_at", { ascending: false })
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error) {
      console.error("获取壁纸失败:", error);
      throw error;
    }

    return data || [];
  }
}
