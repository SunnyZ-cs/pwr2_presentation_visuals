let currentState = 1;
const totalStates = 26;
const audio = document.getElementById('satie-audio');

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (currentState < totalStates) {
            currentState++;
            updateState(currentState);
        }
    } else if (e.code === 'ArrowLeft' && currentState > 1) {
        // Allow going back for convenience
        currentState--;
        updateState(currentState);
    }
});

function hideAllQuotes() {
    const quotes = document.querySelectorAll('.quote');
    quotes.forEach(q => {
        q.classList.remove('text-visible');
        q.classList.add('text-hidden');
    });
}

function hideAllImages() {
    const images = ['full-time-image', 'memo-section', 'dumb-figure', 'job-portion', 'satie-portrait', 'torn-fragments'];
    images.forEach(id => {
        document.getElementById(id).style.opacity = '0';
    });
}

function clearStaggeredWords() {
    document.querySelectorAll('.stag-word, .float-word, .fluent-word').forEach(w => {
        w.style.opacity = '0';
    });
}

function updateState(state) {
    document.getElementById('state-indicator').innerText = `State ${state} / ${totalStates}`;
    console.log("Entering state:", state);
    
    // Default resets
    const fullImage = document.getElementById('full-time-image');
    const darkOverlay = document.getElementById('dark-overlay');
    
    switch(state) {
        case 1:
            // State 1: Full-screen image of Full Time.
            hideAllImages();
            hideAllQuotes();
            fullImage.style.opacity = '1';
            fullImage.style.transform = 'scale(1) translate(0, 0)';
            fullImage.style.transition = 'opacity 2s, transform 2s';
            darkOverlay.style.opacity = '0';
            break;
            
        case 2:
            // State 2: Slow zoom upward toward hidden numbers bar
            fullImage.style.transition = 'transform 8s cubic-bezier(0.25, 0.1, 0.25, 1)';
            fullImage.style.transformOrigin = 'top center';
            fullImage.style.transform = 'scale(2.5) translateY(10%)';
            break;
            
        case 3:
            // State 3: Slow pan toward memo section
            hideAllImages();
            const memoSection = document.getElementById('memo-section');
            memoSection.style.opacity = '1';
            memoSection.style.transform = 'scale(1.2)';
            memoSection.style.transition = 'transform 10s ease-out, opacity 2s';
            setTimeout(() => {
                memoSection.style.transform = 'scale(1) translate(5%, 0)';
            }, 100);
            break;
            
        case 4:
            // State 4: Image darkens slightly.
            document.getElementById('memo-section').style.opacity = '0.4';
            darkOverlay.style.opacity = '0.5';
            darkOverlay.style.backgroundColor = '#000';
            break;
            
        case 5:
            // State 5: Fade to black background with white Ernaux quote 1
            hideAllImages();
            darkOverlay.style.opacity = '1';
            setTimeout(() => {
                hideAllQuotes();
                const e1 = document.getElementById('ernaux-1');
                e1.classList.remove('text-hidden');
                e1.classList.add('text-visible');
            }, 1000);
            break;
            
        case 6:
            // State 6: switch to another Ernaux quote 2
            hideAllQuotes();
            setTimeout(() => {
                const e2 = document.getElementById('ernaux-2');
                e2.classList.remove('text-hidden');
                e2.classList.add('text-visible');
            }, 1000);
            break;
            
        case 7:
            // State 7: Fade to Audre Lorde quote
            hideAllQuotes();
            setTimeout(() => {
                const lorde = document.getElementById('lorde-quote');
                lorde.classList.remove('text-hidden');
                lorde.classList.add('text-visible');
            }, 1000);
            break;
            
        case 8:
            // State 8: slowly zoom into the word "still"
            const wordStill = document.getElementById('word-still');
            wordStill.classList.add('active');
            break;
            
        case 9:
            // State 9: fade back into Full Time, centered on yellow human figure "dumb"
            hideAllQuotes();
            darkOverlay.style.opacity = '0';
            const dumbFig = document.getElementById('dumb-figure');
            dumbFig.style.opacity = '1';
            dumbFig.style.transform = 'scale(1)';
            break;
            
        case 10:
            // State 10: Simple staggered appearance of words beside painting.
            const stagWordsContainer = document.getElementById('staggered-words');
            stagWordsContainer.classList.remove('text-hidden');
            stagWordsContainer.classList.add('text-visible');
            const stagWords = document.querySelectorAll('.stag-word');
            stagWords.forEach((word, index) => {
                setTimeout(() => {
                    word.style.opacity = '1';
                }, index * 1000);
            });
            break;
            
        case 11:
            // State 11: Very slow zoom into the word "dumb."
            const dumbFigZoom = document.getElementById('dumb-figure');
            dumbFigZoom.style.transition = 'transform 12s cubic-bezier(0.25, 0.1, 0.25, 1)';
            dumbFigZoom.style.transform = 'scale(3) translate(10%, 10%)'; // Approximation of zoom towards the word
            break;
            
        case 12:
            // State 12: Fade to Blackburn quote on dark background
            hideAllImages();
            clearStaggeredWords();
            hideAllQuotes();
            darkOverlay.style.opacity = '1';
            setTimeout(() => {
                const blackburn = document.getElementById('blackburn-quote');
                blackburn.classList.remove('text-hidden');
                blackburn.classList.add('text-visible');
            }, 1000);
            break;
            
        case 13:
            // State 13: Fade back to lower portion of Full Time containing "LIFE IS A FuLL Time JOB."
            hideAllQuotes();
            darkOverlay.style.opacity = '0';
            const jobPortion = document.getElementById('job-portion');
            jobPortion.style.opacity = '1';
            break;
            
        case 14:
            // State 14: Fade to black.
            hideAllImages();
            darkOverlay.style.opacity = '1';
            break;
            
        case 15:
            // State 15: Floating words appear one-by-one slowly on black background
            const floatWordsContainer = document.getElementById('floating-words');
            floatWordsContainer.classList.remove('text-hidden');
            floatWordsContainer.classList.add('text-visible');
            const floatWords = document.querySelectorAll('.float-word');
            floatWords.forEach((word, index) => {
                setTimeout(() => {
                    word.style.opacity = '1';
                }, index * 1500);
            });
            break;
            
        case 16:
            // State 16: Fade into Beckett quote
            clearStaggeredWords();
            hideAllQuotes();
            setTimeout(() => {
                const beckett = document.getElementById('beckett-quote');
                beckett.classList.remove('text-hidden');
                beckett.classList.add('text-visible');
            }, 1000);
            break;
            
        case 17:
            // State 17: Fade to portrait of Erik Satie.
            hideAllQuotes();
            darkOverlay.style.opacity = '0';
            const satiePortrait = document.getElementById('satie-portrait');
            satiePortrait.style.opacity = '1';
            break;
            
        case 18:
            // State 18: Begin Gnossienne No.1 softly in background.
            audio.volume = 0;
            audio.play().catch(e => console.log("Audio play failed (maybe no interaction yet):", e));
            // Fade in audio
            let vol = 0;
            const fadeIn = setInterval(() => {
                if (vol < 0.6) {
                    vol += 0.05;
                    audio.volume = vol;
                } else {
                    clearInterval(fadeIn);
                }
            }, 200);
            break;
            
        case 19:
            // State 19: Very slow fade between Satie portrait and fragments of Full Time. Gnossienne No.1 stops.
            const portrait = document.getElementById('satie-portrait');
            portrait.style.transition = 'opacity 8s ease-in-out';
            portrait.style.opacity = '0';
            
            const fragments = document.getElementById('torn-fragments');
            fragments.style.transition = 'opacity 8s ease-in-out, transform 12s linear';
            fragments.style.opacity = '1';
            fragments.style.transform = 'scale(1) rotate(0deg)';
            
            // Fade out audio
            let v = audio.volume;
            const fadeOut = setInterval(() => {
                if (v > 0.05) {
                    v -= 0.05;
                    audio.volume = v;
                } else {
                    clearInterval(fadeOut);
                    audio.pause();
                }
            }, 200);
            break;
            
        case 20:
            // State 20: Words appear slowly one-by-one. (fluent productivity...)
            hideAllImages();
            darkOverlay.style.opacity = '1';
            const fluentContainer = document.getElementById('fluent-words');
            fluentContainer.classList.remove('text-hidden');
            fluentContainer.classList.add('text-visible');
            const fluentWords = document.querySelectorAll('.fluent-word');
            fluentWords.forEach((word, index) => {
                setTimeout(() => {
                    word.style.opacity = '1';
                }, index * 1200);
            });
            break;
            
        case 21:
            // State 21: back to the "tore up" painting fragments shown before.
            clearStaggeredWords();
            hideAllQuotes();
            darkOverlay.style.opacity = '0';
            document.getElementById('torn-fragments').style.opacity = '1';
            break;
            
        case 22:
            // State 22: Return to full image of Full Time.
            hideAllImages();
            fullImage.style.opacity = '1';
            fullImage.style.transformOrigin = 'center center';
            fullImage.style.transform = 'scale(1) translate(0, 0)';
            break;
            
        case 23:
            // State 23: Image slowly darkens.
            darkOverlay.style.opacity = '0.6';
            darkOverlay.style.transition = 'opacity 6s ease-in-out';
            break;
            
        case 24:
            // State 24: Final slow zoom into textured surface until details become almost abstract.
            fullImage.style.transition = 'transform 20s cubic-bezier(0.25, 0.1, 0.25, 1)';
            fullImage.style.transformOrigin = 'bottom left';
            fullImage.style.transform = 'scale(5) translate(20%, -10%)';
            break;
            
        case 25:
            // State 25: Gnossienne No.1 continues.
            audio.volume = 0;
            audio.play().catch(e => console.log(e));
            let finalVol = 0;
            const finalFadeIn = setInterval(() => {
                if (finalVol < 0.5) {
                    finalVol += 0.05;
                    audio.volume = finalVol;
                } else {
                    clearInterval(finalFadeIn);
                }
            }, 200);
            break;
            
        case 26:
            // State 26: screen fades to black and music gradually fades away.
            darkOverlay.style.opacity = '1';
            darkOverlay.style.transition = 'opacity 8s ease-in-out';
            
            let fadeOutVol = audio.volume;
            const finalFadeOut = setInterval(() => {
                if (fadeOutVol > 0.02) {
                    fadeOutVol -= 0.02;
                    audio.volume = fadeOutVol;
                } else {
                    clearInterval(finalFadeOut);
                    audio.pause();
                }
            }, 400); // 8 seconds roughly
            break;
    }
}

// Initialize state 1 on load
window.onload = () => {
    updateState(currentState);
};
