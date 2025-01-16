const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6InlXc25MaE1xcTRwZEVCekcyVzY0IiwidmVyc2lvbiI6MSwiaWF0IjoxNzMwMzk4MjAyMzgyfQ.XZBrh6VaNNYzTiBYmpSq5f80kSJ6l9UsQzsz8AgUI_Y';
const LOCATION_ID = 'yWsnLhMqq4pdEBzG2W64';

async function getInsurancePlans() {
  try {
    const response = await fetch(`https://api.ghl.com/locations/${LOCATION_ID}/insurance-plans`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    const data = await response.json();
    return data.plans;
  } catch (error) {
    console.error('Error fetching insurance plans:', error);
    return [];
  }
}

// Add more functions to interact with the GHL API as needed

// Export the functions to be used in other parts of the website
export { getInsurancePlans };