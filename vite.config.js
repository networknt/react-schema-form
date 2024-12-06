import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "react-schema-form",
      fileName: "react-schema-form",
    },
    sourcemap: true,
    rollupOptions: {
      external: [
        "react", 
        "react-dom", 
        "@babel/runtime", 
        "@codemirror/autocomplete", 
        "@codemirror/language",
        "@codemirror/lint",
        "@codemirror/search",
        "@codemirror/state",
        "@codemirror/theme-one-dark",
        "@codemirror/view",
        "@lezer/common",
        "@uiw/react-markdown-editor",
        "@emotion/react",
        "@emotion/styled",
        "@mui/icons-material",
        "@mui/material",
        "@mui/styles",
        "codemirror"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "React-dom",
          "@babel/runtime": "BabelRuntime",
          "@codemirror/autocomplete": "CodeMirrorAutocomplete",
          "@codemirror/language": "CodeMirrorLanguage",
          "@codemirror/lint": "CodeMirrorLint",
          "@codemirror/search": "CodeMirrorSearch",
          "@codemirror/state": "CodeMirrorState",
          "@codemirror/theme-one-dark": "CodeMirrorThemeOneDark",
          "@codemirror/view": "CodeMirrorView",
          "@lezer/common": "LezerCommon",
          "@uiw/react-markdown-editor": "UiwReactMarkdownEditor",
          "@emotion/react": "EmotionReact",
          "@emotion/styled": "EmotionStyled",
          "@mui/icons-material": "MuiIconsMaterial",
          "@mui/material": "MuiMaterial",
          "@mui/styles": "MuiStyles",
          "codemirror": "CodeMirror"
        },
      },
    },
  },  
})
