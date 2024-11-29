export default function Hero() {
  return (
    <header className="bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50">
      <div className="mx-auto w-full max-w-7xl px-5 pt-32 pb-16 md:px-10 md:pt-40 md:pb-24">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center max-w-3xl">
            <div className="mb-8 flex flex-col items-center">
              <div
                className="mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 
                            shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10"
              ></div>
              <h1
                className="mb-4 text-4xl sm:text-5xl md:text-6xl font-bold 
                           bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800
                           dark:from-blue-400 dark:via-blue-300 dark:to-indigo-200
                           bg-clip-text text-transparent"
              >
                AI 壁纸生成器
              </h1>
            </div>

            <div className="relative">
              <p
                className="mb-8 text-base sm:text-lg md:text-xl text-gray-700/90 dark:text-gray-300/90
                          max-w-2xl mx-auto leading-relaxed"
              >
                输入您想要的主题，让 AI 为您创作独特的个性化壁纸。
                无论是自然风光、抽象艺术、还是科幻场景，AI
                都能将您的想象变为现实。 每一张壁纸都是独一无二的艺术品。
              </p>

              <div
                className="absolute -top-6 -right-6 w-12 h-12 rounded-full 
                            bg-gradient-to-br from-blue-500/20 to-indigo-500/20 
                            dark:from-blue-400/10 dark:to-indigo-400/10
                            blur-2xl"
              ></div>
              <div
                className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full 
                            bg-gradient-to-br from-indigo-500/20 to-blue-500/20 
                            dark:from-indigo-400/10 dark:to-blue-400/10
                            blur-2xl"
              ></div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {["高清画质", "自定义主题", "快速生成", "免费使用"].map(
                (feature, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full text-sm font-medium
                           bg-gradient-to-br from-white/90 to-white/80 
                           dark:from-gray-800/90 dark:to-gray-900/80
                           text-gray-700 dark:text-gray-200
                           border border-blue-100/20 dark:border-gray-700/30
                           shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    {feature}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
