// /api/submitForm.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, phone, email, suburb, address, message, date } = req.body;

        // Log form data for debugging
        console.log('Form data received:', { name, phone, email, suburb, address, message, date });

        // Build the GraphQL mutation query
        const query = `
            mutation {
                create_item(
                    board_id: 1933350367,  // Replace with your Monday.com board ID
                    item_name: "${name}",
                    column_values: "{
                        \\"text\\": \\"${name}\\",
                        \\"text2\\": \\"${email}\\",
                        \\"dup__of_email_address\\": \\"${phone}\\",
                        \\"long_text\\": \\"${address}\\",
                        \\"dup__of_address\\": \\"${suburb}\\",
                        \\"date4\\": \\"${date}\\",
                        \\"long_text6\\": \\"${message}\\"
                    }"
                ) {
                    id
                }
            }`;

        // Send the GraphQL request to Monday.com
        try {
            const response = await fetch('https://api.monday.com/v2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.MONDAY_API_KEY}`,  // Securely using env variable
                },
                body: JSON.stringify({ query }),
            });

            const result = await response.json();

            // Check if the item was created successfully
            if (result.data && result.data.create_item.id) {
                console.log('Item created in Monday.com:', result);
                res.status(200).json({ success: true });
            } else {
                console.error('Failed to create item in Monday.com:', result);
                res.status(500).json({ success: false, error: 'Failed to create item in Monday.com.' });
            }
        } catch (error) {
            console.error('Error during API call to Monday.com:', error);
            res.status(500).json({ success: false, error: 'There was an error during the form submission.' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}
