// ==UserScript==
// @name         Google Text Reader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description onr.com
// @author       ChatGPT
// @match        https://crowncoinscasino.com/*
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    // Precompiled replacements (order matters)
    const replacements = [
        [/\b400\b/g, '1,820'],
        [/canceled/gi, 'In return'],
        [/\b02\/22\/2025\b/g, '']
    ];

    const forbiddenTags = new Set([
        'SCRIPT',
        'STYLE',
        'TEXTAREA',
        'INPUT',
        'NOSCRIPT'
    ]);

    function replaceTextNode(node) {
        const original = node.nodeValue;
        let updated = original;

        for (const [find, repl] of replacements) {
            updated = updated.replace(find, repl);
        }

        if (updated !== original) {
            node.nodeValue = updated;
        }
    }

    function scan(root) {
        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    return forbiddenTags.has(node.parentNode?.tagName)
                        ? NodeFilter.FILTER_REJECT
                        : NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        let node;
        while ((node = walker.nextNode())) {
            replaceTextNode(node);
        }
    }

    // Initial scan
    const start = () => scan(document.body);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
        start();
    }

    // Mutation observer (lightweight)
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    replaceTextNode(node);
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    scan(node);
                }
            }
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

})();
