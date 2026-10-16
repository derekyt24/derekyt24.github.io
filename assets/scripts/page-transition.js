/* Wait for an initial paint, then reveal the page. */
requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        document.body.classList.add("page-ready");
    });
});

const pageLeaveDuration = 350;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

document.addEventListener("click", event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest("a[href]");
    if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin) return;
    if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;
    if (reduceMotion.matches) return;

    event.preventDefault();
    const bodyStyle = window.getComputedStyle(document.body);
    document.body.style.setProperty("--page-transition-background-color", bodyStyle.backgroundColor);
    document.body.style.setProperty("--page-transition-background-image", bodyStyle.backgroundImage);
    document.body.style.setProperty("--page-transition-background-position", bodyStyle.backgroundPosition);
    document.body.style.setProperty("--page-transition-background-size", bodyStyle.backgroundSize);
    document.body.style.setProperty("--page-transition-background-repeat", bodyStyle.backgroundRepeat);
    document.body.style.setProperty("--page-transition-background-attachment", bodyStyle.backgroundAttachment);
    document.body.classList.add("page-leaving");
    window.setTimeout(() => window.location.assign(destination.href), pageLeaveDuration);
});

window.addEventListener("pageshow", () => {
    document.body.classList.remove("page-leaving");
    document.body.classList.add("page-ready");
});
