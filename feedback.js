// This script handles the feedback form submission

// Add an event listener to the form to handle the submission
document.getElementById('feedbackForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Collect the form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        feedback: document.getElementById('feedback').value
    };

    try {
        // Send the form data to the server
        const response = await fetch('/submit-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Thank you for your feedback!'); // Show a success message
        } else {
            alert('Failed to submit feedback.'); // Show an error message
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting your feedback.'); // Show an error message
    }
});