import { NextResponse } from "next/server";
import { getOpenAIClient } from "@/app/service/openai";

// 定义 POST 请求处理函数
export async function POST(req: Request) {
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

    return NextResponse.json({
      code: 200,
      message: "ok",
      data: {
        description: description,
        img_url: result.data[0].url,
      },
    });
  } catch (error: any) {
    console.error("详细错误信息:", {
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
