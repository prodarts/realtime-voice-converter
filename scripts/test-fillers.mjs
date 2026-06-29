import assert from 'node:assert/strict';
import { removeFillers } from '../src/fillers.js';

const shouldRemove = [
  ['えっと今日はテストです', '今日はテストです'],
  ['えーっと、マイクを確認します', 'マイクを確認します'],
  ['うーんこれは便利です', 'これは便利です'],
  ['あー音声が入りました', '音声が入りました']
];

const shouldKeep = [
  'あのちゃんが好き',
  'あの人に渡す',
  'あの店に行く',
  'まあまあ良かった',
  'なんか好き',
  'そのままコピーする',
  'えっと思った'
];

for (const [input, expected] of shouldRemove) {
  assert.equal(removeFillers(input, 'ja-JP'), expected);
}

for (const input of shouldKeep) {
  assert.equal(removeFillers(input, 'ja-JP'), input);
}

assert.equal(removeFillers('um this is a test', 'en-US'), 'this is a test');

console.log('Filler tests passed');
