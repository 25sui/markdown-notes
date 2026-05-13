# GitHub Pages 部署指南

## 前置准备

1. 在 GitHub 上创建一个新仓库（仓库名任意）
2. 将代码推送到仓库的 `main` 分支

## 配置步骤

### 1. 修改 `vite.config.ts`

根据您的仓库名称修改 `base` 配置：

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/您的仓库名/'  // ← 改成您的仓库名
})
```

**示例**：
- 仓库名是 `markdown-notes` → `base: '/markdown-notes/'`
- 仓库名是 `notes` → `base: '/notes/'`
- 使用用户名仓库 `username.github.io` → `base: '/'`

### 2. 配置 GitHub Pages

1. 进入仓库的 **Settings**
2. 左侧菜单选择 **Pages**
3. 在 **Build and deployment** 部分：
   - **Source**: 选择 `GitHub Actions`
4. 保存设置

### 3. 推送代码

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

推送后，GitHub Actions 会自动开始构建和部署。

## 查看部署状态

1. 进入仓库的 **Actions** 标签页
2. 点击最新的 workflow run
3. 等待构建完成（约 1-2 分钟）
4. 部署成功后，访问链接会显示在页面上

## 访问您的应用

部署成功后，访问地址为：
`https://您的用户名.github.io/您的仓库名/`

## 修改仓库名后

如果修改了仓库名，记得同时：
1. 更新 `vite.config.ts` 中的 `base` 配置
2. 重新推送代码触发部署

## 常见问题

### Q: 页面显示 404？
A: 检查 `vite.config.ts` 中的 `base` 是否与仓库名一致

### Q: 如何预览本地效果？
A: 运行 `npm run build` 后，使用本地服务器测试 `dist` 目录

### Q: 部署失败怎么办？
A: 查看 Actions 页面的日志，检查构建错误信息