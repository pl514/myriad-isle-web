# 万象岛官网 · myriad-isle-web

万象岛（Myriad Isle）的产品官网，纯静态站点，部署在 GitHub Pages。

- 在线地址：https://pl514.github.io/myriad-isle-web/
- 标准版：https://github.com/pl514/myriad-isle
- Pro 版：https://github.com/pl514/myriad-isle-pro

## 本地预览

直接双击 index.html，或用任意静态服务器：

```powershell
python -m http.server 8080
```

## 结构

```
index.html          单页
assets/styles.css   样式（无框架、无构建）
assets/app.js       交互（滚动进场、FAQ、移动端菜单）
assets/img/         截图与图标
```

## 修改内容

文案都在 index.html 里；配色、圆角、间距集中在 styles.css 顶部的 `:root` 变量。
截图替换 assets/img/ 下的同名文件即可。