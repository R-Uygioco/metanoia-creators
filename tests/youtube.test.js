import assert from 'node:assert/strict'
import { test } from 'node:test'
import { parseYouTubeId } from '../src/lib/youtube.js'
import { isYouTubeUrl } from '../studio/schemaTypes/validation.js'

test('parses supported YouTube URL formats with an 11-character video ID', () => {
  const expectedId = 'Abc_def-123'

  for (const url of [
    `https://www.youtube.com/watch?v=${expectedId}`,
    `https://youtu.be/${expectedId}`,
    `https://youtube.com/embed/${expectedId}`,
    `https://www.youtube.com/shorts/${expectedId}`,
    `https://youtube-nocookie.com/embed/${expectedId}`,
  ]) {
    assert.equal(parseYouTubeId(url), expectedId)
  }
})

test('rejects invalid IDs, unsupported routes, hosts, and insecure URLs', () => {
  for (const url of [
    'https://youtu.be/short',
    'https://youtu.be/Abc_def-1234',
    'https://youtube.com/Abc_def-123',
    'https://youtube-nocookie.com/watch?v=Abc_def-123',
    'https://youtube.com.evil.example/watch?v=Abc_def-123',
    'http://youtube.com/watch?v=Abc_def-123',
    'javascript:alert(1)',
    '',
    null,
  ]) {
    assert.equal(parseYouTubeId(url), null)
  }
})


test('Sanity accepts and rejects the same YouTube URL formats as the player', () => {
  const supported = [
    'https://www.youtube.com/watch?v=Abc_def-123',
    'https://youtu.be/Abc_def-123',
    'https://youtube.com/embed/Abc_def-123',
    'https://www.youtube.com/shorts/Abc_def-123',
    'https://youtube-nocookie.com/embed/Abc_def-123',
  ]
  const unsupported = [
    'https://youtu.be/Abc_def-123/extra',
    'https://youtube-nocookie.com/shorts/Abc_def-123',
    'https://youtube.com.evil.example/watch?v=Abc_def-123',
    'http://youtube.com/watch?v=Abc_def-123',
  ]

  for (const url of supported) {
    assert.ok(parseYouTubeId(url))
    assert.equal(isYouTubeUrl(url), true)
  }
  for (const url of unsupported) {
    assert.equal(parseYouTubeId(url), null)
    assert.equal(isYouTubeUrl(url), false)
  }
})
