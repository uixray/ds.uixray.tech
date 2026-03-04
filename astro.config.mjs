// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  site: 'https://ds.uixray.tech',
  integrations: [
    starlight({
      title: 'CoreDS',
      description: 'UIXRay Design System — Components, Patterns & Philosophy',
      logo: {
        light: './src/assets/coreds-logo.svg',
        dark: './src/assets/coreds-logo.svg',
        replacesTitle: false,
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/uixray/coreds-vault',
        },
      ],
      sidebar: [
        { label: 'Overview', link: '/' },
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
        {
          label: 'Design System',
          autogenerate: { directory: 'design-system' },
          collapsed: true,
        },
        {
          label: 'UX Patterns',
          autogenerate: { directory: 'patterns' },
          collapsed: true,
        },
        {
          label: 'Workspace',
          items: [
            { label: 'Philosophy', link: '/workspace/philosophy/designer-as-creative-director/' },
            { label: 'Figma Plugins', autogenerate: { directory: 'workspace/figma-plugins' } },
            { label: 'Services', autogenerate: { directory: 'workspace/services' } },
            { label: 'System', autogenerate: { directory: 'workspace/system' } },
          ],
        },
        { label: 'Design Tokens', link: '/tokens/' },
        { label: 'Project Status', link: '/status/' },
      ],
      customCss: ['./src/styles/custom.css'],
      defaultLocale: 'root',
      locales: {
        root: { label: 'Russian', lang: 'ru' },
      },
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: '',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
          },
        },
      ],
      components: {
        PageTitle: './src/components/PageTitle.astro',
      },
      lastUpdated: true,
      pagination: true,
    }),
  ],
})
