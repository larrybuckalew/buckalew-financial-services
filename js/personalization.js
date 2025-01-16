// Personalization Module
class PersonalizationManager {
    constructor() {
        this.userPreferences = this.loadUserPreferences();
        this.initializePersonalization();
        this.setupEventListeners();
    }

    loadUserPreferences() {
        // Load saved preferences from localStorage
        const savedPrefs = localStorage.getItem('userPreferences');
        return savedPrefs ? JSON.parse(savedPrefs) : {
            theme: 'light',
            fontSize: 'medium',
            interests: [],
            savedArticles: [],
            goals: []
        };
    }

    initializePersonalization() {
        this.setupDashboard();
        this.applyUserPreferences();
        this.setupGoalsTracker();
        this.initializeRecommendations();
    }

    setupDashboard() {
        const dashboard = document.getElementById('personal-dashboard');
        if (!dashboard) return;

        dashboard.innerHTML = `
            <div class="dashboard-container">
                <div class="dashboard-header">
                    <h2>Your Financial Dashboard</h2>
                    <div class="dashboard-actions">
                        <button class="btn btn-secondary" id="customize-dashboard">
                            Customize Dashboard
                        </button>
                    </div>
                </div>
                
                <div class="dashboard-grid">
                    <div class="dashboard-widget" id="goals-widget">
                        <h3>Financial Goals</h3>
                        <div class="goals-list"></div>
                        <button class="btn btn-primary" id="add-goal">Add Goal</button>
                    </div>

                    <div class="dashboard-widget" id="progress-widget">
                        <h3>Progress Tracker</h3>
                        <div class="progress-charts"></div>
                    </div>

                    <div class="dashboard-widget" id="recommendations-widget">
                        <h3>Personalized Recommendations</h3>
                        <div class="recommendations-list"></div>
                    </div>

                    <div class="dashboard-widget" id="saved-content-widget">
                        <h3>Saved Content</h3>
                        <div class="saved-articles-list"></div>
                    </div>
                </div>
            </div>
        `;
    }

    applyUserPreferences() {
        // Apply theme
        document.body.setAttribute('data-theme', this.userPreferences.theme);
        
        // Apply font size
        document.documentElement.style.setProperty('--base-font-size', 
            this.getFontSize(this.userPreferences.fontSize));

        // Update UI components based on interests
        this.updateContentRecommendations();
    }

    getFontSize(size) {
        const sizes = {
            small: '14px',
            medium: '16px',
            large: '18px',
            'extra-large': '20px'
        };
        return sizes[size] || sizes.medium;
    }

    setupGoalsTracker() {
        const goalsList = document.querySelector('.goals-list');
        if (!goalsList) return;

        // Render existing goals
        this.userPreferences.goals.forEach(goal => {
            this.renderGoal(goal, goalsList);
        });

        // Setup add goal functionality
        const addGoalBtn = document.getElementById('add-goal');
        if (addGoalBtn) {
            addGoalBtn.addEventListener('click', () => this.showAddGoalModal());
        }
    }

    renderGoal(goal, container) {
        const goalElement = document.createElement('div');
        goalElement.className = 'goal-item';
        goalElement.innerHTML = `
            <div class="goal-info">
                <h4>${goal.title}</h4>
                <p>${goal.description}</p>
                <div class="goal-progress">
                    <div class="progress-bar">
                        <div class="progress" style="width: ${goal.progress}%"></div>
                    </div>
                    <span>${goal.progress}% Complete</span>
                </div>
            </div>
            <div class="goal-actions">
                <button class="btn btn-small" onclick="updateGoal('${goal.id}')">
                    Update Progress
                </button>
                <button class="btn btn-small btn-danger" onclick="deleteGoal('${goal.id}')">
                    Delete
                </button>
            </div>
        `;
        container.appendChild(goalElement);
    }

    showAddGoalModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Add New Financial Goal</h3>
                <form id="add-goal-form">
                    <div class="form-group">
                        <label for="goal-title">Goal Title</label>
                        <input type="text" id="goal-title" required>
                    </div>
                    <div class="form-group">
                        <label for="goal-description">Description</label>
                        <textarea id="goal-description" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="goal-target">Target Amount</label>
                        <input type="number" id="goal-target" required>
                    </div>
                    <div class="form-group">
                        <label for="goal-deadline">Target Date</label>
                        <input type="date" id="goal-deadline" required>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeModal()">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-primary">
                            Add Goal
                        </button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        // Setup form submission
        const form = document.getElementById('add-goal-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNewGoal(form);
            this.closeModal();
        });
    }

    addNewGoal(form) {
        const newGoal = {
            id: Date.now().toString(),
            title: form.querySelector('#goal-title').value,
            description: form.querySelector('#goal-description').value,
            target: parseFloat(form.querySelector('#goal-target').value),
            deadline: form.querySelector('#goal-deadline').value,
            progress: 0,
            createdAt: new Date().toISOString()
        };

        this.userPreferences.goals.push(newGoal);
        this.saveUserPreferences();
        this.renderGoal(newGoal, document.querySelector('.goals-list'));
    }

    updateGoal(goalId) {
        const goal = this.userPreferences.goals.find(g => g.id === goalId);
        if (!goal) return;

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Update Goal Progress</h3>
                <form id="update-goal-form">
                    <div class="form-group">
                        <label for="current-progress">Current Progress (%)</label>
                        <input type="number" id="current-progress" 
                               value="${goal.progress}" min="0" max="100" required>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeModal()">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-primary">
                            Update Progress
                        </button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        // Setup form submission
        const form = document.getElementById('update-goal-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateGoalProgress(goalId, form);
            this.closeModal();
        });
    }

    updateGoalProgress(goalId, form) {
        const progress = parseInt(form.querySelector('#current-progress').value);
        const goalIndex = this.userPreferences.goals.findIndex(g => g.id === goalId);
        
        if (goalIndex !== -1) {
            this.userPreferences.goals[goalIndex].progress = progress;
            this.saveUserPreferences();
            this.refreshGoalsDisplay();
        }
    }

    deleteGoal(goalId) {
        if (confirm('Are you sure you want to delete this goal?')) {
            this.userPreferences.goals = this.userPreferences.goals.filter(
                g => g.id !== goalId
            );
            this.saveUserPreferences();
            this.refreshGoalsDisplay();
        }
    }

    refreshGoalsDisplay() {
        const goalsList = document.querySelector('.goals-list');
        if (goalsList) {
            goalsList.innerHTML = '';
            this.userPreferences.goals.forEach(goal => {
                this.renderGoal(goal, goalsList);
            });
        }
    }

    initializeRecommendations() {
        const recommendationsContainer = document.querySelector('.recommendations-list');
        if (!recommendationsContainer) return;

        // Generate personalized recommendations based on user preferences and goals
        const recommendations = this.generateRecommendations();
        this.renderRecommendations(recommendations, recommendationsContainer);
    }

    generateRecommendations() {
        const recommendations = [];
        
        // Add recommendations based on goals
        this.userPreferences.goals.forEach(goal => {
            if (goal.progress < 50) {
                recommendations.push({
                    type: 'goal-based',
                    title: `Boost Your ${goal.title}`,
                    description: `Here are some strategies to help you achieve your ${goal.title} faster.`,
                    priority: 'high'
                });
            }
        });

        // Add recommendations based on interests
        this.userPreferences.interests.forEach(interest => {
            recommendations.push({
                type: 'interest-based',
                title: `New Content: ${interest}`,
                description: `Check out our latest resources about ${interest}.`,
                priority: 'medium'
            });
        });

        return recommendations;
    }

    renderRecommendations(recommendations, container) {
        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-card ${rec.priority}-priority">
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
                <button class="btn btn-small">Learn More</button>
            </div>
        `).join('');
    }

    saveUserPreferences() {
        localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.userPreferences.theme = 
                    this.userPreferences.theme === 'light' ? 'dark' : 'light';
                this.saveUserPreferences();
                this.applyUserPreferences();
            });
        }

        // Font size controls
        const fontControls = document.querySelectorAll('.font-size-control');
        fontControls.forEach(control => {
            control.addEventListener('click', (e) => {
                this.userPreferences.fontSize = e.target.dataset.size;
                this.saveUserPreferences();
                this.applyUserPreferences();
            });
        });
    }

    closeModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    }
}

// Initialize Personalization
document.addEventListener('DOMContentLoaded', () => {
    window.personalization = new PersonalizationManager();
});
