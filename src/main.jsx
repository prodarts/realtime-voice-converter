import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { languages, removeFillers } from './fillers.js';

function getSpeechRecognition() {
  return window.SpeechRecognition || window.webkitSpeechRecognition;
}

function App() {
  const Recognition = useMemo(() => getSpeechRecognition(), []);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef('');
  const [language, setLanguage] = useState('ja-JP');
  const [activePane, setActivePane] = useState('cleaned');
  const [isListening, setIsListening] = useState(false);
  const [rawText, setRawText] = useState('');
  const [cleanedText, setCleanedText] = useState('');
  const [status, setStatus] = useState('待機中');
  const [error, setError] = useState('');

  const canUseSpeech = Boolean(Recognition);

  useEffect(() => {
    function handleKeyDown(event) {
      const target = event.target;
      const isEditable =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;
      const isMicShortcut =
        event.code === 'KeyM' &&
        ((event.ctrlKey && event.altKey) || (event.ctrlKey && event.shiftKey));

      if (event.isComposing || isEditable || !isMicShortcut) {
        return;
      }

      event.preventDefault();
      if (isListening) {
        stopListening();
      } else {
        startListening();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isListening, Recognition, language]);

  function updateTexts(text) {
    setRawText(text);
    setCleanedText(removeFillers(text, language));
  }

  function startListening() {
    if (!Recognition) {
      setError('このブラウザでは音声認識を利用できません。ChromeまたはSafariで試してください。');
      return;
    }

    const recognition = new Recognition();
    recognition.lang = language;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setError('');
      setIsListening(true);
      setStatus('認識中');
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const transcript = event.results[index][0].transcript;
        if (event.results[index].isFinal) {
          finalTranscriptRef.current = `${finalTranscriptRef.current} ${transcript}`.trim();
        } else {
          interimTranscript = `${interimTranscript} ${transcript}`.trim();
        }
      }

      updateTexts(`${finalTranscriptRef.current} ${interimTranscript}`.trim());
    };

    recognition.onerror = (event) => {
      setError(`音声認識エラー: ${event.error}`);
      setStatus('エラー');
    };

    recognition.onend = () => {
      setIsListening(false);
      setStatus('停止中');
    };

    recognitionRef.current = recognition;
    recognition.start();
  }

  function stopListening() {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);
    setStatus('停止中');
  }

  function clearText() {
    finalTranscriptRef.current = '';
    setRawText('');
    setCleanedText('');
    setError('');
    setStatus(isListening ? '認識中' : '待機中');
  }

  async function copyCleanedText() {
    if (!cleanedText) {
      return;
    }

    await navigator.clipboard.writeText(cleanedText);
    setStatus('コピーしました');
  }

  function changeLanguage(nextLanguage) {
    if (isListening) {
      stopListening();
    }

    setLanguage(nextLanguage);
    setCleanedText(removeFillers(rawText, nextLanguage));
  }

  const selectedLanguage = languages.find((item) => item.id === language);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Static browser tool</p>
          <h1>Realtime Filler Cleaner</h1>
          <p>
            話した内容をリアルタイム表示しながら、よくあるフィラーだけを控えめに削る音声メモツールです。
          </p>
        </div>
        <div className="status" data-active={isListening}>
          <span />
          {status}
        </div>
      </header>

      <section className="controls" aria-label="操作">
        <button
          className="primary"
          onClick={isListening ? stopListening : startListening}
          disabled={!canUseSpeech}
        >
          <span>{isListening ? '停止' : 'マイク開始'}</span>
          <kbd>⌃⌥M</kbd>
        </button>
        <button onClick={copyCleanedText} disabled={!cleanedText}>
          コピー
        </button>
        <button onClick={clearText} disabled={!rawText && !cleanedText}>
          クリア
        </button>
        <label className="language-select">
          <span>認識言語</span>
          <select
            value={language}
            onChange={(event) => changeLanguage(event.target.value)}
            disabled={isListening}
          >
            {languages.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="summary-grid" aria-label="特徴">
        <div>
          <strong>リアルタイム表示</strong>
          <span>話しながら文字を見る</span>
        </div>
        <div>
          <strong>コピー前提</strong>
          <span>整えた文をすぐ渡す</span>
        </div>
        <div>
          <strong>AI APIなし</strong>
          <span>フィラー除去はブラウザ内JS</span>
        </div>
      </section>

      {!canUseSpeech && (
        <p className="notice">このブラウザでは音声認識を利用できません。ChromeまたはSafariで試してください。</p>
      )}
      <p className="notice subtle">
        音声認識はブラウザ機能に依存します。オンライン要否、対応言語、プライバシー挙動はブラウザや端末設定によって異なります。
        {selectedLanguage?.support === 'experimental' && ' この言語のフィラー辞書は実験的サポートです。'}
      </p>
      {error && <p className="error">{error}</p>}

      <div className="mobile-tabs" role="tablist" aria-label="表示切り替え">
        <button
          type="button"
          role="tab"
          aria-selected={activePane === 'cleaned'}
          onClick={() => setActivePane('cleaned')}
        >
          フィラー削除済み
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activePane === 'raw'}
          onClick={() => setActivePane('raw')}
        >
          認識そのまま
        </button>
      </div>

      <section className="workspace">
        <article className="pane raw-pane" data-mobile-active={activePane === 'raw'}>
          <div className="pane-header">
            <h2>認識そのまま</h2>
          </div>
          <textarea
            value={rawText}
            onChange={(event) => updateTexts(event.target.value)}
            placeholder="ここに音声認識されたテキストが入ります。直接入力して試すこともできます。"
          />
        </article>

        <article className="pane cleaned-pane" data-mobile-active={activePane === 'cleaned'}>
          <div className="pane-header">
            <h2>フィラー削除済み</h2>
          </div>
          <textarea
            value={cleanedText}
            onChange={(event) => setCleanedText(event.target.value)}
            placeholder="フィラーを削ったテキストがここに表示されます。"
          />
        </article>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
