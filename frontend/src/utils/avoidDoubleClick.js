export const avoidDoubleClick = () => {
    let lastClickElement = null;
    let lastClickTime = Date.now();
    document.addEventListener("click", function (e) {
        const { target } = e;
        const now = Date.now();
        if (target === lastClickElement && (now - lastClickTime) < 500) {
            e.preventDefault();
            e.stopPropagation();
        }
        lastClickElement = target;
        lastClickTime = now;
    }, true);
}