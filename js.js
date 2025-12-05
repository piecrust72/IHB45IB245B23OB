// ==UserScript==
// @name         Zula Casino Random Games
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Add a random games button to Zula Casino nav bar
// @author       You
// @match        https://www.zulacasino.com/*
// @match        file:///*/ZulaRandom/*
// @connect      raw.githubusercontent.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const GAMES_JSON_PATH = 'https://raw.githubusercontent.com/SlotBunny/LBH5KYT4NR/refs/heads/main/games.json';
    const BUTTON_TEXT = 'Random';
    const POPUP_TITLE = 'PICK 3';
    
    // Custom SVG icon (hardcoded - dice)
    const BUTTON_ICON_SVG = `<svg width="30" height="30" viewBox="0 0 423.757 423.757" xmlns="http://www.w3.org/2000/svg" xml:space="preserve">
<g>
	<g>
		<path d="M189.294,385.219l112.522,38.538l98.514-98.509l-113.3-37.765L189.294,385.219z M239.962,379.203
			c-5.96,5.96-15.672,8.54-21.699,5.76c-6.021-2.78-6.077-9.861-0.113-15.821c5.96-5.96,15.672-8.54,21.699-5.76
			C245.875,366.162,245.921,373.243,239.962,379.203z M276.298,391.931c-5.96,5.96-15.672,8.54-21.699,5.76
			c-6.021-2.78-6.077-9.861-0.113-15.821c5.965-5.96,15.672-8.54,21.699-5.76C282.207,378.89,282.258,385.971,276.298,391.931z
			 M349.56,334.94c5.96-5.96,15.672-8.54,21.699-5.76c6.021,2.78,6.077,9.861,0.118,15.821s-15.672,8.54-21.699,5.76
			S343.601,340.9,349.56,334.94z M313.331,323.031c5.96-5.96,15.672-8.54,21.699-5.76c6.021,2.78,6.077,9.861,0.113,15.821
			c-5.96,5.96-15.672,8.54-21.699,5.76C307.423,336.072,307.372,328.991,313.331,323.031z M312.415,388.019
			c6.021,2.78,6.077,9.861,0.113,15.821c-5.96,5.96-15.672,8.54-21.699,5.76s-6.077-9.861-0.118-15.821
			C296.676,387.825,306.388,385.244,312.415,388.019z M298.693,304.538c6.021,2.78,6.077,9.861,0.113,15.821
			c-5.96,5.96-15.672,8.54-21.699,5.76c-6.021-2.78-6.077-9.861-0.113-15.821C282.954,304.338,292.667,301.763,298.693,304.538z" fill="#fff"/>
		<path d="M402.158,311.634l-37.202-111.611l-111.611-37.207l37.202,111.606L402.158,311.634z M319.281,224.118
			c4.168-4.168,12.544-2.555,18.708,3.61s7.782,14.541,3.61,18.708c-4.168,4.168-12.544,2.555-18.708-3.61
			C316.726,236.662,315.108,228.285,319.281,224.118z" fill="#fff"/>
		<path d="M135.171,0L29.939,52.613l105.231,52.613l105.226-52.613L135.171,0z M135.171,63.288c-8.714,0-15.785-4.782-15.785-10.675
			c0-5.898,7.066-10.675,15.785-10.675s15.785,4.782,15.785,10.675C150.95,58.511,143.885,63.288,135.171,63.288z" fill="#fff"/>
		<path d="M162.22,201.728c5.028-1.853,9.231,1.08,10.685,6.702l63.022-63.022l12.805,4.27V63.529l-106.819,53.412v122.481
			l10.798-10.798c-1.101-1.951-1.761-4.48-1.761-7.475C150.95,212.716,155.999,204.022,162.22,201.728z M230.956,86.866
			c6.226-2.294,11.269,2.678,11.269,11.105c0,8.427-5.043,17.121-11.269,19.415c-6.226,2.294-11.269-2.678-11.269-11.105
			C219.686,97.853,224.73,89.16,230.956,86.866z M198.843,142.003c6.226-2.294,11.269,2.678,11.269,11.105
			c0,8.427-5.043,17.121-11.269,19.415c-6.226,2.294-11.269-2.678-11.269-11.105C187.574,152.991,192.622,144.297,198.843,142.003z
			 M150.95,140.175c0-8.427,5.043-17.121,11.269-19.415c6.226-2.294,11.269,2.678,11.269,11.105c0,8.428-5.043,17.121-11.269,19.415
			C155.994,153.574,150.95,148.603,150.95,140.175z" fill="#fff"/>
		<path d="M21.599,202.839l105.313,51.579l1.51-1.51V116.941L21.599,63.529V202.839z M107.855,201.728
			c6.226,2.294,11.269,10.988,11.269,19.415s-5.043,13.399-11.269,11.105c-6.226-2.294-11.269-10.988-11.269-19.415
			C96.586,204.406,101.635,199.434,107.855,201.728z M75.011,140.298c6.226,2.294,11.269,10.987,11.269,19.415
			c0,8.427-5.043,13.399-11.269,11.105c-6.226-2.294-11.269-10.988-11.269-19.415C63.741,142.976,68.79,138.004,75.011,140.298z
			 M41.208,86.866c6.226,2.294,11.269,10.987,11.269,19.415c0,8.427-5.043,13.399-11.269,11.105
			c-6.226-2.294-11.269-10.987-11.269-19.415C29.939,89.544,34.982,84.572,41.208,86.866z" fill="#fff"/>
		<path d="M239.726,164.639l-98.514,98.504l38.543,112.533l97.736-97.746L239.726,164.639z M197.655,338.565
			c-5.96,5.96-13.046,5.909-15.821-0.118c-2.775-6.026-0.2-15.739,5.76-21.699c5.96-5.96,13.046-5.909,15.821,0.113
			C206.19,322.883,203.615,332.605,197.655,338.565z M230.525,221.773c-5.96,5.96-13.046,5.908-15.821-0.113
			c-2.78-6.021-0.2-15.739,5.76-21.699c5.96-5.96,13.046-5.908,15.821,0.113C239.066,206.1,236.485,215.813,230.525,221.773z" fill="#fff"/>
	</g>
</g>
</svg>`;

    // Load games data
    let gamesData = [];

    async function loadGames() {
        try {
            const response = await fetch(GAMES_JSON_PATH);
            if (!response.ok) throw new Error('Failed to load games.json');
            gamesData = await response.json();
            console.log('Loaded', gamesData.length, 'games from GitHub');
        } catch (error) {
            console.error('Error loading games from GitHub:', error);
            // Try local fallback
            try {
                const altResponse = await fetch('./games.json');
                if (altResponse.ok) {
                    gamesData = await altResponse.json();
                    console.log('Loaded games from local fallback');
                }
            } catch (e) {
                console.error('Failed to load games from local fallback:', e);
            }
        }
    }

    // Get random games
    function getRandomGames(count = 3) {
        if (!gamesData || gamesData.length === 0) return [];
        const shuffled = [...gamesData].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // Create the custom button
    function createRandomButton() {
        const button = document.createElement('div');
        button.className = 'category-item random-games-btn';
        button.innerHTML = `
            <div class="icon-wrapper">
                ${BUTTON_ICON_SVG}
            </div>
            <span class="category-name">${BUTTON_TEXT}</span>
        `;
        button.style.cursor = 'pointer';
        return button;
    }

    // Create popup
    function createPopup() {
        const overlay = document.createElement('div');
        overlay.className = 'random-games-overlay';
        overlay.innerHTML = `
            <div class="random-games-popup">
                <button class="random-games-close" aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div class="random-games-content">
                    <div class="random-games-grid">
                        <!-- Games will be inserted here -->
                    </div>
                </div>
                <div class="random-games-footer">
                    <button class="random-games-reroll">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Reroll</span>
                    </button>
                </div>
            </div>
        `;

        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closePopup();
            }
        });

        // Close button
        overlay.querySelector('.random-games-close').addEventListener('click', closePopup);

        // Reroll button
        overlay.querySelector('.random-games-reroll').addEventListener('click', () => {
            const randomGames = getRandomGames(3);
            if (randomGames.length > 0) {
                updateGamesInPopup(overlay, randomGames);
            }
        });

        // Escape key to close
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape' && overlay.parentNode) {
                closePopup();
                document.removeEventListener('keydown', escapeHandler);
            }
        });

        return overlay;
    }

    // Update games in popup
    function updateGamesInPopup(popup, games) {
        const grid = popup.querySelector('.random-games-grid');
        
        // Add fade out animation (no scale/shrink)
        grid.style.opacity = '0.3';
        
        setTimeout(() => {
            grid.innerHTML = '';
            
            games.forEach(game => {
                const gameItem = document.createElement('div');
                gameItem.className = 'random-game-item';
                
                const link = document.createElement('a');
                link.href = game.gameURL;
                link.target = '_blank';
                link.className = 'random-game-link';
                
                const imageWrapper = document.createElement('div');
                imageWrapper.className = 'random-game-image-wrapper';
                
                const placeholder = document.createElement('div');
                placeholder.className = 'random-game-placeholder';
                placeholder.innerHTML = `<span>${game.name}</span>`;
                
                if (game.iconURL) {
                    const img = document.createElement('img');
                    img.src = game.iconURL;
                    img.alt = game.name;
                    img.className = 'random-game-image';
                    img.onerror = function() {
                        this.style.display = 'none';
                        placeholder.style.display = 'flex';
                    };
                    placeholder.style.display = 'none';
                    imageWrapper.appendChild(img);
                } else {
                    placeholder.style.display = 'flex';
                }
                
                imageWrapper.appendChild(placeholder);
                
                const gameName = document.createElement('div');
                gameName.className = 'random-game-name';
                gameName.textContent = game.name;
                
                link.appendChild(imageWrapper);
                link.appendChild(gameName);
                gameItem.appendChild(link);
                grid.appendChild(gameItem);
            });
            
            // Fade in animation (no scale)
            grid.style.opacity = '1';
        }, 150);
    }

    // Show popup with random games
    function showPopup() {
        if (gamesData.length === 0) {
            alert('Games data not loaded yet. Please wait a moment and try again.');
            return;
        }

        const randomGames = getRandomGames(3);
        if (randomGames.length === 0) {
            alert('No games available.');
            return;
        }

        let popup = document.querySelector('.random-games-overlay');
        if (!popup) {
            popup = createPopup();
            document.body.appendChild(popup);
        }

        updateGamesInPopup(popup, randomGames);

        // Show popup with animation
        setTimeout(() => {
            popup.classList.add('active');
        }, 10);
    }

    // Close popup
    function closePopup() {
        const popup = document.querySelector('.random-games-overlay');
        if (popup) {
            popup.classList.remove('active');
            setTimeout(() => {
                if (popup.parentNode) {
                    popup.remove();
                }
            }, 300);
        }
    }

    // Find and insert button after Lobby
    function insertButton() {
        // Try multiple selectors to find the categories wrapper
        const selectors = [
            '.categories-wrapper',
            '.main-category-content .categories-wrapper',
            '[class*="categories-wrapper"]'
        ];

        let categoriesWrapper = null;
        for (const selector of selectors) {
            categoriesWrapper = document.querySelector(selector);
            if (categoriesWrapper) break;
        }

        if (!categoriesWrapper) {
            console.log('Categories wrapper not found, retrying...');
            return false;
        }

        // Find Lobby button
        const categoryItems = categoriesWrapper.querySelectorAll('.category-item');
        let lobbyButton = null;

        for (const item of categoryItems) {
            const nameSpan = item.querySelector('.category-name');
            if (nameSpan && nameSpan.textContent.trim().toLowerCase() === 'lobby') {
                lobbyButton = item;
                break;
            }
        }

        if (!lobbyButton) {
            console.log('Lobby button not found');
            return false;
        }

        // Check if button already exists
        if (document.querySelector('.random-games-btn')) {
            return true;
        }

        // Create and insert button
        const randomButton = createRandomButton();
        randomButton.addEventListener('click', showPopup);
        lobbyButton.insertAdjacentElement('afterend', randomButton);

        console.log('Random games button inserted successfully');
        return true;
    }

    // Inject CSS styles
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Random Games Popup Styles - Google Flat Design */
            .random-games-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            }

            .random-games-overlay.active {
                opacity: 1;
                visibility: visible;
            }

            .random-games-popup {
                position: relative;
                background: #ffffff;
                border-radius: 8px;
                padding: 0;
                max-width: 1000px;
                width: 92%;
                max-height: 92vh;
                overflow: hidden;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.08);
                transform: scale(0.96) translateY(20px);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .random-games-overlay.active .random-games-popup {
                transform: scale(1) translateY(0);
            }

            .random-games-close {
                position: absolute;
                top: 16px;
                right: 16px;
                background: #dc3545;
                border: none;
                color: #fff;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 10;
                box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
            }

            .random-games-close:hover {
                background: #c82333;
                transform: scale(1.1);
                box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
            }

            .random-games-close:active {
                transform: scale(0.95);
            }

            .random-games-close svg {
                width: 20px;
                height: 20px;
            }

            .random-games-content {
                padding: 3rem 2.5rem 2rem;
                overflow-y: auto;
                max-height: calc(92vh - 120px);
            }

            .random-games-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 2rem;
                transition: opacity 0.3s ease, transform 0.3s ease;
            }

            .random-game-item {
                transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .random-game-item:hover {
                transform: translateY(-4px);
            }

            .random-game-link {
                text-decoration: none;
                color: inherit;
                display: block;
            }

            .random-game-image-wrapper {
                position: relative;
                width: 100%;
                aspect-ratio: 163 / 219;
                border-radius: 8px;
                overflow: hidden;
                background: transparent;
                margin-bottom: 0.75rem;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .random-game-item:hover .random-game-image-wrapper {
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
            }

            .random-game-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .random-game-item:hover .random-game-image {
                transform: scale(1.02);
            }

            .random-game-placeholder {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f5f5f5;
                color: #757575;
                font-family: 'Roboto', Inter, sans-serif;
                font-weight: 500;
                text-align: center;
                padding: 1rem;
                font-size: 0.875rem;
                border-radius: 8px;
            }

            .random-game-name {
                color: #424242;
                font-family: Inter, sans-serif;
                font-size: 1.1rem;
                font-weight: 600;
                text-align: center;
                margin-top: 0.75rem;
                transition: all 0.3s ease;
                letter-spacing: 0.5px;
            }

            .random-game-item:hover .random-game-name {
                color: #4285f4;
                transform: translateY(-2px);
            }

            .random-games-footer {
                padding: 1.5rem 2.5rem 2rem;
                display: flex;
                justify-content: center;
                border-top: 1px solid #e0e0e0;
                background: #fafafa;
            }

            .random-games-reroll {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                background: #4285f4;
                border: none;
                color: #fff;
                font-family: 'Roboto', Inter, sans-serif;
                font-size: 0.875rem;
                font-weight: 500;
                padding: 0.75rem 1.5rem;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 2px 4px rgba(66, 133, 244, 0.2);
                text-transform: none;
                letter-spacing: 0.5px;
            }

            .random-games-reroll:hover {
                background: #3367d6;
                box-shadow: 0 4px 8px rgba(66, 133, 244, 0.3);
            }

            .random-games-reroll:active {
                box-shadow: 0 1px 2px rgba(66, 133, 244, 0.2);
            }

            .random-games-reroll svg {
                width: 18px;
                height: 18px;
                transition: transform 0.3s ease;
            }

            .random-games-reroll:hover svg {
                transform: rotate(180deg);
            }

            /* Scrollbar styling */
            .random-games-popup::-webkit-scrollbar {
                width: 8px;
            }

            .random-games-popup::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
            }

            .random-games-popup::-webkit-scrollbar-thumb {
                background: #ff980c;
                border-radius: 10px;
            }

            .random-games-popup::-webkit-scrollbar-thumb:hover {
                background: #ffb23f;
            }

            /* Responsive */
            @media (max-width: 768px) {
                .random-games-popup {
                    width: 96%;
                    border-radius: 8px;
                }

                .random-games-close {
                    top: 12px;
                    right: 12px;
                    width: 36px;
                    height: 36px;
                }

                .random-games-content {
                    padding: 2rem 1.5rem 1.5rem;
                }

                .random-games-grid {
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }

                .random-games-footer {
                    padding: 1.25rem 1.5rem 1.5rem;
                }

                .random-games-reroll {
                    width: 100%;
                    justify-content: center;
                    padding: 0.75rem 1.5rem;
                    font-size: 0.875rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize
    async function init() {
        // Inject styles
        injectStyles();

        // Load games data
        await loadGames();

        // Try to insert button
        let inserted = insertButton();
        if (!inserted) {
            // Retry with MutationObserver
            const observer = new MutationObserver(() => {
                if (insertButton()) {
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            // Also try after a delay
            setTimeout(() => {
                if (!document.querySelector('.random-games-btn')) {
                    insertButton();
                }
            }, 2000);
        }
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

