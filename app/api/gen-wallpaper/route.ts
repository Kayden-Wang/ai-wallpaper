// 导入所需的依赖
import { auth, currentUser } from "@clerk/nextjs/server"; // 用于身份验证和获取当前用户信息
import { NextResponse } from "next/server"; // Next.js 的响应工具
import { getOpenAIClient } from "@/app/service/openai"; // OpenAI API 客户端
import { AzureStorageService } from "@/app/service/azure-storage"; // Azure 存储服务
import { SupabaseService } from "@/app/service/supabase"; // Supabase 数据库服务

// 处理 POST 请求的主函数
export async function POST(req: Request) {
  // 获取用户认证信息和环境变量
  const { userId } = await auth();
  const isDev = process.env.NEXT_PUBLIC_ENV === "DEV";

  // 非开发环境下验证用户登录状态
  if (!userId && !isDev) {
    return NextResponse.json(
      { code: 401, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    console.log("开始处理请求...");
    // 从请求体中获取描述文本
    const { description } = await req.json();
    console.log("请求参数:", description);

    // 验证描述文本是否存在
    if (!description) {
      return NextResponse.json(
        { code: 400, message: "Description is required" },
        { status: 400 }
      );
    }

    // 初始化 OpenAI 客户端
    const client = getOpenAIClient();
    console.log("OpenAI 客户端初始化成功");

    // 调用 DALL-E 3 生成图片
    console.log("开始生成图片...");
    const result = await client.images.generate({
      model: "dall-e-3",
      prompt: `生成一张桌面壁纸，主题为: ${description}, 印象派风格，受莫奈《睡莲》启发`,
      quality: "hd",
      n: 1,
      response_format: "url",
      size: "1792x1024",
      style: "natural",
    });
    console.log("图片生成成功:", result);

    // 初始化并测试 Azure 存储服务连接
    const azureStorage = new AzureStorageService();
    console.log("测试 Azure Storage 连接...");
    const connectionTest = await azureStorage.testConnection();
    if (!connectionTest) {
      throw new Error("Azure Storage connection test failed");
    }

    // 生成唯一的文件名
    const fileName = `wallpaper-${Date.now()}.png`;
    console.log("准备上传文件:", fileName);

    // 验证 OpenAI 返回的图片 URL
    if (!result.data[0]?.url) {
      throw new Error("OpenAI didn't return an image URL");
    }

    // 将图片上传到 Azure 存储
    console.log("开始上传到 Azure Storage...");
    const azureUrl = await azureStorage.uploadImageFromUrl(
      result.data[0].url,
      fileName
    );

    // 获取用户信息并设置默认值
    let userData;
    if (userId) {
      const user = await currentUser();
      userData = {
        email: user?.emailAddresses[0]?.emailAddress || "",
        nickname: user?.firstName || user?.username || "用户",
        avatar_url:
          user?.imageUrl ||
          `https://api.dicebear.com/7.x/personas/svg?seed=${userId}`,
      };
    } else {
      // 未登录用户使用默认信息
      userData = {
        email: "default@example.com",
        nickname: "访客用户",
        avatar_url: "https://api.dicebear.com/7.x/personas/svg?seed=default",
      };
    }

    // 准备壁纸数据
    const wallpaperData = {
      description,
      img_url: azureUrl,
      img_size: "1792x1024",
      model_parameters: {
        model: "dall-e-3",
        quality: "hd",
        size: "1792x1024",
        style: "natural",
        prompt: `生成一张桌面壁纸，主题为: ${description}, 印象派风格，受莫奈《睡莲》启发`,
      },
      user_id: userId || "default",
      user: userData,
    };

    // 将壁纸数据保存到 Supabase 数据库
    const savedWallpaper = await SupabaseService.insertWallpaper(wallpaperData);

    // 返回成功响应
    return NextResponse.json({
      code: 200,
      message: "ok",
      data: savedWallpaper,
    });
  } catch (error: any) {
    // 错误处理和日志记录
    console.error("操作失败:", {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    });

    // 返回错误响应
    return NextResponse.json(
      {
        code: 500,
        message: error.message || "Internal Server Error",
        error: error.toString(),
        details: {
          stack: error.stack,
          cause: error.cause,
        },
      },
      { status: 500 }
    );
  }
}
