# VueTorrent Next Mod

基于 [VueTorrent](https://github.com/VueTorrent/VueTorrent) 重构的 qBittorrent 第三方网页界面，整体布局以 [Transmission Next UI](https://github.com/hisproc/transmission-next-ui)
为主要设计参考，并融入 [shadcn/ui](https://github.com/shadcn-ui/ui) 的视觉语言。

[![发行版本](https://img.shields.io/github/v/release/cainiao524/vuetorrent-next-mod)](https://github.com/cainiao524/vuetorrent-next-mod/releases)
[![下载次数](https://img.shields.io/github/downloads/cainiao524/vuetorrent-next-mod/total)](https://github.com/cainiao524/vuetorrent-next-mod/releases)
[![许可证](https://img.shields.io/github/license/cainiao524/vuetorrent-next-mod)](LICENSE)
[![qBittorrent](https://img.shields.io/badge/qBittorrent-4.4%2B-2f67ba)](https://www.qbittorrent.org/)

## 界面预览

![VueTorrent Next Mod 简体中文仪表盘](docs/screenshots/vuetorrent-next-mod-dashboard.png)

预览中的任务和速度来自内置模拟数据，不代表真实下载活动。

## 设计特点

- 参考 Transmission Next UI 的固定侧栏、状态入口、统计卡片和信息密度。
- 使用接近 shadcn/ui 的颜色变量、边框、圆角、间距和交互状态。
- 重新设计深色与浅色主题，支持原有主题切换能力。
- 默认使用信息更完整的表格视图，并保留列表与网格视图。
- 完整保留 VueTorrent 的任务管理、搜索、订阅、日志和设置能力。
- 新增并完善简体中文导航、仪表盘和设置界面。
- 适配桌面端与窄屏设备。

## 安装

### 使用发行包

1. 从[发行页面](https://github.com/cainiao524/vuetorrent-next-mod/releases)下载 `vuetorrent.zip`。
2. 将压缩包解压到 qBittorrent 可以访问的固定目录。
3. 打开 qBittorrent 设置中的“网页用户界面”。
4. 启用“使用替代网页用户界面”。
5. 将文件路径指向解压后的目录。
6. 保存设置并刷新 qBittorrent 网页界面。

如果页面无法加载，请确认填写的是包含 `index.html` 的目录，并检查 qBittorrent 进程是否有权读取该目录。

### 从源码构建

```bash
git clone https://github.com/cainiao524/vuetorrent-next-mod.git
cd vuetorrent-next-mod
npm ci
npm run build
```

构建结果位于 `vuetorrent` 目录，可按照发行包的方式部署。

## 本地开发

```bash
npm ci
npm run dev
```

复制 `.env.sample` 为 `.env` 后，可以启用模拟数据并调整本地开发参数。

常用检查命令：

```bash
npm run check-build
npm test
npm run build
```

## 主要功能

- 添加、删除、暂停、继续和重命名种子。
- 查看文件、Tracker、用户、内容、标签与分类信息。
- 管理下载顺序、速度限制和分享限制。
- 查看会话速度、传输统计、磁盘空间和分享率。
- 使用内置种子搜索、RSS 资讯和 qBittorrent 日志。
- 配置任务列表字段、卡片布局、侧栏和主题。
- 支持快捷键、批量选择和移动端布局。
- 兼容 qBittorrent Enhanced Edition 的相关设置。

## 简体中文

进入“设置 → VueTorrent → 常规设置 → 语言”，选择“简体中文”并点击保存按钮即可切换。

本项目优先复用 VueTorrent 官方语言包，仅为重构后新增的导航和仪表盘字段补充翻译。

## 与上游项目的关系

本项目是社区修改版，不是 VueTorrent、Transmission Next UI 或 shadcn/ui 的官方发行版本。

- 功能基础：[VueTorrent](https://github.com/VueTorrent/VueTorrent)
- 主要布局参考：[Transmission Next UI](https://github.com/hisproc/transmission-next-ui)
- 视觉风格参考：[shadcn/ui](https://github.com/shadcn-ui/ui)
- qBittorrent：[qBittorrent](https://github.com/qbittorrent/qBittorrent)

建议在升级 VueTorrent 上游版本前备份当前配置，并在测试环境中确认兼容性。

## 问题反馈

如果发现界面、翻译或兼容性问题，请在本仓库的[问题页面](https://github.com/cainiao524/vuetorrent-next-mod/issues)提交反馈，并附上：

- qBittorrent 版本。
- 浏览器及版本。
- 使用的主题和语言。
- 可复现步骤及截图。

## 许可证

本项目沿用 VueTorrent 的 [GNU 通用公共许可证第三版](LICENSE)。修改和分发时请继续遵守许可证要求，并保留上游项目的版权与许可证信息。
