// Генерирует PNG-иконки PWA без внешних зависимостей (только встроенный zlib).
// Запуск: node scripts/gen-icons.mjs
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return (~c) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function hex(c) {
  return [
    parseInt(c.slice(1, 3), 16),
    parseInt(c.slice(3, 5), 16),
    parseInt(c.slice(5, 7), 16),
  ];
}

function makePng(size) {
  const bg = hex('#1f2933');
  const ring = hex('#9aa5b1');
  const north = hex('#f0b429');
  const south = hex('#7b8794');
  const dot = hex('#f7f7f5');
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.31;
  const stride = size * 4 + 1; // +1 байт фильтра на строку
  const raw = Buffer.alloc(stride * size);

  for (let y = 0; y < size; y++) {
    raw[y * stride] = 0; // filter type 0
    for (let x = 0; x < size; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.hypot(dx, dy);
      let col = bg;
      // кольцо компаса
      if (Math.abs(dist - R) < size * 0.025) col = ring;
      // стрелка: вертикальный ромб
      const arrowHalf = (size * 0.10) * (1 - Math.abs(dy) / (R * 0.95));
      if (Math.abs(dy) < R * 0.95 && Math.abs(dx) < Math.max(arrowHalf, 0)) {
        col = dy < 0 ? north : south;
      }
      // центральная точка
      if (dist < size * 0.045) col = dot;
      const o = y * stride + 1 + x * 4;
      raw[o] = col[0];
      raw[o + 1] = col[1];
      raw[o + 2] = col[2];
      raw[o + 3] = 255;
    }
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

mkdirSync('public', { recursive: true });
writeFileSync('public/icon-192.png', makePng(192));
writeFileSync('public/icon-512.png', makePng(512));
console.log('Иконки сгенерированы: public/icon-192.png, public/icon-512.png');
