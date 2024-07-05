const data = [
    { id: 1, question: 'Who wrote the novel "1984"?', answers: ['George Orwell', 'J.K. Rowling', 'F. Scott Fitzgerald', 'Ernest Hemingway'], correct: 0, score: 10 },
    { id: 2, question: 'What is the capital city of Australia?', answers: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], correct: 2, score: 20 },
    { id: 3, question: 'What is the chemical symbol for Gold?', answers: ['Gd', 'Go', 'Ag', 'Au'], correct: 3, score: 30 },
    { id: 4, question: 'In what year was the first iPhone released?', answers: ['2005', '2007', '2008', '2010'], correct: 1, score: 40 },
    { id: 5, question: 'What is the tallest mountain in the world?', answers: ['K2', 'Mount Everest', 'Mount Kilimanjaro', 'Denali'], correct: 1, score: 50 },
    { id: 6, question: 'Who painted the "Mona Lisa"?', answers: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Caravaggio'], correct: 0, score: 10 },
    { id: 7, question: 'Which planet is known as the "Red Planet"?', answers: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correct: 1, score: 20 },
    { id: 8, question: 'Who discovered electricity?', answers: ['Isaac Newton', 'Nikola Tesla', 'Michael Faraday', 'Benjamin Franklin'], correct: 3, score: 30 },
    { id: 9, question: "What is the world's largest ocean?", answers: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Southern Ocean'], correct: 2, score: 40 },
    { id: 10, question: 'Who came up with the theory of relativity?', answers: ['Edgar Allan Poe', 'Albert Einstein', 'Galileo Galilei', 'Louis Pasteur'], correct: 1, score: 50 }
]

const container = document.querySelector('#question-container')
const button = document.querySelector('#next-button')
const timerDiv = document.querySelector('#timer')
const messageDiv = document.querySelector('#message')

let currentQuestionIndex = 0
let score = 0
let timer
let timeLeft = 30

const loadQuestion = () => {
    if (currentQuestionIndex < data.length) {
        const questionData = data[currentQuestionIndex]
        let answersHTML = ''
        questionData.answers.forEach((answer, index) => {
            answersHTML += `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="answer" id="answer-${index}" value="${index}">
                    <label class="form-check-label" for="answer-${index}">
                        ${answer}
                    </label>
                </div>`
        })

        container.innerHTML = `
            <div class="card mt-3">
                <div class="card-header">
                    <div class="card-title">${questionData.question}</div>
                </div>
                <div class="card-body">
                    ${answersHTML}
                </div>
            </div>`

        document.querySelectorAll('input[name="answer"]').forEach(input => {
            input.addEventListener('change', () => {
                button.disabled = false
            })
        })

        resetTimer()
        startTimer()
    } else {
        container.innerHTML = `<h2 class="text-center">Quiz Finished! Your score: ${score}</h2>`
        button.style.display = 'none'
        timerDiv.style.display = 'none'
    }
}

const resetTimer = () => {
    clearInterval(timer)
    timeLeft = 30
    timerDiv.classList.remove('red')
    updateTimerDisplay()
}

const startTimer = () => {
    timer = setInterval(() => {
        timeLeft--
        if (timeLeft < 10) {
            timerDiv.classList.add('red')
        }
        updateTimerDisplay()
        if (timeLeft === 0) {
            clearInterval(timer)
            messageDiv.textContent = 'Time is up'
            button.disabled = false
            button.click()
        }
    }, 1000)
}

const updateTimerDisplay = () => {
    timerDiv.textContent = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}`
}

button.addEventListener('click', () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked')
    const questionData = data[currentQuestionIndex]
    if (selectedAnswer) {
        const answerIndex = parseInt(selectedAnswer.value)
        if (answerIndex === questionData.correct) {
            score += questionData.score
            selectedAnswer.nextElementSibling.classList.add('text-success', 'fw-bold')
        } else {
            selectedAnswer.nextElementSibling.classList.add('text-danger', 'fw-bold')
            document.querySelector(`#answer-${questionData.correct}`).nextElementSibling.classList.add('text-success', 'fw-bold')
        }
        button.disabled = false
        setTimeout(() => {
            button.disabled = true
            currentQuestionIndex++
            messageDiv.textContent = ''
            button.textContent = 'Next'
            loadQuestion()
        }, 2000)
    } else {
        messageDiv.textContent = 'You did not answer the question!'
        button.disabled = false
        setTimeout(() => {
            messageDiv.textContent = ''
            currentQuestionIndex++
            button.textContent = 'Next'
            loadQuestion()
        }, 2000)
    }
})

loadQuestion()
