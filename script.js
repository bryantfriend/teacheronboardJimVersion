document.addEventListener('DOMContentLoaded', function() {
    const runawayButton = document.getElementById('generatePdfBtn');
    const tauntMessage = document.getElementById('taunt-message');
    let missCount = 0;

    const taunts = [
        "Too slow!",
        "Almost...",
        "Try again!",
        "Missed me!",
        "Haha!",
        "Nope!",
        "Keep trying!",
        "So close!"
    ];

    const moveButton = () => {
        // Get the boundaries of the viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Get the dimensions of the button
        const buttonWidth = runawayButton.offsetWidth;
        const buttonHeight = runawayButton.offsetHeight;

        // Calculate a new random position, ensuring it stays within the viewport
        const newTop = Math.random() * (viewportHeight - buttonHeight);
        const newLeft = Math.random() * (viewportWidth - buttonWidth);

        // Apply the new position
        runawayButton.style.position = 'absolute'; // Change position to absolute to move freely
        runawayButton.style.top = `${newTop}px`;
        runawayButton.style.left = `${newLeft}px`;

        // After a few misses, start taunting the user
        missCount++;
        if (missCount > 2) {
            showTaunt(newTop, newLeft);
        }
    };

    const showTaunt = (top, left) => {
        // Pick a random taunt
        const randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];
        tauntMessage.innerText = randomTaunt;

        // Position the taunt message near the button's new location
        tauntMessage.style.top = `${top - 30}px`;
        tauntMessage.style.left = `${left}px`;
        
        // Fade the message in and then out
        tauntMessage.style.opacity = 1;
        setTimeout(() => {
            tauntMessage.style.opacity = 0;
        }, 1000);
    };

    // --- EVENT LISTENERS ---

    // For desktop users with a mouse
    runawayButton.addEventListener('mouseover', moveButton);

    // For mobile users on touch devices
    runawayButton.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent the click from registering
        moveButton();
    });

    // Just in case a very fast user manages to click it
    runawayButton.addEventListener('click', (e) => {
        e.preventDefault(); // Stop any default action
        alert("How did you do that?! Okay, you win this time... but there's no PDF. ;) ");
    });
});
