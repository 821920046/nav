// src/utils/idGenerator.ts
import { INavProps, INavThreeProp } from '@/types'

// 生成唯一 ID
export function generateId(categoryIndex: number, itemIndex: number): string {
  return `${categoryIndex}-${itemIndex}-${Date.now()}`;
}

// 为所有网站添加 ID
export function initializeWebsiteIds(data: INavThreeProp[]): void {
  data.forEach((category, catIndex) => {
    category.nav?.forEach((item, itemIndex) => {
      if (!item.id) {
        item.id = generateId(catIndex, itemIndex);
      }
    });
  });
}

// 获取网站的唯一标识符（优先使用 id，否则使用 url）
export function getWebsiteId(website: INavProps): string {
  return website.id || website.url;
}
