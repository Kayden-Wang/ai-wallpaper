export default function Footer() {
  return (
    // fixed: 固定定位
    // bottom-0: 距底部0
    // left-0: 距左侧0
    // w-full: 宽度100%
    // z-50: z轴层级50
    <div className="fixed bottom-0 left-0 w-full z-50">
      {/* flex: 弹性布局
          justify-center: 水平居中
          items-center: 垂直居中
          h-16: 高度4rem
          px-4: 左右内边距1rem */}
      <div className="flex justify-center items-center h-16 px-4">
        {/* text-2xl: 文字大小1.5rem
            font-bold: 字体加粗 */}
        <div className="text-2xl font-bold">Footer</div>
      </div>
    </div>
  );
}
