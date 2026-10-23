import type { Group } from './model.ts'

// Placeholders — replace with your own. Order here is display order.
// Each key must appear in its name; link keys only need to be unique within their group.
export const groups: Group[] = [
  {
    name: 'dev',
    key: 'd',
    links: [
      { name: 'GitHub', url: 'https://github.com', key: 'g' },
      { name: 'MDN', url: 'https://developer.mozilla.org', key: 'm' },
      { name: 'Stack Overflow', url: 'https://stackoverflow.com', key: 's' },
    ],
  },
  {
    name: 'work',
    key: 'w',
    links: [
      { name: 'Mail', url: 'https://mail.google.com', key: 'm' },
      { name: 'Calendar', url: 'https://calendar.google.com', key: 'c' },
    ],
  },
  {
    name: 'media',
    key: 'm',
    links: [
      { name: 'YouTube', url: 'https://www.youtube.com', key: 'y' },
      { name: 'Hacker News', url: 'https://news.ycombinator.com', key: 'h' },
    ],
  },
]
