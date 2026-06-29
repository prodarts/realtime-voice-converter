export const languages = [
  { id: 'ja-JP', label: '日本語', support: 'primary' },
  { id: 'en-US', label: 'English', support: 'experimental' },
  { id: 'ko-KR', label: '한국어', support: 'experimental' },
  { id: 'zh-CN', label: '中文', support: 'experimental' },
  { id: 'es-ES', label: 'Español', support: 'experimental' }
];

export const fillerPatternsByLanguage = {
  'ja-JP': [
    /えーっと/g,
    /えっと(?!思った)/g,
    /えーと(?!思った)/g,
    /あのー/g,
    /まー/g,
    /うーん/g,
    /うんと/g,
    /えー/g,
    /あー/g
  ],
  'en-US': [
    /\bumm+\b/gi,
    /\bum+\b/gi,
    /\buh+\b/gi,
    /\ber+\b/gi,
    /\bah+\b/gi,
    /\byou know\b/gi,
    /\bi mean\b/gi
  ],
  'ko-KR': [/음+/g, /어+/g, /그니까/g, /그러니까/g, /뭐랄까/g],
  'zh-CN': [/嗯+/g, /呃+/g],
  'es-ES': [/\behh*\b/gi, /\bem+\b/gi, /\bo sea\b/gi]
};

export function cleanSpacing(text, language) {
  if (language === 'ja-JP' || language === 'zh-CN') {
    return text
      .replace(/\s+/g, '')
      .replace(/、{2,}/g, '、')
      .replace(/。{2,}/g, '。')
      .replace(/^、+|、+$/g, '')
      .trim();
  }

  return text
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.!?;:])/g, '$1')
    .replace(/([¿¡])\s+/g, '$1')
    .trim();
}

export function removeFillers(text, language = 'ja-JP') {
  const patterns = fillerPatternsByLanguage[language] || fillerPatternsByLanguage['ja-JP'];
  const cleaned = patterns.reduce((next, pattern) => next.replace(pattern, ''), text);
  return cleanSpacing(cleaned, language);
}
