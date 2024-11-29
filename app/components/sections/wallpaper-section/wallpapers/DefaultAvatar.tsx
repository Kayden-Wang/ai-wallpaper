interface DefaultAvatarProps {
  seed: string;
  size?: number;
}

export default function DefaultAvatar({
  seed,
  size = 40,
}: DefaultAvatarProps): string {
  // 根据 seed 生成固定的颜色
  const hue =
    Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;

  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="hsl(${hue}, 70%, 80%)" />
      <text 
        x="50%" 
        y="50%" 
        dy=".1em"
        fill="hsl(${hue}, 70%, 30%)"
        font-family="Arial, sans-serif"
        font-size="${size * 0.5}px"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        ${seed.charAt(0).toUpperCase()}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
