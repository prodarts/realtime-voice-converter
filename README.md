# Realtime Filler Cleaner

リアルタイム音声メモのフィラー除去ツールです。

ブラウザの音声認識で話した内容を表示しながら、`えーっと`、`えっと`、`うーん` などのよくあるフィラーを控えめに削ります。AIによる要約、校正、リライトは行いません。

## What This Is

- 静的Webアプリです。
- 独自サーバーはありません。
- アプリ管理のAI APIキーは不要です。
- フィラー除去はブラウザ内のJavaScriptで行います。
- 文字起こし結果をコピーして、別のアプリやAIチャットへ貼る用途を想定しています。

## Important Browser Note

このアプリには独自サーバーやアプリ管理のAI APIキーはありません。フィラー除去はブラウザ内のJavaScriptで行います。

ただし、音声認識はブラウザの機能に依存します。処理方式、対応言語、オンライン要否、プライバシー挙動はブラウザや端末設定によって異なります。

## Features

- マイク開始/停止
- リアルタイム文字起こし
- 認識そのまま / フィラー削除済み の表示
- フィラー削除済みテキストのコピー
- クリア
- 認識言語の切り替え
- モバイルでは表示タブ切り替え

日本語を主対象にしています。他言語のフィラー辞書は小さな初期辞書による実験的サポートです。

## Shortcut

- macOS: `Control + Option + M`
- Windows/Linux: `Control + Alt + M`
- fallback: `Control + Shift + M`

ショートカットはブラウザページにフォーカスがある時だけ動きます。マイクボタンが主操作です。

## Use Locally

GitHubから取得したあと、ローカルで使えます。

```bash
npm install
npm run dev
```

表示されたローカルURLをブラウザで開き、`マイク開始` を押してください。

## Build

```bash
npm run build
npm run preview
```

`vite.config.js` はGitHub Pagesなどのサブパス公開でも読み込みやすいように `base: './'` にしています。

## Test

```bash
npm test
```

日本語フィラーの誤削除を抑えるための最小テストを入れています。

## Browser Testing

公開前に [docs/browser-test.md](docs/browser-test.md) を埋めてください。

特に iPhone Safari は、HTTPSの公開URLで実機確認してください。

## Do Not Commit

この公開版にはAPIキーやサーバーAPIは不要です。以下はGit管理しないでください。

- `.env`
- `.env.local`
- `.api-key-name`
- `node_modules`
- `dist`
- `*.log`
- `.DS_Store`
