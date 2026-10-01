<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the supplied profile's verified copy and local PNG/JPG image paths in `src/lib/maxwell-content.ts`; extracted originals in `public/assets/images` avoid runtime PDF and JSON dependencies.
- Use TanStack Start file routes for this site's pages because the project runtime and generated route tree require them; do not introduce a second router.
- Keep contact inquiries as copyable drafts until the company supplies a verified destination; silently collecting or claiming to send them would mislead visitors.
