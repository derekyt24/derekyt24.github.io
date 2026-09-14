/* Wait for an initial paint, then reveal the page. */
requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        document.body.classList.add("page-ready");
    });
});
