import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getOpenAIClient } from "@/app/service/openai";
import { AzureStorageService } from "@/app/service/azure-storage";
import { SupabaseService } from "@/app/service/supabase";

// 定义 POST 请求处理函数
export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { code: 401, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    console.log("开始处理请求...");
    const { description } = await req.json();
    console.log("请求参数:", description);

    if (!description) {
      return NextResponse.json(
        { code: 400, message: "Description is required" },
        { status: 400 }
      );
    }

    const client = getOpenAIClient();
    console.log("OpenAI 客户端初始化成功");

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

    // 测试 Azure 连接
    const azureStorage = new AzureStorageService();
    console.log("测试 Azure Storage 连接...");
    const connectionTest = await azureStorage.testConnection();
    if (!connectionTest) {
      throw new Error("Azure Storage connection test failed");
    }

    // 生成文件名
    const fileName = `wallpaper-${Date.now()}.png`;
    console.log("准备上传文件:", fileName);

    // 确保 URL 存在
    if (!result.data[0]?.url) {
      throw new Error("OpenAI didn't return an image URL");
    }

    // 上传到 Azure
    console.log("开始上传到 Azure Storage...");
    const azureUrl = await azureStorage.uploadImageFromUrl(
      result.data[0].url,
      fileName
    );

    // 获取 Clerk 用户信息
    const user = await currentUser();

    // 准备用户数据
    const userData = {
      email: user?.emailAddresses[0]?.emailAddress || "",
      nickname: user?.firstName || user?.username || "用户",
      avatar_url:
        user?.imageUrl ||
        `https://api.dicebear.com/7.x/personas/svg?seed=${userId}`,
    };

    // 修改保存壁纸的逻辑
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
      user_id: userId, // 添加用户ID
      user: userData, // 添加用户信息
    };

    const savedWallpaper = await SupabaseService.insertWallpaper(wallpaperData);

    return NextResponse.json({
      code: 200,
      message: "ok",
      data: savedWallpaper,
    });
  } catch (error: any) {
    console.error("操作失败:", {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    });

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
