# 称賛シュミレーター

過剰な褒め言葉が殺到するX(Twitter)風シミュレーションサイト

## デプロイ方法

### 1. GitHub Pages（無料・簡単）

1. GitHubリポジトリの Settings → Pages へ移動
2. Source を「Deploy from a branch」に設定
3. Branch を「master」、フォルダを「/ (root)」に設定
4. Save をクリック
5. 数分後に `https://murakamiyoshiyuki.github.io/syousan/` でアクセス可能

#### 独自ドメイン設定
1. ドメインのDNS設定で以下のいずれかを設定：
   - Aレコード: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - CNAMEレコード: `murakamiyoshiyuki.github.io`
2. リポジトリに`CNAME`ファイルを作成（ドメイン名を記載）
3. GitHub Pages設定でCustom domainにドメインを入力

### 2. Netlify（無料・高機能）

1. [Netlify](https://www.netlify.com/)にサインアップ
2. GitHubリポジトリを接続
3. デプロイ設定はデフォルトのままでOK
4. Domain settingsから独自ドメインを設定

### 3. Vercel（無料・高速）

1. [Vercel](https://vercel.com/)にサインアップ
2. GitHubリポジトリをインポート
3. そのままデプロイ
4. Domainsから独自ドメインを追加

### 4. Cloudflare Pages（無料・CDN付き）

1. [Cloudflare Pages](https://pages.cloudflare.com/)にサインアップ
2. GitHubリポジトリを接続
3. ビルド設定は空欄でOK
4. Custom domainsから独自ドメインを設定

## おすすめ

- **簡単さ重視**: GitHub Pages
- **高機能**: Netlify
- **速度重視**: Vercel
- **Cloudflare使用中**: Cloudflare Pages