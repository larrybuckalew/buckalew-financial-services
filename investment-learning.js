document.addEventListener('DOMContentLoaded', function() {
    // Investment Simulator
    const runSimulationBtn = document.getElementById('run-simulation');
    const simulationChart = document.getElementById('investment-simulation-chart').getContext('2d');
    const simulationSummary = document.getElementById('simulation-summary');

    // Investment Simulation Function
    function runInvestmentSimulation() {
        const initialInvestment = parseFloat(document.getElementById('initial-investment').value);
        const investmentDuration = parseInt(document.getElementById('investment-duration').value);
        const strategy = document.getElementById('investment-strategy').value;

        // Simulated returns based on investment strategy
        const strategyReturns = {
            conservative: { mean: 0.04, volatility: 0.05 },
            balanced: { mean: 0.07, volatility: 0.10 },
            aggressive: { mean: 0.10, volatility: 0.15 }
        };

        const { mean, volatility } = strategyReturns[strategy];

        // Monte Carlo simulation
        const simulations = 1000;
        const yearlyReturns = [];

        for (let year = 0; year < investmentDuration; year++) {
            const annualReturn = mean + (Math.random() * volatility * 2 - volatility);
            yearlyReturns.push(annualReturn);
        }

        // Calculate final investment values
        const finalValues = yearlyReturns.reduce((acc, returnRate) => {
            const lastValue = acc[acc.length - 1];
            acc.push(lastValue * (1 + returnRate));
            return acc;
        }, [initialInvestment]);

        // Update chart
        updateInvestmentChart(yearlyReturns, finalValues);

        // Update summary
        updateSimulationSummary(initialInvestment, finalValues[finalValues.length - 1], yearlyReturns);
    }

    // Update Investment Chart
    function updateInvestmentChart(returns, values) {
        new Chart(simulationChart, {
            type: 'line',
            data: {
                labels: Array.from({length: returns.length}, (_, i) => `Year ${i + 1}`),
                datasets: [
                    {
                        label: 'Investment Value',
                        data: values,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: 'Annual Return',
                        data: returns.map(r => r * 100),
                        borderColor: 'rgb(255, 99, 132)',
                        yAxisID: 'y-returns'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Investment Value'
                        }
                    },
                    'y-returns': {
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Annual Return (%)'
                        }
                    }
                }
            }
        });
    }

    // Update Simulation Summary
    function updateSimulationSummary(initialInvestment, finalValue, returns) {
        const totalReturn = ((finalValue - initialInvestment) / initialInvestment) * 100;
        const averageAnnualReturn = returns.reduce((a, b) => a + b, 0) / returns.length * 100;

        simulationSummary.innerHTML = `
            <h3>Simulation Summary</h3>
            <p>Initial Investment: $${initialInvestment.toLocaleString()}</p>
            <p>Final Investment Value: $${finalValue.toLocaleString()}</p>
            <p>Total Return: ${totalReturn.toFixed(2)}%</p>
            <p>Average Annual Return: ${averageAnnualReturn.toFixed(2)}%</p>
        `;
    }

    // Quiz Module
    const quizQuestions = [
        {
            question: "What does diversification mean in investing?",
            options: [
                "Investing in only one type of asset",
                "Spreading investments across different asset types",
                "Keeping all money in cash",
                "Investing only in stocks"
            ],
            correctAnswer: 1
        },
        {
            question: "What is the primary goal of a conservative investment strategy?",
            options: [
                "Maximize returns at any cost",
                "Preserve capital with minimal risk",
                "Take high-risk investments",
                "Ignore market trends"
            ],
            correctAnswer: 1
        }
    ];

    function generateQuiz() {
        const quizContainer = document.getElementById('quiz-questions');
        quizContainer.innerHTML = '';

        quizQuestions.forEach((q, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('quiz-question');
            questionElement.innerHTML = `
                <p>${index + 1}. ${q.question}</p>
                ${q.options.map((option, optIndex) => `
                    <label>
                        <input type="radio" name="question-${index}" value="${optIndex}">
                        ${option}
                    </label>
                `).join('')}
            `;
            quizContainer.appendChild(questionElement);
        });
    }

    function gradeQuiz() {
        const quizResults = document.getElementById('quiz-results');
        let score = 0;

        quizQuestions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
            if (selectedOption && parseInt(selectedOption.value) === q.correctAnswer) {
                score++;
            }
        });

        const percentage = (score / quizQuestions.length) * 100;

        quizResults.innerHTML = `
            <h3>Quiz Results</h3>
            <p>Score: ${score}/${quizQuestions.length}</p>
            <p>Percentage: ${percentage.toFixed(2)}%</p>
            <p>Interpretation: ${getQuizInterpretation(percentage)}</p>
        `;
    }

    function getQuizInterpretation(percentage) {
        if (percentage >= 80) return "Excellent! You have a strong understanding of investment concepts.";
        if (percentage >= 60) return "Good job! You have a solid foundation in investing.";
        return "There's room for improvement. Consider reviewing the learning modules.";
    }

    // Event Listeners
    if (runSimulationBtn) {
        runSimulationBtn.addEventListener('click', runInvestmentSimulation);
    }

    const submitQuizBtn = document.getElementById('submit-quiz');
    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', gradeQuiz);
    }

    // Initialize Quiz
    generateQuiz();
});