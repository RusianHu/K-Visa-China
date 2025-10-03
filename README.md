# K-Visa China

[![GitHub Stars](https://img.shields.io/github/stars/RusianHu/K-Visa-China?style=flat-square)](https://github.com/RusianHu/K-Visa-China/stargazers) [![GitHub Issues](https://img.shields.io/github/issues/RusianHu/K-Visa-China?style=flat-square)](https://github.com/RusianHu/K-Visa-China/issues) [![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](./LICENSE)


> 面向印度 STEM 人才的中国 K 签证信息导航页

## 项目简介
- 一个简单门户站风格的网页应用，聚合资格、流程、文化融入等核心信息，帮助印度 STEM 人才快速理解中国最新的 K 签证政策。
- 采用 Google Material Design 灵感的布局与浮动操作按钮（FAB），并针对移动端进行优化。

## 技术栈
- HTML5 + Material Design 风格布局
- CSS3（自定义栅格、动画、媒体查询）
- 原生 JavaScript (`script.js`) 实现交互、状态保存与国际化逻辑

## 文件说明
- `index.html`：主页面结构，包含各导航段落、FAB、模态窗口等组件。
- `styles.css`：响应式样式与 Material Design 主题实现。
- `script.js`：语言切换、导航交互、动画、通知和支持模态控制。
- `i18n.js`：中英双语文案源，可扩展更多语言。
- `中国K签证印度本科生攻略.md` / `K签证攻略：留华本科生指南.md`：辅助阅读材料。
- `AGENTS.md` / `CLAUDE.md`：智能体协作说明。

## 国际化指引
- 所有需要翻译的文本需添加 `data-i18n` 等属性，由 `i18n.js` 中的 `translations` 对象维护。
- 新增语言时，为 `translations` 增加对应键值，并在语言切换按钮逻辑中处理对应代码。
- 避免在模板中直接硬编码文本，以保持切换的一致性。

## 支持与致谢
- 页面内置支持模态（导航按钮与悬浮按钮）。
- 欢迎通过 Issue 或 PR 提出改进建议，共建更完善的 K 签证信息中心。

## 许可证
- 本项目基于 [MIT](./LICENSE) 许可证开源。
