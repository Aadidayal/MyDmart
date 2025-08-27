// Quick test to make a user admin
// Replace 'your-email@example.com' with your actual email

const testMakeAdmin = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/admin/make-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'your-email@example.com' // Replace with your actual email
      })
    });

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Call the function
testMakeAdmin();
