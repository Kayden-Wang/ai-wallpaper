import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";

// Azure 存储连接字符串，从环境变量中获取
const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING || "";
// Azure Blob 存储容器名称
const CONTAINER_NAME = "wallpapers";

/**
 * Azure 存储服务类
 * 用于处理与 Azure Blob 存储相关的操作
 */
export class AzureStorageService {
  // Blob 服务客户端实例
  private blobServiceClient: BlobServiceClient;

  /**
   * 构造函数
   * 初始化 Azure Blob 存储客户端
   * @throws 如果未配置连接字符串则抛出错误
   */
  constructor() {
    if (!AZURE_STORAGE_CONNECTION_STRING) {
      throw new Error("Azure Storage connection string is not configured");
    }
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );
  }

  /**
   * 获取指定文件名的 Blob 客户端
   * @param fileName - 文件名
   * @returns BlockBlobClient 实例
   */
  private async getBlobClient(fileName: string): Promise<BlockBlobClient> {
    const containerClient =
      this.blobServiceClient.getContainerClient(CONTAINER_NAME);
    return containerClient.getBlockBlobClient(fileName);
  }

  /**
   * 从 URL 上传图片到 Azure Blob 存储
   * @param imageUrl - 图片的源 URL
   * @param fileName - 要保存的文件名
   * @returns 上传后的 Blob URL
   * @throws 如果下载或上传过程中出错
   */
  async uploadImageFromUrl(
    imageUrl: string,
    fileName: string
  ): Promise<string> {
    try {
      console.log("开始从URL下载图片:", imageUrl);
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      // 将图片内容转换为 ArrayBuffer
      const imageBuffer = await response.arrayBuffer();
      console.log("图片下载成功，大小:", imageBuffer.byteLength);

      // 获取 Blob 客户端并准备上传
      const blobClient = await this.getBlobClient(fileName);
      console.log("准备上传到 Blob:", fileName);

      // 上传图片数据
      await blobClient.uploadData(Buffer.from(imageBuffer), {
        blobHTTPHeaders: {
          blobContentType: response.headers.get("content-type") || "image/png",
        },
      });

      console.log("上传成功，URL:", blobClient.url);
      return blobClient.url;
    } catch (error) {
      console.error("上传图片到 Azure 失败:", error);
      throw error;
    }
  }

  /**
   * 测试与 Azure Storage 的连接
   * 检查容器是否存在，不存在则创建
   * @returns 连接测试是否成功
   * @throws 如果连接测试失败
   */
  async testConnection(): Promise<boolean> {
    try {
      console.log("开始测试 Azure Storage 连接...");
      const containerClient =
        this.blobServiceClient.getContainerClient(CONTAINER_NAME);

      // 检查容器是否存在
      console.log("检查容器是否存在:", CONTAINER_NAME);
      const exists = await containerClient.exists();
      if (!exists) {
        console.log("容器不存在，正在创建...");
        // 创建新容器，设置访问级别为 blob（允许公共访问）
        await containerClient.create({
          access: "blob",
        });
        console.log("容器创建成功");
      } else {
        console.log("容器已存在");
      }

      return true;
    } catch (error) {
      console.error("Azure Storage 连接测试失败:", error);
      throw error;
    }
  }
}
