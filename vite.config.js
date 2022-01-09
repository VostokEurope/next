// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const path = require('path')
const vue = require('@vitejs/plugin-vue')

module.exports = {
    define: {
        'process.env': process.env
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),


    ],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3027/api',
                changeOrigin: true,
                rewrite: (path) => {
                    console.log(path)
                    return  path.replace(/^\/api/, '')
                }
            },
        }
    }
}
