// // In /api/submitForm.js (Vercel API route)

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { query } = req.body;

//     // Check if the query is missing
//     if (!query) {
//       return res
//         .status(400)
//         .json({ success: false, error: "Query parameter is missing." });
//     }

//     const mondayApiUrl = "https://api.monday.com/v2";
//     const apiKey = process.env.MONDAY_API_KEY; // Ensure the API key is set in environment variables

//     if (!apiKey) {
//       return res
//         .status(500)
//         .json({ success: false, error: "Monday.com API Key is not set." });
//     }

//     try {
//       // Send the GraphQL query to Monday.com
//       const response = await fetch(mondayApiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${apiKey}`,
//         },
//         body: JSON.stringify({ query }),
//       });

//       // Handle the response from Monday.com
//       const result = await response.json();

//       // Check if the result has the expected data
//       if (result.data) {
//         return res.status(200).json({ success: true });
//       } else {
//         return res.status(500).json({
//           success: false,
//           error: "Failed to create item in Monday.com.",
//         });
//       }
//     } catch (error) {
//       console.error("Error during API call to Monday.com:", error);
//       return res.status(500).json({
//         success: false,
//         error: "There was an error during the form submission.",
//       });
//     }
//   } else {
//     // Handle unsupported methods
//     res.status(405).json({ success: false, error: "Method Not Allowed" });
//   }
// }
