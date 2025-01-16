document.addEventListener('DOMContentLoaded', function() {
    // Previous code remains the same...

    // Redeem Reward
    function redeemReward(rewardId) {
        const reward = loyaltyProgram.rewardsCatalog.find(r => r.id === rewardId);
        
        if (!reward) return;

        if (loyaltyProgram.points.current >= reward.pointCost) {
            // Deduct points
            loyaltyProgram.points.current -= reward.pointCost;
            
            // Add to redemption history
            loyaltyProgram.redemptionHistory.push({
                date: new Date().toISOString().split('T')[0],
                reward: reward.name,
                pointsUsed: reward.pointCost
            });

            // Update UI
            loyaltyPointsElement.textContent = loyaltyProgram.points.current.toLocaleString();
            renderRedemptionHistory();

            alert(`Successfully redeemed: ${reward.name}`);
        } else {
            alert('Insufficient points to redeem this reward.');
        }
    }

    // Start Challenge
    function startChallenge(challengeTitle) {
        const challenge = [...loyaltyProgram.bonusChallenges, ...loyaltyProgram.educationChallenges]
            .find(c => c.title === challengeTitle);
        
        if (challenge) {
            // Add points for completed challenge
            loyaltyProgram.points.current += challenge.points;
            loyaltyPointsElement.textContent = loyaltyProgram.points.current.toLocaleString();

            // Add to points history
            loyaltyProgram.points.history.push({
                date: new Date().toISOString().split('T')[0],
                points: challenge.points,
                source: challenge.title
            });

            // Update chart
            createPointsHistoryChart();

            alert(`Challenge completed! You earned ${challenge.points} points.`);
        }
    }

    // Donate Points to Charity
    function donatePointsToCharity(charityName) {
        const charity = loyaltyProgram.charityOptions.find(c => c.name === charityName);
        
        if (!charity) return;

        if (loyaltyProgram.points.current >= charity.pointCost) {
            // Deduct points
            loyaltyProgram.points.current -= charity.pointCost;
            loyaltyPointsElement.textContent = loyaltyProgram.points.current.toLocaleString();

            alert(`Thank you for donating ${charity.pointCost} points to ${charity.name}`);
        } else {
            alert('Insufficient points to make this donation.');
        }
    }

    // Event Delegation for Dynamic Elements
    document.addEventListener('click', function(event) {
        // Redeem Reward
        if (event.target.classList.contains('redeem-reward')) {
            const rewardId = parseInt(event.target.dataset.id);
            redeemReward(rewardId);
        }

        // Start Challenge
        if (event.target.classList.contains('start-challenge')) {
            const challengeTitle = event.target.closest('.challenge-card, .education-challenge')
                .querySelector('h4').textContent;
            startChallenge(challengeTitle);
        }

        // Donate Points
        if (event.target.classList.contains('donate-points')) {
            const charityName = event.target.closest('.charity-option')
                .querySelector('h4').textContent;
            donatePointsToCharity(charityName);
        }
    });

    // Referral Code Generation
    generateReferralCodeBtn.addEventListener('click', generateReferralCode);

    // Initialize Loyalty Program on Page Load
    initializeLoyaltyProgram();
});
