// 导入必要的依赖
// Clerk 用于用户认证和管理
import { ClerkProvider } from "@clerk/nextjs";
// Next.js 的元数据类型定义
import type { Metadata } from "next";
// 用于加载本地字体的工具
import localFont from "next/font/local";
// 全局 CSS 样式
import "./globals.css";

// 加载 Geist Sans 字体
// 设置字体源文件、CSS 变量名和字重范围
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

// 加载 Geist Mono 字体(等宽字体)
// 设置字体源文件、CSS 变量名和字重范围
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// 设置网站的元数据信息
export const metadata: Metadata = {
  title: "AI Wallpaper Generator",
  description: "Generate unique wallpapers using AI",
};

// 根布局组件
// children 参数包含所有子页面内容
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 用 ClerkProvider 包裹整个应用以提供认证功能
    <ClerkProvider>
      {/* 设置网页语言为中文 */}
      <html lang="zh-CN">
        <body
          // 设置最小高度和背景渐变
          // 支持亮色和暗色模式
          className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 
                     dark:from-gray-950 dark:via-gray-900 dark:to-gray-950`}
          // 禁止 React hydration 警告
          suppressHydrationWarning
        >
          {/* 渲染子组件 */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
