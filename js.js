(function () {
    'use strict';

    const REPLACEMENTS = [
        { pattern: /400\.01/g, replacement: "900.00" },
        { pattern: /16050/g,   replacement: "900.00" }
    ];

    function replaceText(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let text = node.data;
            for (const r of REPLACEMENTS) {
                text = text.replace(r.pattern, r.replacement);
            }
            node.data = text;
        } else {
            for (let child of node.childNodes) {
                replaceText(child);
            }
        }
    }

    // Run immediately
    document.addEventListener("DOMContentLoaded", () => replaceText(document.body));

    // Catch dynamic changes
    const observer = new MutationObserver((mutations) => {
        for (let m of mutations) {
            for (let node of m.addedNodes) {
                replaceText(node);
            }
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
