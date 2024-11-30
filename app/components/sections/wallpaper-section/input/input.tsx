"use client";

import { Wallpaper } from "@/app/types/wallpaper";
import { useState } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";

interface InputProps {
  onAddWallpaper: (newWallpaper: Wallpaper) => Promise<void>;
}

/**
 * 壁纸生成输入组件
 * 包含一个输入框用于接收用户的壁纸描述文本，以及一个生成按钮
 * 使用 useState 管理输入状态和加载状态
 */
export default function Input({ onAddWallpaper }: InputProps) {
  const { isSignedIn } = useAuth();
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

    if (!isSignedIn && process.env.NEXT_PUBLIC_ENV !== "DEV") {
      const signInButton = document.getElementById("wallpaper-signin-button");
      signInButton?.click();
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
        created_at: data.data.created_at,
        user: data.data.user,
        img_size: data.data.img_size,
        model_used: data.data.model_used,
        model_parameters: data.data.model_parameters,
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
    // container: 容器类
    // mx-auto: 水平居中
    // px-4: 左右内边距1rem
    // my-12: 上下外边距3rem
    <div className="container mx-auto px-4 my-12">
      {/* max-w-5xl: 最大宽度64rem
          mx-auto: 水平居中
          bg-gradient-to-br: 背景渐变从左上到右下
          from-white/80: 渐变起始色为白色,透明度80%
          to-white/50: 渐变结束色为白色,透明度50%
          backdrop-blur-xl: 背景模糊效果
          rounded-2xl: 圆角1rem
          shadow-lg: 大阴影
          p-8: 内边距2rem
          border: 边框
          border-white/20: 边框颜色为白色,透明度20% */}
      <div
        className="max-w-5xl mx-auto bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 
                      backdrop-blur-xl rounded-2xl shadow-lg p-8 
                      border border-white/20 dark:border-gray-700/30"
      >
        {/* flex: 弹性布局
            flex-col: 垂直方向排列
            gap-6: 子元素间距1.5rem */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* relative: 相对定位
              flex: 弹性布局
              gap-4: 子元素间距1rem */}
          <div className="relative flex gap-4">
            {/* flex-1: 弹性增长系数1
                px-6: 左右内边距1.5rem
                py-4: 上下内边距1rem
                bg-white/70: 白色背景,透明度70%
                border-2: 2px边框
                border-gray-200: 边框颜色
                rounded-xl: 圆角0.75rem
                focus:ring-4: 聚焦时环形轮廓4px
                focus:ring-blue-500/20: 聚焦时环形轮廓颜色
                outline-none: 移除默认轮廓
                transition-all: 所有属性过渡
                duration-300: 过渡持续时间300ms
                ease-in-out: 过渡时间曲线
                text-lg: 文字大小1.125rem
                placeholder:text-gray-400: 占位符文字颜色
                shadow-sm: 小阴影
                hover:shadow-md: 悬停时中等阴影 */}
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

            {/* 隐藏的登录按钮 */}
            <div className="hidden">
              <SignInButton mode="modal">
                <button id="wallpaper-signin-button">登录</button>
              </SignInButton>
            </div>

            {/* px-8: 左右内边距2rem
                py-4: 上下内边距1rem
                bg-gradient-to-r: 背景渐变从左到右
                from-blue-500: 渐变起始色
                to-indigo-500: 渐变结束色
                hover:from-blue-600: 悬停时起始色
                hover:to-indigo-600: 悬停时结束色
                text-white: 白色文字
                font-semibold: 字体粗细600
                text-lg: 文字大小1.125rem
                rounded-xl: 圆角0.75rem
                transition-all: 所有属性过渡
                shadow-md: 中等阴影
                hover:shadow-xl: 悬停时大阴影
                hover:scale-105: 悬停时放大1.05倍
                disabled:opacity-70: 禁用时透明度70%
                disabled:cursor-not-allowed: 禁用时鼠标样式
                disabled:hover:scale-100: 禁用时悬停不放大 */}
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
                // flex: 弹性布局
                // items-center: 垂直居中对齐
                // gap-2: 子元素间距0.5rem
                <span className="flex items-center gap-2">
                  {/* animate-spin: 旋转动画
                      h-5: 高度1.25rem
                      w-5: 宽度1.25rem */}
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

          {/* text-sm: 文字大小0.875rem
              text-gray-500: 文字颜色 */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            💡
            提示：尝试描述具体的场景（如"日落时分的海滩"）、艺术风格（如"赛博朋克城市"）或情感氛围（如"宁静的森林"）
          </p>
        </form>
      </div>
    </div>
  );
}
