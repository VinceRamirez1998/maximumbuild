// /api/submitForm.js

const fetch = require('node-fetch');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, phone, email, suburb, address, message, date } = req.body;

        // Construct the GraphQL query to create an item in Monday.com
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
                    'Authorization': `Bearer ${process.env.MONDAY_API_KEY}`,  // Securely using env variable
                },
                body: JSON.stringify({ query }),
            });

            const result = await response.json();

            if (result.data.create_item.id) {
                res.status(200).json({ success: true });
            } else {
                res.status(500).json({ success: false });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'There was an error' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}
