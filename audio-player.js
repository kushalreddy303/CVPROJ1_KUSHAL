// Audio Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayerBtn = document.getElementById('audioPlayerBtn');
    const pageAudio = document.getElementById('pageAudio');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');

    if (!audioPlayerBtn || !pageAudio) {
        console.log('Audio player elements not found on this page');
        return; // Exit if elements don't exist on this page
    }

    console.log('Audio player initialized');
    console.log('Audio source:', pageAudio.querySelector('source')?.src);

    // Play/Pause toggle
    audioPlayerBtn.addEventListener('click', function() {
        console.log('Audio button clicked, paused state:', pageAudio.paused);

        if (pageAudio.paused) {
            // Attempt to play
            const playPromise = pageAudio.play();

            if (playPromise !== undefined) {
                playPromise.then(function() {
                    // Audio started playing successfully
                    console.log('Audio playing successfully');
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'inline';
                    audioPlayerBtn.classList.add('playing');
                }).catch(function(error) {
                    // Auto-play was prevented or error occurred
                    console.error('Error playing audio:', error);
                    alert('Unable to play audio. Please check if the audio file exists and is accessible.');
                });
            }
        } else {
            // Pause the audio
            pageAudio.pause();
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
            audioPlayerBtn.classList.remove('playing');
            console.log('Audio paused');
        }
    });

    // Reset button when audio ends
    pageAudio.addEventListener('ended', function() {
        console.log('Audio ended');
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        audioPlayerBtn.classList.remove('playing');
    });

    // Handle audio loading
    pageAudio.addEventListener('loadeddata', function() {
        console.log('Audio loaded successfully');
    });

    // Handle audio errors
    pageAudio.addEventListener('error', function(e) {
        console.error('Error loading audio file:', e);
        console.error('Audio error code:', pageAudio.error?.code);
        console.error('Audio error message:', pageAudio.error?.message);

        audioPlayerBtn.disabled = true;
        audioPlayerBtn.style.opacity = '0.5';
        audioPlayerBtn.style.cursor = 'not-allowed';
        audioPlayerBtn.title = 'Audio file not available';

        // Show error message
        const btnText = audioPlayerBtn.querySelector('span');
        if (btnText) {
            btnText.textContent = 'Audio N/A';
        }
    });

    // Preload the audio
    pageAudio.load();
});

