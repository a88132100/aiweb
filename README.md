# FlowKit AI 工作流模板庫

繁體中文 AI 自動化工作流內容站 MVP。主題聚焦 n8n、Make、Zapier、ChatGPT、Google Sheets、Gmail、Notion、LINE 的長尾 SEO 工作流、工具筆記與比較頁。

## Local Development

```bash
npm install
npm run dev
```

本機預設網址：

```txt
http://127.0.0.1:3000
```

## Checks

```bash
npm run content:check
npm run lint
npm run typecheck
npm run production:check
npm run build
```

`content:check` 會驗證 slug、必要欄位、工具/分類/相關工作流引用、日期格式與 sitemap 路由數量。
`production:check` 會檢查正式網址、GA、Search Console、AdSense client/slot 與必要正式頁面是否就緒。

## Environment

部署時設定：

```txt
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_GA_ID=G-...
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...
```

選填：

```txt
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-...
NEXT_PUBLIC_ADSENSE_SLOT_CONTENT=...
NEXT_PUBLIC_ADSENSE_SLOT_LIST=...
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=...
```

沒有 `NEXT_PUBLIC_ADSENSE_CLIENT` 時，網站只會顯示內建廣告/合作版位占位，不會載入未核准廣告。
如果沒有設定 `NEXT_PUBLIC_SITE_URL`，Vercel 預覽部署會使用 `VERCEL_URL` 產生 canonical 與 sitemap；正式網域上線後仍建議明確設定 `NEXT_PUBLIC_SITE_URL`。

## Deployment Checklist

- 在 Vercel 設定 `NEXT_PUBLIC_SITE_URL` 為正式網域。
- 綁定自有網域並確認 `/sitemap.xml`、`/robots.txt` 可讀。
- 到 Google Search Console 提交 sitemap。
- 有核准的 AdSense publisher id 後再設定 `NEXT_PUBLIC_ADSENSE_CLIENT`。
- 建立 AdSense 廣告單元後，分別填入 content、list、sidebar 三個 slot id。
- 設定 `NEXT_PUBLIC_ADSENSE_CLIENT` 後確認 `/ads.txt` 會輸出 Google AdSense 記錄。
- 若要追蹤流量，設定 `NEXT_PUBLIC_GA_ID`。
- 若要用 meta tag 驗證 Search Console，設定 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`。
- 正式放 affiliate 或合作連結時，在頁面或關於頁保留清楚揭露。
- 部署前依序執行 `npm run content:check`、`npm run production:check`、`npm run lint`、`npm run typecheck`、`npm run build`。

## Ad Placements

目前已預留以下版位：

- 首頁：精選工作流後、工具區後。
- 列表頁：工作流、工具、分類、比較頁的主要內容前。
- 詳情頁：工作流/工具/比較文章正文中段。
- 側欄：工作流、工具、比較詳情頁的桌機 sticky 推薦版位。

三種 AdSense slot 對應：

- `NEXT_PUBLIC_ADSENSE_SLOT_CONTENT`：文章正文中段。
- `NEXT_PUBLIC_ADSENSE_SLOT_LIST`：首頁與列表頁內容區。
- `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR`：詳情頁側欄。

## Formal Pages

正式站已包含：

- `/privacy`：隱私權政策。
- `/terms`：使用條款。
- `/disclosure`：合作與廣告揭露。
- `/ads.txt`：AdSense publisher id 設定後自動輸出授權銷售商記錄。

## Content

主要內容位於 `src/content/data.ts`，型別位於 `src/content/types.ts`。v1 採手動匯入，不接 AI API、不做登入、不接資料庫。
