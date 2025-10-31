// 在文件顶部导入
import { clickStatsManager } from '@/store/clickStats'
import { getWebsiteId, initializeWebsiteIds } from '@/utils/idGenerator'

// 在 class 中添加新的方法
export default class WebpComponent {
  // ... 现有代码 ...

  ngOnInit() {
    // 初始化网站 ID
    initializeWebsiteIds(this.websiteList);
    
    // ... 现有的初始化代码 ...
  }

  // 排序网站列表（根据点击次数）
  sortWebsitesByClicks(websites: INavProps[]): INavProps[] {
    return [...websites].sort((a, b) => {
      const clicksA = clickStatsManager.getClicks(getWebsiteId(a));
      const clicksB = clickStatsManager.getClicks(getWebsiteId(b));
      return clicksB - clicksA; // 降序排列
    });
  }

  // 处理网站点击
  handleWebsiteClick(website: INavProps): void {
    const websiteId = getWebsiteId(website);
    clickStatsManager.recordClick(websiteId);
    
    // 原有的跳转逻辑
    if (website.url) {
      window.open(website.url, '_blank');
    }
  }

  // 获取网站点击次数（用于显示）
  getWebsiteClicks(website: INavProps): number {
    return clickStatsManager.getClicks(getWebsiteId(website));
  }

  // 获取排序后的当前分类网站
  get sortedCurrentWebsites(): INavProps[] {
    const currentNav = this.websiteList[this.currentIndex]?.nav || [];
    return this.sortWebsitesByClicks(currentNav);
  }
}
