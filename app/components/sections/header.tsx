export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 w-full z-50">
      <div
        className="w-full bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 
                    backdrop-blur-xl shadow-lg 
                    border-b border-white/20 dark:border-gray-700/30"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex justify-between items-center h-20">
            {/* Logo区域 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500"></div>
              <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text">
                AI Wallpaper
              </div>
            </div>

            {/* 导航按钮区域 */}
            <div className="flex items-center gap-4">
              {/* 主题切换按钮 */}
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </button>

              {/* 用户头像/登录按钮 */}
              <button
                className="flex items-center gap-2 px-4 py-2 
                           bg-gradient-to-r from-blue-500 to-indigo-500 
                           hover:from-blue-600 hover:to-indigo-600
                           text-white font-semibold rounded-lg 
                           transition-all hover:shadow-lg hover:scale-105"
              >
                登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// original UI
// export default function Header() {
//   return (
//     // fixed: 固定定位
//     // top-0: 距顶部0
//     // left-0: 距左侧0
//     // w-full: 宽度100%
//     // z-50: z轴层级50
//     <div className="fixed top-0 left-0 w-full z-50">
//       {/* flex: 弹性布局
//           justify-center: 水平居中
//           items-center: 垂直居中
//           h-16: 高度4rem
//           px-4: 左右内边距1rem */}
//       <div className="flex justify-center items-center h-16 px-4">
//         {/* text-2xl: 文字大小1.5rem
//             font-bold: 字体加粗 */}
//         <div className="text-2xl font-bold">Header</div>
//       </div>
//     </div>
//   );
// }
