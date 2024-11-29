/**
 * 格式化日期为 "月/日" 格式
 * @param dateString - ISO 格式的日期字符串
 * @returns 格式化后的日期字符串
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return "未知时间";

  try {
    const date = new Date(dateString);

    // 检查日期是否有效
    if (isNaN(date.getTime())) {
      return "未知时间";
    }

    // 使用 Intl.DateTimeFormat 格式化日期
    return new Intl.DateTimeFormat("zh-CN", {
      month: "numeric",
      day: "numeric",
    }).format(date);
  } catch (error) {
    console.error("日期格式化错误:", error);
    return "未知时间";
  }
}

/**
 * 检查日期是否是今天
 * @param dateString - ISO 格式的日期字符串
 * @returns 是否是今天
 */
export function isToday(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * 获取相对时间描述
 * @param dateString - ISO 格式的日期字符串
 * @returns 相对时间描述
 */
export function getRelativeTimeString(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "刚刚";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}分钟前`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}小时前`;
  }

  if (isToday(dateString)) {
    return "今天";
  }

  return formatDate(dateString);
}
