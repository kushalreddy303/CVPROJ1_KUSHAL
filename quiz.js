// Quiz answers
const correctAnswers = {
    q1: 'C',
    q2: 'A',
    q3: 'True',
    q4: 'B',
    q5: 'B'
};

// Question explanations
const explanations = {
    q1: {
        correct: "Correct! Compliance is a major issue with wearable sensors. Elderly people may forget to wear them, find them uncomfortable, or feel stigmatized by them.",
        incorrect: "Incorrect. The main drawback is that elderly people may forget to wear them or find them uncomfortable, reducing compliance."
    },
    q2: {
        correct: "Correct! OpenPose is a popular framework specifically designed for detecting human skeleton landmarks and pose estimation.",
        incorrect: "Incorrect. OpenPose is the framework commonly used for detecting human skeleton landmarks in activity recognition."
    },
    q3: {
        correct: "Correct! Depth cameras capture distance information rather than color/facial details, making them more privacy-preserving than RGB cameras.",
        incorrect: "Incorrect. Depth cameras do preserve more privacy because they don't capture identifiable facial features like RGB cameras do."
    },
    q4: {
        correct: "Correct! RNNs and LSTMs are designed to capture temporal (time-based) patterns, making them ideal for sequential activity recognition.",
        incorrect: "Incorrect. RNNs/LSTMs are best suited for capturing temporal patterns because they process sequential data over time."
    },
    q5: {
        correct: "Correct! One of the biggest challenges is distinguishing actual falls from similar movements like lying down on a bed or sitting down quickly.",
        incorrect: "Incorrect. A major challenge is distinguishing between actual falls and similar activities like lying down or sitting quickly."
    }
};

// Handle form submission
document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let score = 0;
    let totalQuestions = 5;
    let allAnswered = true;
    
    // Check each question
    for (let i = 1; i <= totalQuestions; i++) {
        const questionName = 'q' + i;
        const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
        const feedbackDiv = document.getElementById(`feedback-${questionName}`);
        
        if (!selectedAnswer) {
            allAnswered = false;
            feedbackDiv.innerHTML = '<div class="feedback-warning"><i class="bi bi-exclamation-triangle-fill me-2"></i>Please select an answer.</div>';
            continue;
        }
        
        const userAnswer = selectedAnswer.value;
        const isCorrect = userAnswer === correctAnswers[questionName];
        
        if (isCorrect) {
            score++;
            feedbackDiv.innerHTML = `<div class="feedback-correct"><i class="bi bi-check-circle-fill me-2"></i>${explanations[questionName].correct}</div>`;
        } else {
            feedbackDiv.innerHTML = `<div class="feedback-incorrect"><i class="bi bi-x-circle-fill me-2"></i>${explanations[questionName].incorrect}</div>`;
        }
    }
    
    if (!allAnswered) {
        // Scroll to first unanswered question
        const firstWarning = document.querySelector('.feedback-warning');
        if (firstWarning) {
            firstWarning.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // Display results
    displayResults(score, totalQuestions);
});

function displayResults(score, total) {
    const resultsDiv = document.getElementById('quizResults');
    const scoreText = document.getElementById('scoreText');
    const scoreMessage = document.getElementById('scoreMessage');
    
    // Calculate percentage
    const percentage = (score / total) * 100;
    
    // Set score text
    scoreText.textContent = `You got ${score} out of ${total} correct!`;
    
    // Set message based on score
    let message = '';
    if (percentage === 100) {
        message = '🎉 Perfect score! You have an excellent understanding of computer vision for elderly care!';
    } else if (percentage >= 80) {
        message = '👏 Great job! You have a strong grasp of the key concepts.';
    } else if (percentage >= 60) {
        message = '👍 Good effort! Review the tutorial sections for topics you missed.';
    } else {
        message = '📚 Keep learning! Review the tutorial and try again.';
    }
    
    scoreMessage.textContent = message;
    
    // Show results and scroll to them
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Disable form inputs
    const formInputs = document.querySelectorAll('#quizForm input');
    formInputs.forEach(input => input.disabled = true);
    
    // Disable submit button
    const submitBtn = document.querySelector('#quizForm button[type="submit"]');
    submitBtn.disabled = true;
}

function retakeQuiz() {
    // Reset form
    document.getElementById('quizForm').reset();
    
    // Clear all feedback
    for (let i = 1; i <= 5; i++) {
        const feedbackDiv = document.getElementById(`feedback-q${i}`);
        feedbackDiv.innerHTML = '';
    }
    
    // Hide results
    document.getElementById('quizResults').style.display = 'none';
    
    // Re-enable form inputs
    const formInputs = document.querySelectorAll('#quizForm input');
    formInputs.forEach(input => input.disabled = false);
    
    // Re-enable submit button
    const submitBtn = document.querySelector('#quizForm button[type="submit"]');
    submitBtn.disabled = false;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

