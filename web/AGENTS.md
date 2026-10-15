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

- Keep bakery demo state in a shared React context with hydration-safe browser persistence because this request is a simulated frontend, not a live commerce service.
- Keep pricing, cake options and cart calculations in a browser-safe domain module so their business rules can be tested independently.
- Use the root route for the shared bakery shell and separate leaf routes for catalog, cake customization, cart and orders so navigation preserves the same customer state.
