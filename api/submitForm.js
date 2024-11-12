// Import fetch as an ES Module
import fetch from 'node-fetch';  // Using ESM syntax

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, phone, email, suburb, address, message, date } = req.body;

        console.log('Form data received:', { name, phone, email, suburb, address, message, date });

        // Build the GraphQL mutation query
        const query = `
            mutation {
                create_item(
                    board_id: 1933350367,  // Replace with your actual Monday.com board ID
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

        console.log('GraphQL query:', query);

        try {
            const response = await fetch('https://api.monday.com/v2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.MONDAY_API_KEY}`,  // Use env variable for security
                },
                body: JSON.stringify({ query }),
            });

            const result = await response.json();
            console.log('Monday.com API response:', result);

            if (result.data && result.data.create_item.id) {
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
