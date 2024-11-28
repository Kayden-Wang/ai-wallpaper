"use client";

import { Wallpaper } from "@/app/types/wallpaper";
import { useState } from "react";

interface InputProps {
  onAddWallpaper: (newWallpaper: Wallpaper) => Promise<void>;
}

/**
 * 壁纸生成输入组件
 * 包含一个输入框用于接收用户的壁纸描述文本，以及一个生成按钮
 * 使用 useState 管理输入状态和加载状态
 */
export default function Input({ onAddWallpaper }: InputProps) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * 处理表单提交事件的异步函数
   * @param e - React.FormEvent<HTMLFormElement> 表单提交事件对象
   * @returns {Promise<void>} 返回一个 Promise
   *
   * 函数功能说明:
   * 1. 阻止表单默认提交行为
   * 2. 设置加载状态为 true
   * 3. 调用后端 API 生成壁纸
   * 4. 将生成的壁纸添加到列表中
   * 5. 错误处理
   * 6. 最后重置加载状态
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 阻止表单默认提交行为,避免页面刷新
    e.preventDefault();

    // 添加输入验证
    if (!description.trim()) {
      alert("请输入壁纸主题");
      return;
    }

    setLoading(true);

    try {
      // 调用后端 API 生成壁纸
      // 发送 POST 请求到 /api/generate-wallpaper 端点
      // 请求体包含用户输入的描述文本
      const res = await fetch("/api/gen-wallpaper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });
      // 解析响应数据
      const data = await res.json();
      // 调用父组件传入的 onAddWallpaper 函数
      // 将新生成的壁纸添加到列表中
      await onAddWallpaper({
        description: data.data.description,
        img_url: data.data.img_url,
      });
    } catch (error) {
      // 捕获并打印错误信息
      console.error("生成壁纸失败:", error);
    } finally {
      // 无论成功与否,最后都将加载状态设置回 false
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 my-12">
      <div
        className="max-w-5xl mx-auto bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 
                      backdrop-blur-xl rounded-2xl shadow-lg p-8 
                      border border-white/20 dark:border-gray-700/30"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative flex gap-4">
            <input
              type="text"
              placeholder="输入您想要的壁纸主题..."
              className="flex-1 px-6 py-4 bg-white/70 dark:bg-gray-900/70
                        border-2 border-gray-200 dark:border-gray-700
                        rounded-xl focus:ring-4 focus:ring-blue-500/20 
                        focus:border-blue-500 dark:focus:border-blue-400
                        outline-none transition-all duration-300 ease-in-out
                        text-lg placeholder:text-gray-400 dark:placeholder:text-gray-500
                        shadow-sm hover:shadow-md"
              value={description}
              disabled={loading}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 
                        hover:from-blue-600 hover:to-indigo-600
                        text-white font-semibold text-lg
                        rounded-xl transition-all duration-300 ease-in-out
                        shadow-md hover:shadow-xl hover:scale-105
                        disabled:opacity-70 disabled:cursor-not-allowed
                        disabled:hover:scale-100"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  生成中...
                </span>
              ) : (
                "生成壁纸"
              )}
            </button>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            💡
            提示：尝试描述具体的场景（如"日落时分的海滩"）、艺术风格（如"赛博朋克城市"）或情感氛围（如"宁静的森林"）
          </p>
        </form>
      </div>
    </div>
  );
}
