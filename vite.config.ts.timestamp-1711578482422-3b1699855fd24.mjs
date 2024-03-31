// vite.config.ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'file:///G:/Vscode/%E5%89%8D%E7%AB%AF/%E9%87%91%E8%B1%AA%E6%A5%A0%E6%AF%95%E8%AE%BE/Vue%E9%A1%B5%E9%9D%A2/cnrs/node_modules/vite/dist/node/index.js'
import vue from 'file:///G:/Vscode/%E5%89%8D%E7%AB%AF/%E9%87%91%E8%B1%AA%E6%A5%A0%E6%AF%95%E8%AE%BE/Vue%E9%A1%B5%E9%9D%A2/cnrs/node_modules/@vitejs/plugin-vue/dist/index.mjs'
import vueJsx from 'file:///G:/Vscode/%E5%89%8D%E7%AB%AF/%E9%87%91%E8%B1%AA%E6%A5%A0%E6%AF%95%E8%AE%BE/Vue%E9%A1%B5%E9%9D%A2/cnrs/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs'
import VueDevTools from 'file:///G:/Vscode/%E5%89%8D%E7%AB%AF/%E9%87%91%E8%B1%AA%E6%A5%A0%E6%AF%95%E8%AE%BE/Vue%E9%A1%B5%E9%9D%A2/cnrs/node_modules/vite-plugin-vue-devtools/dist/vite.mjs'
import AutoImport from 'file:///G:/Vscode/%E5%89%8D%E7%AB%AF/%E9%87%91%E8%B1%AA%E6%A5%A0%E6%AF%95%E8%AE%BE/Vue%E9%A1%B5%E9%9D%A2/cnrs/node_modules/unplugin-auto-import/dist/vite.js'
import Components from 'file:///G:/Vscode/%E5%89%8D%E7%AB%AF/%E9%87%91%E8%B1%AA%E6%A5%A0%E6%AF%95%E8%AE%BE/Vue%E9%A1%B5%E9%9D%A2/cnrs/node_modules/unplugin-vue-components/dist/vite.js'
import { ElementPlusResolver } from 'file:///G:/Vscode/%E5%89%8D%E7%AB%AF/%E9%87%91%E8%B1%AA%E6%A5%A0%E6%AF%95%E8%AE%BE/Vue%E9%A1%B5%E9%9D%A2/cnrs/node_modules/unplugin-vue-components/dist/resolvers.js'
var __vite_injected_original_import_meta_url =
    'file:///G:/Vscode/%E5%89%8D%E7%AB%AF/%E9%87%91%E8%B1%AA%E6%A5%A0%E6%AF%95%E8%AE%BE/Vue%E9%A1%B5%E9%9D%A2/cnrs/vite.config.ts'
var vite_config_default = defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        VueDevTools(),
        // element-plus
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        })
    ],
    // 开发环境有效
    server: {
        proxy: {
            // http://localhost:5173/api ===> http://124.223.43.79:233
            '/api': {
                target: 'http://124.223.43.79:233',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    // 起个别名，在引用资源时，可以用‘@/资源路径’直接访问
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', __vite_injected_original_import_meta_url))
        }
    }
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJHOlxcXFxWc2NvZGVcXFxcXHU1MjREXHU3QUVGXFxcXFx1OTFEMVx1OEM2QVx1Njk2MFx1NkJENVx1OEJCRVxcXFxWdWVcdTk4NzVcdTk3NjJcXFxcY25yc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRzpcXFxcVnNjb2RlXFxcXFx1NTI0RFx1N0FFRlxcXFxcdTkxRDFcdThDNkFcdTY5NjBcdTZCRDVcdThCQkVcXFxcVnVlXHU5ODc1XHU5NzYyXFxcXGNucnNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0c6L1ZzY29kZS8lRTUlODklOEQlRTclQUIlQUYvJUU5JTg3JTkxJUU4JUIxJUFBJUU2JUE1JUEwJUU2JUFGJTk1JUU4JUFFJUJFL1Z1ZSVFOSVBMSVCNSVFOSU5RCVBMi9jbnJzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCBWdWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5cbi8vIGVsZW1lbnQtcGx1c1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgdnVlKCksXG4gICAgICAgIHZ1ZUpzeCgpLFxuICAgICAgICBWdWVEZXZUb29scygpLFxuXG4gICAgICAgIC8vIGVsZW1lbnQtcGx1c1xuICAgICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgICAgIH0pLFxuICAgICAgICBDb21wb25lbnRzKHtcbiAgICAgICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgICAgIH0pLFxuICAgIF0sXG4gICAgLy8gXHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXHU2NzA5XHU2NTQ4XG4gICAgc2VydmVyOiB7XG4gICAgICAgIHByb3h5OiB7XG4gICAgICAgICAgICAvLyBodHRwOi8vbG9jYWxob3N0OjUxNzMvYXBpID09PT4gaHR0cDovLzEyNC4yMjMuNDMuNzk6MjMzXG4gICAgICAgICAgICAnL2FwaSc6IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IFwiaHR0cDovLzEyNC4yMjMuNDMuNzk6MjMzXCIsXG4gICAgICAgICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gXHU4RDc3XHU0RTJBXHU1MjJCXHU1NDBEXHVGRjBDXHU1NzI4XHU1RjE1XHU3NTI4XHU4RDQ0XHU2RTkwXHU2NUY2XHVGRjBDXHU1M0VGXHU0RUU1XHU3NTI4XHUyMDE4QC9cdThENDRcdTZFOTBcdThERUZcdTVGODRcdTIwMTlcdTc2RjRcdTYzQTVcdThCQkZcdTk1RUVcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgICAgICB9XG4gICAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlYsU0FBUyxlQUFlLFdBQVc7QUFFaFksU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGlCQUFpQjtBQUd4QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQVZ5SSxJQUFNLDJDQUEyQztBQWM5TixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxZQUFZO0FBQUE7QUFBQSxJQUdaLFdBQVc7QUFBQSxNQUNQLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLElBQ3JDLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNQLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLElBQ3JDLENBQUM7QUFBQSxFQUNMO0FBQUE7QUFBQSxFQUVBLFFBQVE7QUFBQSxJQUNKLE9BQU87QUFBQTtBQUFBLE1BRUgsUUFBUTtBQUFBLFFBQ0osUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLE1BQ2hEO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQTtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN4RDtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
