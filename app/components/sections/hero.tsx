// todo : 首页标题
export default function Hero() {
  return (
    <header className="bg-background">
      <div className="mx-auto w-full max-w-7xl px-5 pt-16 pb-8 md:px-10 md:pt-20 md:pb-2">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center max-w-5xl">
            <h1 className="mb-4 text-5xl font-bold md:text-6xl text-foreground">
              AI 壁纸生成器
            </h1>
            <p className="mb-6 text-sm text-muted-foreground sm:text-xl md:mb-10 lg:mb-12">
              输入您想要的主题，让 AI
              为您创作独特的个性化壁纸。无论是自然风光、抽象艺术、还是科幻场景，AI
              都能将您的想象变为现实。每一张壁纸都是独一无二的艺术品。
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
