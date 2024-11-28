export default function Hero() {
  return (
    // bg-background: 使用背景色变量
    <header className="bg-background">
      {/* mx-auto: 水平居中
          w-full: 宽度100%
          max-w-7xl: 最大宽度80rem
          px-5: 左右内边距1.25rem
          pt-16: 上内边距4rem
          pb-8: 下内边距2rem
          md:px-10: 中等屏幕左右内边距2.5rem
          md:pt-20: 中等屏幕上内边距5rem
          md:pb-2: 中等屏幕下内边距0.5rem */}
      <div className="mx-auto w-full max-w-7xl px-5 pt-16 pb-8 md:px-10 md:pt-20 md:pb-2">
        {/* flex: 弹性布局
            flex-col: 垂直方向排列
            items-center: 水平居中对齐
            justify-center: 垂直居中对齐
            text-center: 文本居中 */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* flex: 弹性布局
              flex-col: 垂直方向排列
              items-center: 水平居中对齐
              max-w-5xl: 最大宽度64rem */}
          <div className="flex flex-col items-center max-w-5xl">
            {/* mb-4: 下外边距1rem
                text-5xl: 文字大小3rem
                font-bold: 字体加粗
                md:text-6xl: 中等屏幕文字大小3.75rem
                text-foreground: 使用前景色变量 */}
            <h1 className="mb-4 text-5xl font-bold md:text-6xl text-foreground">
              AI 壁纸生成器
            </h1>
            {/* mb-6: 下外边距1.5rem
                text-sm: 文字大小0.875rem
                text-muted-foreground: 使用次要前景色变量
                sm:text-xl: 小屏幕文字大小1.25rem
                md:mb-10: 中等屏幕下外边距2.5rem
                lg:mb-12: 大屏幕下外边距3rem */}
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
