---
layout: post
title: 密码保护文章示例
date: 2026-05-24
tags: [示例, 私密]
excerpt: 这是一篇需要密码才能查看的文章示例。
password_protected: true
---

## 私密内容

这篇文章需要输入密码才能查看。

**默认密码是：`123456`**

---

这是一个密码保护文章的示例。你可以这样创建自己的密码保护文章：

1. 在 `_posts/` 目录下创建新的 Markdown 文件
2. 文件名格式：`YYYY-MM-DD-标题.md`
3. 在文件头部（Front Matter）中添加 `password_protected: true`
4. 写完内容后提交到 GitHub，网站会自动更新

## 修改密码

要修改密码，编辑 `assets/js/main.js` 文件中的 `BLOG_PASSWORD_HASH` 变量，替换为你的密码的 SHA-256 哈希值。

你可以使用在线工具（搜索"SHA-256 在线加密"）将你想要的密码转换为哈希值。
