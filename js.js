// ==UserScript==
// @name         Orion Welfare Check Game (24hr)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Runs once every 24 hours. Includes your entire chaotic sequence.
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const COOLDOWN_HOURS = 24;
    const STORAGE_KEY = "orion_welfare_last_run";

    // ========= CHECK LAST RUN =========
    function shouldRun() {
        const last = localStorage.getItem(STORAGE_KEY);
        if (!last) return true;

        const lastTime = parseInt(last, 10);
        const now = Date.now();
        const hoursPassed = (now - lastTime) / (1000 * 60 * 60);

        return hoursPassed >= COOLDOWN_HOURS;
    }

    function updateLastRun() {
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }

    // ========= UTILITIES =========

    function alertBtn(message, btnText = "OK") {
        return new Promise(resolve => {
            const iframe = document.createElement("iframe");
            document.body.appendChild(iframe);
            const realAlert = iframe.contentWindow.alert;
            iframe.contentWindow.alert = msg => {
                realAlert(msg);
                iframe.remove();
                resolve();
            };
            iframe.contentWindow.alert(message);
        });
    }

    async function confirmBtn(message, yesLabel = "Yes", noLabel = "No") {
        return new Promise(resolve => {
            const iframe = document.createElement("iframe");
            document.body.appendChild(iframe);

            const realConfirm = iframe.contentWindow.confirm;
            iframe.contentWindow.confirm = msg => {
                let result = realConfirm(
                    msg.replace("OK", yesLabel).replace("Cancel", noLabel)
                );
                iframe.remove();
                resolve(result);
            };

            iframe.contentWindow.confirm(message);
        });
    }

    function askInput(promptMsg) {
        return new Promise(resolve => {
            const answer = window.prompt(promptMsg, "");
            resolve(answer);
        });
    }

    // ========= TRIVIA =========
    const trivia = [
        ["True or False: A shadow weighs nothing but still technically has mass because photons behave like momentum carriers.", false],
        ["True or False: If you freeze water in a vacuum, it boils and freezes at the same time.", true],
        ["True or False: The number zero is older than the number one historically.", true],
        ["True or False: Bananas are radioactive enough to technically trigger a Geiger counter.", true],
        ["True or False: If Earth stopped spinning instantly, only people on the equator would survive.", false],
        ["True or False: Octopuses have three hearts but only two beat when they swim.", true],
        ["True or False: Sound travels faster in cold air than warm air.", false],
        ["True or False: Time moves faster on your feet than your head due to relativity.", true],
        ["True or False: Penguins have knees but cannot bend them.", false],
        ["True or False: The moon is moving closer to Earth every year.", false],
        ["True or False: Humans forget 30% of new information within two seconds.", false],
        ["True or False: A day on Venus is longer than a Venus year.", true],
        ["True or False: Heat flows from cold to hot if the pressure is high enough.", true],
        ["True or False: Lightning is hotter than the surface of the sun but colder than the core.", true],
        ["True or False: You can drown in 1 inch of water if your face is submerged.", true]
    ];

    async function runTrivia() {
        let score = 0;

        for (let i = 0; i < trivia.length; i++) {
            const [question, correct] = trivia[i];
            const user = window.confirm(question);
            if (user === correct) score++;
        }

        return score;
    }

    // ========= CORE FLOW =========
    async function startSequence() {
        // Stamp it so it does NOT run again for 24 hrs
        updateLastRun();

        while (true) {
            await alertBtn(`Hey Jen, it's Orion. Just doing a welfare check you seem to have been up more than 36 hours. You ok? Need me to call medical assistance?`);

            await confirmBtn("No? (Only option is no)", "No", "No");

            await alertBtn(`Well, whats wrong then? The fucks matter wich you dawg? Lets get some shoes, where should we go?`);

            // Input validation loop
            while (true) {
                let response = await askInput("Type at least 10 words and end with a period:");

                if (!response) continue;

                let words = response.trim().split(/\s+/).length;
                let period = response.trim().endsWith(".");

                if (words >= 10 && period) break;

                await alertBtn("ERROR: must have 8 words min AND end with a period.");
            }

            await alertBtn("Fuck thats rough man... I got something that might make it better? Want to try?");
            let res = await confirmBtn("Choose wisely", "No", "No");

            if (!res) {
                await confirmBtn("Bitch im being nice, did you mean to hit yes or?", "Yes", "Yes");
            }

            await alertBtn("cool I thought so.. for a second there I thought you were being a cunt or sum shit, ok hit next and I will cheer that cookie poo thunder buns");
            await confirmBtn("Next?", "quit", "quit");

            await confirmBtn('Nope. You gotta work for that button. "ok" only.', "ok", "ok");

            let score = await runTrivia();

            if (score < 7) {
                await alertBtn(`You got ${score}/15. Not enough. Resetting...`);
                continue;
            }

            await alertBtn("Ok kid, lets start over.. you cool or nah?");

            // Loop forever for that session (but won't run again for 24 hours)
        }
    }

    // ========= START SCRIPT IF ALLOWED =========

    if (shouldRun()) {
        setTimeout(startSequence, 2000);
    }

})();
