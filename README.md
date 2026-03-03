# CoreDS — ds.uixray.tech

Documentation site for [CoreDS](https://github.com/uixray/coreds-vault) — UIXRay Design System.

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build), deployed on Vercel.

## Stack

- **Astro 5** + **Starlight** — docs framework
- **Vercel** — hosting (auto-deploy on push)
- **coreds-vault** — content source (git submodule)

## Development

```bash
# Install dependencies
npm install

# Sync vault content + start dev server
npm run dev

# Sync vault content + build
npm run build

# Sync content only
npm run sync
```

## Content sync

Vault content is synced from the `vault/` submodule at dev/build time by `scripts/sync-content.mjs`.

To update vault submodule: `git submodule update --remote vault`

GitHub Actions runs a weekly sync (Monday 08:00 UTC) and supports manual `workflow_dispatch`.

## License

MIT — Ray (@uixray)
