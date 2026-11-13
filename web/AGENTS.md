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
- Compose cake previews from public/bolos via closestCakeImage, using whole-photo decoration suffixes (-frutas, -flores, -lisa) for independent flower/berry flags; preload only the current cake's four decoration photos to avoid loading the whole catalog. Keep pricing independent of these flags.
- Keep real registrations and support separate from the simulated commerce state; use authenticated server functions and database-enforced RPC permissions for private mutations and reads.
- Assign new accounts the client role only; elevated access requires an existing administrator, and initial administrator provisioning must be explicitly authorized for a named account.
- Store stock settings per storefront branch and seasonal campaign settings in Cloud with admin-only writes; apply availability to the simulated cart without decrementing real stock because checkout remains demonstrative.
- Keep combo preparation in each cart item and validate it at checkout so fried/frozen choices persist into orders without altering existing prices or delivery fees.
- Public test logins select isolated browser-only demo personas, never Auth sessions or real roles; demo management must never call private Cloud mutations.
- Keep isolated catalog overrides branch-scoped in demo state and apply them consistently to storefront availability, current cart prices and checkout; completed order prices remain snapshots.
- Preserve catalog product IDs when renaming or rephotographing products, and refresh persisted cart imagery on hydration so stock links and customer carts remain consistent.

- Outer frosting travels in CakeConfig with a legacy ivory default; white, chocolate and naked are always selectable and the preview always shows one of the corrected photos in public/bolos (exact match via getCakeImage, otherwise the closest photo labelled as illustrative), because the user rejected the old variant photos.
- Keep demo coupons (admin creates/activates, employees distribute, customers redeem their own) and menu promotions in browser-safe domain modules; promotions apply in the store's cart pricing so storefront, cart and checkout agree.
- Demo stock is tracked as units per product and branch (default applies until set); simulated checkout subtracts units and zero units always means sold out.
