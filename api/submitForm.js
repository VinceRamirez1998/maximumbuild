const form = document.getElementById('quote-form');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        suburb: document.getElementById('suburb').value,
        address: document.getElementById('address').value,
        message: document.getElementById('message').value,
        date: new Date().toISOString().split('T')[0],  // Current date in YYYY-MM-DD format
    };

    // Prepare GraphQL mutation query
    const query = `
        mutation {
            create_item(
                board_id: 1933350367,
                item_name: "${formData.name}",
                column_values: "{
                    \\"text\\": \\"${formData.name}\\",
                    \\"text2\\": \\"${formData.email}\\",
                    \\"dup__of_email_address\\": \\"${formData.phone}\\",
                    \\"long_text\\": \\"${formData.address}\\",
                    \\"dup__of_address\\": \\"${formData.suburb}\\",
                    \\"date4\\": \\"${formData.date}\\",
                    \\"long_text6\\": \\"${formData.message}\\"
                }"
            ) {
                id
            }
        }`;

    // Send request to your Vercel API endpoint (this assumes your backend is running at /api/submitForm)
    try {
        const response = await fetch('/api/submitForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        // Handle the response from the backend API
        const result = await response.json();

        if (result.success) {
            alert('Your submission has been successfully sent!');
            form.reset();  // Optionally reset the form after successful submission
        } else {
            alert('There was an error. Please try again later.');
        }
    } catch (error) {
        alert('There was an error sending your data. Please try again later.');
        console.error(error);
    }
});
