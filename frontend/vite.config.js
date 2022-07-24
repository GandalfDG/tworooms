import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  let configuration = {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      
    },
  }


  if (command === 'serve') {
    configuration.backend_url = "localhost:1337/"
  }
  else {
    configuration.backend_url = "http://www.tworooms.online/"
  }

  return configuration
})

