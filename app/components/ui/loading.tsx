export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          {/* 外圈动画 */}
          <div
            className="w-12 h-12 rounded-full border-4 border-blue-100 dark:border-blue-900 animate-spin 
                        border-t-blue-500 dark:border-t-blue-400"
          ></div>
          {/* 内圈渐变 */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent 
                        via-transparent to-blue-500/20 dark:to-blue-400/10 animate-pulse"
          ></div>
        </div>
        {/* 文字渐变动画 */}
        <p className="text-gray-600 dark:text-gray-300 font-medium animate-pulse">
          加载中...
        </p>
      </div>
    </div>
  );
}
