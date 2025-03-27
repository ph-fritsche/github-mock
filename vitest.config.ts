import {defineConfig} from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        include: [
            'test/**/*.?(c|m)[jt]s?(x)',
        ],
        exclude: [
            '**/_**',
        ],
    },
})
