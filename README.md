# FlowKit AI

繁體中文 AI 自動化工作流內容站，主題聚焦 n8n、Make、Zapier、ChatGPT、Google Sheets、Gmail、Notion、LINE 等工具的實作流程、工具比較與範本型 SEO 內容。

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

`content:check` 會檢查 slug、必要欄位、內部連結與 sitemap 路由數量。`production:check` 會檢查正式部署需要的環境變數、合規頁與 AdSense 設定。

## Environment

部署到 Vercel 時建議設定：

```txt
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=google-site-verification-token
```

AdSense：

```txt
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-4978342687742145
NEXT_PUBLIC_ADSENSE_SLOT_CONTENT=1215310058
NEXT_PUBLIC_ADSENSE_SLOT_LIST=
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=
```

目前已接入的手動廣告單元：

- `NEXT_PUBLIC_ADSENSE_SLOT_CONTENT`：文章內廣告，使用 AdSense `in-article` / `fluid` 格式。

尚未建立 slot 時，`NEXT_PUBLIC_ADSENSE_SLOT_LIST` 與 `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` 可以先留空，對應版位會顯示站內合作/推薦 placeholder，不會載入空的 AdSense 單元。

## Deployment Checklist

- 在 Vercel 設定 `NEXT_PUBLIC_SITE_URL`，正式申請 AdSense 建議使用自訂網域。
- 在 Google Search Console 驗證網站並提交 `/sitemap.xml`。
- 在 AdSense 建立手動廣告單元後，把 `data-ad-slot` 填到對應的 Vercel env。
- 確認 `/ads.txt` 有輸出 `google.com, pub-4978342687742145, DIRECT, f08c47fec0942fa0`。
- 部署前執行 `npm run content:check`、`npm run production:check`、`npm run lint`、`npm run typecheck`、`npm run build`。

## Ad Placements

網站支援三種廣告/合作版位：

- `content`：工作流、工具、比較詳情頁正文中段。已有 AdSense in-article slot。
- `list`：首頁、列表頁與分類頁內容流中段。尚未設定 AdSense slot。
- `sidebar`：詳情頁側欄推薦區。尚未設定 AdSense slot。

若使用 AdSense 自動廣告，Google 可能會自行插入額外位置；若想精準控制廣告位置，請建立手動廣告單元並使用上述 slot env。

## Formal Pages

已包含：

- `/privacy`
- `/terms`
- `/disclosure`
- `/ads.txt`
- `/sitemap.xml`
- `/robots.txt`

## Content

內容資料集中在 `src/content/data.ts`，型別定義在 `src/content/types.ts`。v1 不接 AI API、不做登入、不使用資料庫。
