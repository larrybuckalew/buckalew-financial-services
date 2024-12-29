document.addEventListener('DOMContentLoaded', function() {
    // Simulated User Data (would typically come from backend)
    const userData = {
        name: 'Alex Johnson',
        financialHealth: 'Good',
        netWorth: 125000,
        monthlySavings: 2500,
        portfolioValue: 85000,
        goals: [
            {
                name: 'Emergency Fund',
                current: 6500,
                target: 10000,
                progress: 65
            },
            {
                name: 'Retirement Savings',
                current: 50000,
                target: 125000,
                progress: 40
            }
        ]
    };

    // Update User Profile
    function updateUserProfile() {
        document.getElementById('user-name').textContent = `Welcome, ${userData.name}`;
        document.getElementById('user-status').textContent = `Financial Health: ${userData.financialHealth}`;
    }

    // Update Financial Overview
    function updateFinancialOverview() {
        document.getElementById('net-worth').textContent = `$${userData.netWorth.toLocaleString()}`;
        document.getElementById('monthly-savings').textContent = `$${userData.monthlySavings.toLocaleString()}`;
        document.getElementById('portfolio-value').textContent = `$${userData.portfolioValue.toLocaleString()}`;
    }

    // Render Financial Goals
    function renderFinancialGoals() {
        const goalsContainer = document.getElementById('goals-container');
        const addGoalButton = document.getElementById('add-new-goal');

        // Clear existing goals (except add goal button)
        while (goalsContainer.firstChild && goalsContainer.firstChild !== addGoalButton.parentElement) {
            goalsContainer.removeChild(goalsContainer.firstChild);
        }

        // Render existing goals
        userData.goals.forEach(goal => {
            const goalCard = document.createElement('div');
            goalCard.className = 'goal-card';
            goalCard.innerHTML = `
                <h3>${goal.name}</h3>
                <div class="progress-bar">
                    <div class="progress" style="width: ${goal.progress}%;"></div>
                </div>
                <p>$${goal.current.toLocaleString()} / $${goal.target.toLocaleString()}</p>
                <button class="btn">Update Goal</button>
            `;

            // Insert before add goal button
            goalsContainer.insertBefore(goalCard, addGoalButton.parentElement);
        });

        // Add Goal Functionality
        addGoalButton.addEventListener('click', function() {
            const newGoalModal = createGoalModal();
            document.body.appendChild(newGoalModal);
        });
    }

    // Create New Goal Modal
    function createGoalModal() {
        const modal = document.createElement('div');
        modal.className = 'modal goal-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Create New Financial Goal</h2>
                <form id="new-goal-form">
                    <div class="form-group">
                        <label>Goal Name</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Target Amount</label>
                        <input type="number" required>
                    </div>
                    <div class="form-group">
                        <label>Target Date</label>
                        <input type="date" required>
                    </div>
                    <button type="submit" class="btn">Create Goal</button>
                </form>
            </div>
        `;

        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // Form submission
        const form = modal.querySelector('#new-goal-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // TODO: Implement goal creation logic
            alert('Goal creation functionality to be implemented');
            document.body.removeChild(modal);
        });

        return modal;
    }

    // Personalized Insights
    function updatePersonalizedInsights() {
        const insightsContainer = document.querySelector('.insights-container');
        
        // Dynamic insights based on user data
        const insights = [
            {
                title: 'Investment Recommendation',
                description: 'Consider diversifying your portfolio with emerging market ETFs',
                link: '#'
            },
            {
                title: 'Savings Opportunity',
                description: 'You could save $200/month by refinancing your current loans',
                link: '#'
            }
        ];

        // Render insights
        insights.forEach(insight => {
            const insightCard = document.createElement('div');
            insightCard.className = 'insight-card';
            insightCard.innerHTML = `
                <h3>${insight.title}</h3>
                <p>${insight.description}</p>
                <a href="${insight.link}" class="btn">Learn More</a>
            `;
            insightsContainer.appendChild(insightCard);
        });
    }

    // Initialize Dashboard
    function initDashboard() {
        updateUserProfile();
        updateFinancialOverview();
        renderFinancialGoals();
        updatePersonalizedInsights();
    }

    initDashboard();
});