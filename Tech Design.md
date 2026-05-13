# Markdown 笔记应用 - 技术设计文档

## 1. 技术栈
- 框架：React 18 + TypeScript + Vite
- Markdown 解析：react-markdown
- 代码高亮：react-syntax-highlighter
- 样式：Tailwind CSS
- 存储：LocalStorage
- 部署：GitHub Pages

## 2. 项目结构
src/
├── components/ # 组件
│ ├── Editor.tsx # 编辑器
│ ├── Preview.tsx # 预览区
│ ├── NoteList.tsx # 笔记列表
│ └── Layout.tsx # 布局
├── hooks/
│ ├── useNotes.ts # 笔记逻辑
│ └── useLocalStorage.ts # 存储封装
├── types/
│ └── index.ts # 类型定义
├── utils/
│ └── export.ts # 导出工具
├── App.tsx
└── main.tsx
plaintext

## 3. 数据模型
```typescript
interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}
```
## 4. 核心模块设计
### 4.1 编辑器模块
文本域实时监听输入
内容同步到预览区
支持 Tab 缩进
自动保存到 LocalStorage
### 4.2 预览模块
react-markdown 解析 MD → HTML
集成代码高亮插件
优化渲染样式
### 4.3 笔记管理模块
增删改查笔记
笔记切换
标题搜索
自动保存
### 4.4 存储模块
useLocalStorage Hook 封装
状态变化自动持久化
页面加载自动读取
## 5. 关键实现
实时预览
tsx
const [content, setContent] = useState("");
<Editor value={content} onChange={setContent} />
<Preview content={content} />
本地存储
tsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const set = (val) => {
    setValue(val);
    localStorage.setItem(key, JSON.stringify(val));
  };

  return [value, set];
}
## 6. 部署配置  
vite.config.ts 配置 base 路径
执行 npm run build 生成 dist
上传 dist 到 GitHub Pages