export interface Link {
  name: string
  url: string
  key: string
}

export interface Group {
  name: string
  key: string
  links: Link[]
}

// Returns every problem at once so a single build reports them all.
export function validate(groups: Group[]): string[] {
  const errors: string[] = []
  checkKeys(groups, errors)
  for (const group of groups) {
    checkKeys(group.links, errors)
    for (const link of group.links) {
      if (!URL.canParse(link.url)) errors.push(`"${link.name}": invalid url "${link.url}"`)
    }
  }
  return errors
}

// Physical key (KeyboardEvent.code) for a configured key, so it matches regardless of
// keyboard layout or IME: "f" is the F key whether it types f, F, or ㄹ.
export function keyCode(key: string): string {
  const k = key.toUpperCase()
  return /^[0-9]$/.test(k) ? `Digit${k}` : `Key${k}`
}

// Keys must be a single letter or digit found in the name, unique among siblings.
function checkKeys(items: { name: string; key: string }[], errors: string[]) {
  const seen = new Map<string, string>()
  for (const { name, key } of items) {
    const k = key.toLowerCase()
    if (!/^[a-z0-9]$/.test(k)) errors.push(`"${name}": key "${key}" must be a single letter a-z or digit 0-9`)
    else if (!name.toLowerCase().includes(k)) errors.push(`"${name}": key "${key}" not found in name`)
    const other = seen.get(k)
    if (other !== undefined) errors.push(`"${name}": key "${key}" already used by "${other}"`)
    else seen.set(k, name)
  }
}
