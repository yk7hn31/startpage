import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { groups } from './src/bookmarks.ts'
import { validate } from './src/model.ts'

// Fails the build on any bookmark config mistake instead of shipping a broken page.
function validateBookmarks(): Plugin {
  return {
    name: 'validate-bookmarks',
    buildStart() {
      const errors = validate(groups)
      if (errors.length > 0) this.error(`Invalid src/bookmarks.ts:\n  ${errors.join('\n  ')}`)
    },
  }
}

// Single self-contained file: Chrome refuses external module scripts over file://.
export default defineConfig({
  plugins: [validateBookmarks(), react(), viteSingleFile()],
})
