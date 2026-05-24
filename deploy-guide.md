# 蒋浩涛的个人博客 - 部署指南

## 项目信息
- 博客地址：https://jhtfly.github.io/jht.github.io/
- GitHub 仓库：jht.github.io
- 框架：Jekyll（GitHub Pages 原生支持）
- 密码：默认 `123456`（请尽快修改）

---

## 第一步：创建 GitHub 仓库

1. 打开浏览器，访问 https://github.com
2. 登录你的 GitHub 账号（jhtfly）
3. 点击右上角 **「+」** 号，选择 **「New repository」**
4. 按如下设置填写：
   - **Repository name**：`jht.github.io`（必须是这个名字）
   - **Description**（可选）：个人博客
   - **Public**（勾选公开）——GitHub Pages 免费版要求公开
5. **不要**勾选 "Add a README file"
6. 点击 **「Create repository」**

---

## 第二步：上传文件到 GitHub

### 方法一：网页上传（推荐，适合初学者）

1. 在创建好的仓库页面，点击 **「uploading an existing file」** 链接
2. 将桌面 `jhtfly-blog` 文件夹中的**所有文件和文件夹**拖拽到上传区域
3. 确保目录结构正确（文件夹要上传为文件夹，不能全塞到一个目录）
4. 在页面底部的输入框中填写提交信息，如：`初始化博客网站`
5. 点击 **「Commit changes」**

### 方法二：创建空仓库后用 GitHub Desktop（如果有）

1. 打开 GitHub Desktop
2. File → Add local repository → 选择桌面的 jhtfly-blog 文件夹
3. Publish repository → 名称填 `jht.github.io`
4. 等待上传完成

### ⚠️ 重要：确保目录结构完整

上传后在仓库页面检查，应该能看到这些顶层目录和文件：
```
├── _config.yml
├── _data/
├── _includes/
├── _layouts/
├── _pages/
├── _posts/
├── assets/
├── downloads/
├── .github/
├── CNAME
├── Gemfile
├── index.html
└── .gitignore
```

---

## 第三步：开启 GitHub Pages

1. 进入仓库页面 https://github.com/jhtfly/jht.github.io
2. 点击 **「Settings」**（设置）
3. 左侧菜单找到 **「Pages」**
4. 在 "Build and deployment" 下方：
   - **Source** 选择 **「GitHub Actions」**
5. 保存后回到仓库，等待 Actions 自动构建（通常 1-3 分钟）
6. 构建成功后，访问 https://jhtfly.github.io/jht.github.io/ 查看博客

> 如果没有看到 "GitHub Actions" 选项，选 "Deploy from a branch"，branch 选 `main`，文件夹选 `/(root)`。

---

## 第四步：修改密码（重要！）

默认密码是 `123456`，请务必修改。

1. 在 GitHub 仓库页面，找到并打开 `assets/js/main.js` 文件
2. 点击编辑（铅笔图标）
3. 找到这行：
   ```
   const BLOG_PASSWORD_HASH = 'e10adc3949ba59abbe56e057f20f883e';
   ```
4. 在浏览器中搜索「SHA-256 在线加密」，输入你想要的新密码
5. 将生成的哈希值替换掉原来的值
6. 填写提交信息如 `修改博客密码`，点击 **「Commit changes」**

---

## 第五步：上传微信收款码

1. 准备一张微信收款码截图，命名为 `wechat-pay.png`
2. 在仓库页面进入 `assets/images/` 目录
3. 点击 **「Add file」→「Upload files」**
4. 拖入 `wechat-pay.png` 并提交
5. 然后打开 `_pages/about.html` 文件编辑
6. 找到这段注释代码，删除注释符号 `<!--` 和 `-->`：
   ```html
   <!--
   <img src="{{ '/assets/images/wechat-pay.png' | relative_url }}"
        alt="微信收款码"
        class="sponsor-qrcode">
   -->
   ```
   改为：
   ```html
   <img src="{{ '/assets/images/wechat-pay.png' | relative_url }}"
        alt="微信收款码"
        class="sponsor-qrcode">
   ```
7. 提交保存

---

## 日常管理指南

### 发布新文章
1. 在 GitHub 仓库进入 `_posts/` 目录
2. 点击 **「Add file」→「Create new file」**
3. 文件名格式：`YYYY-MM-DD-文章标题.md`（如 `2026-05-25-量化策略笔记.md`）
4. 在文件顶部输入 Front Matter，然后写正文：
   ```markdown
   ---
   layout: post
   title: 文章标题
   date: 2026-05-25
   tags: [标签1, 标签2]
   excerpt: 文章摘要，一两句话
   ---

   文章正文...
   ```
5. 如果需要密码保护，加一行 `password_protected: true`
6. 提交后等待 1-2 分钟，网站自动更新

### 添加新提示词
1. 编辑 `_data/prompts.yml` 文件
2. 在对应的分类下添加新条目：
   ```yaml
   - id: writing-003
     title: 你的提示词标题
     tags: [标签]
     short: true        # true=可复制，false=可下载
     content: |
       提示词正文内容...
     # 如果 short: false，改为：
     # download_url: /downloads/prompts/文件名.txt
   ```
3. 如果是可下载的长提示词，同时在 `downloads/prompts/` 目录上传对应的 txt 文件
4. 提交保存

### 添加新 Skill
1. 编辑 `_data/skills.yml` 文件
2. 在对应分类下添加新条目：
   ```yaml
   - name: Skill 名称
     description: 简要描述
     version: "1.0"
     updated: "2026-05-25"
     download_url: /downloads/skills/文件名.md
   ```
3. 在 `downloads/skills/` 目录上传对应的 Skill 文件
4. 提交保存

### 修改博客标题或描述
1. 编辑 `_config.yml` 文件
2. 修改 `title`、`description` 等字段
3. 提交保存

---

## 常见问题

### Q: 网站打不开？
- 检查仓库名是否为 `jht.github.io`
- 检查 Settings → Pages 是否已开启
- 等待 3-5 分钟（首次部署可能较慢）

### Q: 修改后网站没有更新？
- GitHub Actions 构建需要 1-3 分钟
- 检查仓库的 Actions 标签页，看构建是否成功
- 清除浏览器缓存后再试

### Q: 中文文件名上传出错？
- 所有文件名建议使用英文，中文内容写在文件里面
- Markdown 文件名用英文或拼音

### Q: 想绑定自定义域名？
- 修改 `CNAME` 文件内容为你的域名
- 在域名商处添加 CNAME 记录指向 `jhtfly.github.io/jht.github.io/`
- 在 GitHub Pages 设置中填写自定义域名
