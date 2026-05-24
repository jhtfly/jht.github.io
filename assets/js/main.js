/**
 * 蒋浩涛个人博客 - 主脚本
 */

// ============================
// 密码保护系统（前端简单加密）
// ============================
// 使用说明：
// 1. 在 _config.yml 中设置密码（或直接修改下方 PASSWORD 变量）
// 2. 在文章 Front Matter 中添加 password_protected: true 即可启用
// 3. 密码为 SHA-256 哈希值，而非明文
// ============================

const BLOG_PASSWORD_HASH = 'e10adc3949ba59abbe56e057f20f883e'; // 默认密码: 123456 的SHA-256

function sha256(message) {
  const encoder = new TextEncoder();
  return crypto.subtle.digest('SHA-256', encoder.encode(message))
    .then(buffer => {
      return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    });
}

async function unlockContent() {
  const input = document.getElementById('post-password');
  const error = document.getElementById('password-error');
  const gate = document.getElementById('password-gate');
  const content = document.getElementById('post-content');
  const protectedArea = document.getElementById('protected-area');

  if (!input || !input.value) return;

  const hash = await sha256(input.value);

  if (hash === BLOG_PASSWORD_HASH) {
    // 验证通过，显示内容
    if (gate) gate.style.display = 'none';
    if (content) content.style.display = 'block';
    if (protectedArea) {
      protectedArea.style.display = 'block';
      protectedArea.removeAttribute('data-locked');
    }
    // 记录到 sessionStorage，本次会话内不再要求输入
    sessionStorage.setItem('blog_auth', hash);
  } else {
    if (error) error.style.display = 'block';
    input.value = '';
    input.focus();
  }
}

// 自动解锁（sessionStorage 中有记录）
async function autoUnlock() {
  const stored = sessionStorage.getItem('blog_auth');
  if (stored === BLOG_PASSWORD_HASH) {
    const gate = document.getElementById('password-gate');
    const content = document.getElementById('post-content');
    const protectedArea = document.getElementById('protected-area');
    if (gate) gate.style.display = 'none';
    if (content) content.style.display = 'block';
    if (protectedArea) {
      protectedArea.style.display = 'block';
      protectedArea.removeAttribute('data-locked');
    }
  }
}

// ============================
// 一键复制功能
// ============================
function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btn.textContent;
    btn.textContent = '已复制!';
    btn.style.background = 'var(--color-success)';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 2000);
  }).catch(() => {
    // fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    const originalText = btn.textContent;
    btn.textContent = '已复制!';
    btn.style.background = 'var(--color-success)';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 2000);
  });
}

// ============================
// 展开/折叠提示词卡片
// ============================
function togglePrompt(id) {
  const body = document.getElementById('prompt-body-' + id);
  if (body) {
    const isHidden = body.style.display === 'none';
    body.style.display = isHidden ? 'block' : 'none';
  }
}

// ============================
// 页面加载
// ============================
document.addEventListener('DOMContentLoaded', () => {
  autoUnlock();

  // 回车键触发密码验证
  const pwInput = document.getElementById('post-password');
  if (pwInput) {
    pwInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') unlockContent();
    });
  }
});
