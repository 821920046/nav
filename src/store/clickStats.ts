// src/store/clickStats.ts
interface ClickStats {
  [key: string]: number; // key 是网站的唯一标识，value 是点击次数
}

const STORAGE_KEY = 'nav_click_stats';

export class ClickStatsManager {
  private stats: ClickStats = {};

  constructor() {
    this.loadStats();
  }

  // 加载统计数据
  loadStats(): void {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      this.stats = data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Failed to load click stats:', e);
      this.stats = {};
    }
  }

  // 保存统计数据
  private saveStats(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.stats));
    } catch (e) {
      console.error('Failed to save click stats:', e);
    }
  }

  // 记录点击
  recordClick(websiteId: string): void {
    this.stats[websiteId] = (this.stats[websiteId] || 0) + 1;
    this.saveStats();
  }

  // 获取点击次数
  getClicks(websiteId: string): number {
    return this.stats[websiteId] || 0;
  }

  // 清空统计
  clearStats(): void {
    this.stats = {};
    this.saveStats();
  }

  // 获取所有统计数据
  getAllStats(): ClickStats {
    return { ...this.stats };
  }
}

export const clickStatsManager = new ClickStatsManager();
