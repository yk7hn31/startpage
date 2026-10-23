import type { Group } from './model.ts'

// Placeholders — replace with your own. Order here is display order.
// Each key must appear in its name; link keys only need to be unique within their group.
export const groups: Group[] = [
  {
    name: 'work',
    key: 'w',
    links: [
      { name: 'TLMS', url: 'https://tlms.cku.ac.kr', key: 't' },
      { name: 'GitHub', url: 'https://github.com', key: 'g' },
      { name: 'Drive', url: 'https://drive.google.com', key: 'd' },
      { name: 'Gmail', url: 'https://mail.google.com', key: 'm' }
    ],
  },
  {
    name: 'media',
    key: 'm',
    links: [
      { name: 'Instagram', url: 'https://www.instagram.com', key: 'i' },
      { name: 'X', url: 'https://x.com', key: 'x' },
      { name: 'YouTube', url: 'https://www.youtube.com', key: 'y' },
      { name: 'Netflix', url: 'https://www.netflix.com', key: 'n' }
    ],
  },
  {
    name: 'explore',
    key: 'e',
    links: [
      { name: 'Naver Map', url: 'https://map.naver.com', key: 'n' },
      { name: 'Google Maps', url: 'https://maps.google.com', key: 'g' },
      { name: 'Coupang', url: 'https://www.coupang.com', key: 'c' },
      { name: 'CatchTable', url: 'https://app.catchtable.co.kr', key: 't' }
    ],
  },
]
