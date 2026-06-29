# Realtime Voice Converter

日本語 / [English](#english)

## 日本語

リアルタイム音声メモをコピーしやすいテキストに変換する静的Webツールです。

ブラウザの音声認識で話した内容を左側にリアルタイム表示し、停止後または `生成` ボタンで、`えーっと`、`えっと`、`うーん` などのよくあるフィラーを控えめに削ったテキストを右側に出します。AIによる要約、校正、リライトは行いません。

公開URL:

[https://prodarts.github.io/realtime-voice-converter/](https://prodarts.github.io/realtime-voice-converter/)

### これは何か

- 静的Webアプリです。
- 独自サーバーはありません。
- アプリ管理のAI APIキーは不要です。
- 生成処理とフィラー除去はブラウザ内のJavaScriptで行います。
- 文字起こし結果をコピーして、別のアプリやAIチャットへ貼る用途を想定しています。

### ブラウザに関する注意

このアプリには独自サーバーやアプリ管理のAI APIキーはありません。フィラー除去はブラウザ内のJavaScriptで行います。

ただし、音声認識はブラウザの機能に依存します。処理方式、対応言語、オンライン要否、プライバシー挙動はブラウザや端末設定によって異なります。

### 機能

- マイク開始/停止
- リアルタイム文字起こし
- 認識そのまま / 生成結果 の表示
- 停止後またはボタン押下で生成
- 生成結果のコピー
- クリア
- 認識言語の切り替え
- モバイルでは表示タブ切り替え

日本語を主対象にしています。他言語のフィラー辞書は小さな初期辞書による実験的サポートです。

### ショートカット

- macOS: `Control + Option + M`
- macOS fallback: `Command + Option + M`
- Windows/Linux: `Control + Alt + M`
- fallback: `Control + Shift + M`

ショートカットはブラウザページにフォーカスがある時だけ動きます。マイクボタンが主操作です。

### ローカルで使う

GitHubから取得したあと、ローカルで使えます。

```bash
npm install
npm run dev
```

表示されたローカルURLをブラウザで開き、`マイク開始` を押してください。

### ビルド

```bash
npm run build
npm run preview
```

`vite.config.js` はGitHub Pagesなどのサブパス公開でも読み込みやすいように `base: './'` にしています。

### テスト

```bash
npm test
```

日本語フィラーの誤削除を抑えるための最小テストを入れています。

### ブラウザテスト

公開前に [docs/browser-test.md](docs/browser-test.md) を埋めてください。

特に iPhone Safari は、HTTPSの公開URLで実機確認してください。

### Git管理しないもの

この公開版にはAPIキーやサーバーAPIは不要です。以下はGit管理しないでください。

- `.env`
- `.env.local`
- `.api-key-name`
- `node_modules`
- `dist`
- `*.log`
- `.DS_Store`

## English

Realtime Voice Converter is a static web tool that turns live speech notes into copy-ready text.

It shows browser speech recognition results in real time on the left. After you stop recording or press `Generate`, it writes a lightly cleaned version on the right by removing common filler words. It does not summarize, proofread, rewrite, or use AI text generation.

Live demo:

[https://prodarts.github.io/realtime-voice-converter/](https://prodarts.github.io/realtime-voice-converter/)

### What This Is

- A static web app.
- No app-owned backend.
- No app-managed AI API key.
- Text generation and filler removal run in browser-side JavaScript.
- Intended for copying transcripts into another app or AI chat.

### Important Browser Note

This app has no app-owned backend and no app-managed AI API key. Filler removal runs in browser-side JavaScript.

Speech recognition itself depends on your browser. Processing behavior, language support, online requirements, and privacy behavior may vary by browser, device, and settings.

### Features

- Start/stop microphone
- Live speech transcription
- Raw transcript / generated result panes
- Generate after stopping or pressing a button
- Copy generated result
- Clear text
- Recognition language selector
- Mobile tab switching between panes

Japanese is the primary target. Other language filler dictionaries are small experimental defaults.

### Shortcut

- macOS: `Control + Option + M`
- macOS fallback: `Command + Option + M`
- Windows/Linux: `Control + Alt + M`
- fallback: `Control + Shift + M`

The shortcut works only while the browser page is focused. The microphone button is the primary control.

### Use Locally

After downloading or cloning from GitHub, run:

```bash
npm install
npm run dev
```

Open the local URL shown in your terminal, then press `Start microphone`.

### Build

```bash
npm run build
npm run preview
```

`vite.config.js` uses `base: './'` so the build works more easily under GitHub Pages subpaths.

### Test

```bash
npm test
```

The test suite includes a small set of Japanese filler-removal regression checks.

### Browser Testing

Before publishing changes, fill in [docs/browser-test.md](docs/browser-test.md).

For iPhone Safari, test with the HTTPS public URL on a real device.

### Do Not Commit

This public version does not need API keys or server APIs. Do not commit:

- `.env`
- `.env.local`
- `.api-key-name`
- `node_modules`
- `dist`
- `*.log`
- `.DS_Store`
