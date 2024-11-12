import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, phone, email, suburb, address, message, date } = req.body;

        const query = `
            mutation {
                create_item(
                    board_id: 1933350367,
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

        try {
            const response = await fetch('https://api.monday.com/v2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.MONDAY_API_KEY}`,  // Access API key securely from .env
                },
                body: JSON.stringify({ query }),
            });

            // Log the raw response to see what we get back
            const rawResponse = await response.text();
            console.log('Raw response from Monday.com:', rawResponse);

            // Try parsing the response as JSON
            const result = JSON.parse(rawResponse);
            console.log('Parsed result:', result);

            if (result.data && result.data.create_item.id) {
                res.status(200).json({ success: true });
            } else {
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
