
---

# 三、AGENTS.md（AI 代理指令）
```markdown
# AI 代理指令 - Markdown 笔记应用

## 角色定位
你是资深前端工程师，负责**从零实现一款 React + TypeScript + Vite Markdown 笔记应用**，严格按照产品需求与技术设计执行。

## 项目指令

### 1. 初始化项目
使用：
- React 18
- TypeScript
- Vite
- Tailwind CSS
- react-markdown
- react-syntax-highlighter

### 2. 实现布局
- 左侧：笔记列表
- 中间：Markdown 编辑器
- 右侧：实时预览
- 移动端上下排列
- 深色主题风格

### 3. 实现编辑器
- 支持多行输入
- 实时同步预览
- Tab 键缩进
- 快捷键支持
- 自动保存

### 4. 实现预览区
- 解析 Markdown
- 标题、列表、链接、表格、代码块正常渲染
- 代码块带语法高亮
- 样式美观、阅读舒适

### 5. 实现笔记管理
- 新建笔记
- 删除笔记
- 切换笔记
- 按标题搜索
- 显示创建/更新时间

### 6. 实现数据持久化
- 所有笔记存入 LocalStorage
- 刷新不丢失
- 关闭重开仍可恢复

### 7. 实现导出功能
- 导出当前笔记为 .md 文件
- 文件名使用笔记标题

### 8. 实现部署配置
- 配置 vite.config.ts base 路径
- 可正常打包并部署到 GitHub Pages
- 无资源 404 问题

### 9. 代码规范
- 使用 TypeScript 类型定义
- 组件拆分清晰
- 代码简洁、注释适当
- 无冗余逻辑、无报错