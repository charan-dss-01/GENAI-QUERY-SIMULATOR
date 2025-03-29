import { getDb } from "../config/database.js";
import axios from "axios";


import dotenv from "dotenv";
dotenv.config();

const tableSchema = `
Table: employee
Columns: 
- id (INTEGER, PRIMARY KEY, AUTOINCREMENT)
- name (TEXT)
- email (TEXT, UNIQUE)
- phone (TEXT)
- position (TEXT)
- salary (INTEGER)
- hire_date (DATETIME, DEFAULT CURRENT_TIMESTAMP)
`;

export const processQuery = async (req, res) => {
    try {
      const { question } = req.body;
      const userId = req.user.userId;
  
      if (!question) return res.status(400).json({ message: "Query is required" });
  
      let sqlQuery = "";
  
      // Define the structure of the employee table for accurate SQL generation
    //   const tableSchema = `
    //     Table: employee
    //     Columns: 
    //     - id (INTEGER, PRIMARY KEY, AUTOINCREMENT)
    //     - name (TEXT)
    //     - email (TEXT, UNIQUE)
    //     - phone (TEXT)
    //     - position (TEXT)
    //     - salary (INTEGER)
    //     - hire_date (DATETIME, DEFAULT CURRENT_TIMESTAMP)
    //   `;
  
      // Simple rule-based query conversion for known queries
      if (question.trim().toLowerCase() === "select all employees") {
        sqlQuery = "SELECT * FROM employee";
      } else if (question.trim().toLowerCase() === "select employee names and salaries") {
        sqlQuery = "SELECT name, salary FROM employee";
      } else if (question.trim().toLowerCase() === "select employees with salary greater than 90000") {
        sqlQuery = "SELECT * FROM employee WHERE salary > 90000";
      } else if (question.trim().toLowerCase() === "count total employees") {
        sqlQuery = "SELECT COUNT(*) AS total_employees FROM employee";
      } else if (question.trim().toLowerCase() === "list all employee positions") {
        sqlQuery = "SELECT DISTINCT position FROM employee";
      } else {
        try {
          // Use Gemini API to generate SQL query with table schema
          const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
              contents: [
                {
                  parts: [
                    { text: `Convert this natural language query into an SQL query using the given table structure:\n${tableSchema}\nQuery: ${question}` },
                  ],
                },
              ],
            }
          );
  
          // Validate Response Before Using It
          if (
            response.data &&
            response.data.candidates &&
            response.data.candidates.length > 0 &&
            response.data.candidates[0].content &&
            response.data.candidates[0].content.parts &&
            response.data.candidates[0].content.parts.length > 0
          ) {
            let aiResponse = response.data.candidates[0].content.parts[0].text.trim();
  
            // Remove Markdown code block formatting (```sql ... ```)
            sqlQuery = aiResponse.replace(/```sql|```/g, "").trim();
          } else {
            console.error("Invalid response from Gemini:", response.data);
            return res.status(500).json({ message: "Invalid AI response" });
          }
        } catch (error) {
          console.error("Error fetching from Gemini:", error);
          return res.status(500).json({ message: "Error processing query with AI" });
        }
      }
  
      const db = getDb();
      const result = await db.all(sqlQuery);
  
      // Save the query in history
      await db.run(
        "INSERT INTO queries (userId, question, sqlQuery, result) VALUES (?, ?, ?, ?)",
        [userId, question, sqlQuery, JSON.stringify(result)]
      );
  
      res.json({ sqlQuery, result });
    } catch (error) {
      console.error("Error processing query:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const explainQuery = async (req, res) => {
    try {
      const { question } = req.body;
  
      if (!question) {
        return res.status(400).json({ message: "Query is required" });
      }
  
      let explanation = {
        query_type: "UNKNOWN",
        table: "UNKNOWN",
        columns: [],
        conditions: [],
        description: "Could not determine query structure.",
      };
  
      // Handling different types of queries
      if (question.toLowerCase().includes("select all employees")) {
        explanation = {
          query_type: "SELECT",
          table: "employee",
          columns: ["*"],
          conditions: [],
          description: "Retrieves all employee records from the database.",
        };
      } else if (question.toLowerCase().includes("salary greater than")) {
        explanation = {
          query_type: "SELECT",
          table: "employee",
          columns: ["*"],
          conditions: ["salary > 90000"],
          description: "Retrieves employees with a salary above 90,000.",
        };
      } else if (question.toLowerCase().includes("count employees")) {
        explanation = {
          query_type: "AGGREGATION",
          table: "employee",
          columns: ["COUNT(*)"],
          conditions: [],
          description: "Counts the total number of employees in the database.",
        };
      } else if (question.toLowerCase().includes("highest salary")) {
        explanation = {
          query_type: "AGGREGATION",
          table: "employee",
          columns: ["MAX(salary)"],
          conditions: [],
          description: "Finds the highest salary among employees.",
        };
      } else if (question.toLowerCase().includes("average salary")) {
        explanation = {
          query_type: "AGGREGATION",
          table: "employee",
          columns: ["AVG(salary)"],
          conditions: [],
          description: "Calculates the average salary of employees.",
        };
      }else {
        // Using AI to generate explanation
        try {
          const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
              contents: [
                {
                  parts: [
                    {
                        
                      text: `Here is the database table schema:
                      ${tableSchema} Break down this query into its components: ${question}`,
                    },
                  ],
                },
              ],
            }
          );
  
          explanation = response.data.candidates[0].content.parts[0].text.trim();
        } catch (error) {
          console.error("Error fetching from Gemini:", error);
          return res.status(500).json({ message: "Error processing query explanation with AI" });
        }
      }
  
      res.json({ explanation });
    } catch (error) {
      console.error("Error processing explanation:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  


  export const validateQuery = async (req, res) => {
    try {
      const { question } = req.body;
  
      if (!question) {
        return res.status(400).json({ message: "Query is required" });
      }
  
      let sqlQuery = null;
      let isValid = false;
      let message = "Query is not valid";
  
      // Mapping predefined queries to SQL
      if (question.trim().toLowerCase() === "select all employees") {
        sqlQuery = "SELECT * FROM employee";
        isValid = true;
      } else if (question.trim().toLowerCase().includes("salary greater than")) {
        sqlQuery = "SELECT * FROM employee WHERE salary > 90000";
        isValid = true;
      } else if (question.trim().toLowerCase().includes("count employees")) {
        sqlQuery = "SELECT COUNT(*) FROM employee";
        isValid = true;
      } else if (question.trim().toLowerCase().includes("highest salary")) {
        sqlQuery = "SELECT MAX(salary) FROM employee";
        isValid = true;
      } else {
        // If query is not predefined, use Gemini AI
        try {
          const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
              contents: [
                {
                  parts: [
                    {
                      text: `Given the following table schema:
  ${tableSchema}
  
  Validate the user's query: ${question}. Respond in JSON format with the following keys:
  - "isValid": true or false
  - "sqlQuery": The SQL equivalent if valid
  - "message": Explanation if invalid or valid.`,
                    },
                  ],
                },
              ],
            }
          );
  
          // Clean AI response before parsing
          let aiResponseText = response.data.candidates[0].content.parts[0].text.trim();
  
          // Remove markdown formatting if present
          aiResponseText = aiResponseText.replace(/^```json/, "").replace(/```$/, "").trim();
  
          // Parse JSON safely
          const aiResponse = JSON.parse(aiResponseText);
  
          isValid = aiResponse.isValid;
          message = aiResponse.message;
          sqlQuery = isValid ? aiResponse.sqlQuery || null : null;
        } catch (error) {
          console.error("Error fetching from Gemini:", error);
          return res.status(500).json({ message: "Error validating query with AI" });
        }
      }
  
      res.json({ isValid, sqlQuery, message });
    } catch (error) {
      console.error("Error validating query:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  

