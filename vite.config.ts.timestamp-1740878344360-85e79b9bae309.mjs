// vite.config.ts
import react from "file:///C:/Users/CC1925/Desktop/react/oauth/meme/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { resolve } from "path";
import { defineConfig } from "file:///C:/Users/CC1925/Desktop/react/oauth/meme/node_modules/vite/dist/node/index.js";
import { compression } from "file:///C:/Users/CC1925/Desktop/react/oauth/meme/node_modules/vite-plugin-compression2/dist/index.mjs";
import { qrcode } from "file:///C:/Users/CC1925/Desktop/react/oauth/meme/node_modules/vite-plugin-qrcode/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\CC1925\\Desktop\\react\\oauth\\meme";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "./src")
    }
  },
  envDir: "./env/",
  plugins: [
    react(),
    qrcode(),
    compression({
      algorithm: "gzip",
      exclude: [/\.(br)$/, /\.(gz)$/]
    }),
    compression({
      algorithm: "brotliCompress",
      exclude: [/\.(br)$/, /\.(gz)$/]
    })
  ],
  test: {
    globals: true,
    watch: false,
    environment: "happy-dom",
    setupFiles: "./src/setup-test.ts"
  },
  build: {
    sourcemap: false,
    target: "esnext",
    minify: true,
    cssTarget: "esnext",
    cssMinify: true,
    cssCodeSplit: true,
    modulePreload: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react/jsx-runtime", "react-dom"],
          "vendor-mantine": ["@mantine/core", "@mantine/hooks", "@mantine/notifications"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxDQzE5MjVcXFxcRGVza3RvcFxcXFxyZWFjdFxcXFxvYXV0aFxcXFxtZW1lXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxDQzE5MjVcXFxcRGVza3RvcFxcXFxyZWFjdFxcXFxvYXV0aFxcXFxtZW1lXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9DQzE5MjUvRGVza3RvcC9yZWFjdC9vYXV0aC9tZW1lL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGNvbXByZXNzaW9uIH0gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24yJ1xuaW1wb3J0IHsgcXJjb2RlIH0gZnJvbSAndml0ZS1wbHVnaW4tcXJjb2RlJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgIH0sXG4gIH0sXG4gIGVudkRpcjogJy4vZW52LycsXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHFyY29kZSgpLFxuICAgIGNvbXByZXNzaW9uKHtcbiAgICAgIGFsZ29yaXRobTogJ2d6aXAnLFxuICAgICAgZXhjbHVkZTogWy9cXC4oYnIpJC8sIC9cXC4oZ3opJC9dLFxuICAgIH0pLFxuICAgIGNvbXByZXNzaW9uKHtcbiAgICAgIGFsZ29yaXRobTogJ2Jyb3RsaUNvbXByZXNzJyxcbiAgICAgIGV4Y2x1ZGU6IFsvXFwuKGJyKSQvLCAvXFwuKGd6KSQvXSxcbiAgICB9KSxcbiAgXSxcbiAgdGVzdDoge1xuICAgIGdsb2JhbHM6IHRydWUsXG4gICAgd2F0Y2g6IGZhbHNlLFxuICAgIGVudmlyb25tZW50OiAnaGFwcHktZG9tJyxcbiAgICBzZXR1cEZpbGVzOiAnLi9zcmMvc2V0dXAtdGVzdC50cycsXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgIG1pbmlmeTogdHJ1ZSxcbiAgICBjc3NUYXJnZXQ6ICdlc25leHQnLFxuICAgIGNzc01pbmlmeTogdHJ1ZSxcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgbW9kdWxlUHJlbG9hZDogdHJ1ZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgJ3ZlbmRvci1yZWFjdCc6IFsncmVhY3QnLCAncmVhY3QvanN4LXJ1bnRpbWUnLCAncmVhY3QtZG9tJ10sXG4gICAgICAgICAgJ3ZlbmRvci1tYW50aW5lJzogWydAbWFudGluZS9jb3JlJywgJ0BtYW50aW5lL2hvb2tzJywgJ0BtYW50aW5lL25vdGlmaWNhdGlvbnMnXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUN4QixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLG1CQUFtQjtBQUM1QixTQUFTLGNBQWM7QUFMdkIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUNqQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxJQUNQLFlBQVk7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYLFNBQVMsQ0FBQyxXQUFXLFNBQVM7QUFBQSxJQUNoQyxDQUFDO0FBQUEsSUFDRCxZQUFZO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxTQUFTLENBQUMsV0FBVyxTQUFTO0FBQUEsSUFDaEMsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULE9BQU87QUFBQSxJQUNQLGFBQWE7QUFBQSxJQUNiLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxXQUFXO0FBQUEsSUFDWCxjQUFjO0FBQUEsSUFDZCxlQUFlO0FBQUEsSUFDZixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixnQkFBZ0IsQ0FBQyxTQUFTLHFCQUFxQixXQUFXO0FBQUEsVUFDMUQsa0JBQWtCLENBQUMsaUJBQWlCLGtCQUFrQix3QkFBd0I7QUFBQSxRQUNoRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
