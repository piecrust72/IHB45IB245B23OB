// ==UserScript==
// @name         Repp
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  red
// @match        https://www.spinblitz.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function replaceText(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.data = node.data.replace(/400\.01/g, "900.00");
        } else {
            for (let child of node.childNodes) {
                replaceText(child);
            }
        }
    }

    // Run once on load
    replaceText(document.body);

    // Also observe for dynamic changes (if site uses AJAX)
    const observer = new MutationObserver((mutations) => {
        for (let m of mutations) {
            for (let node of m.addedNodes) {
                replaceText(node);
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
