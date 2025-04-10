# VisuAlize: AI-Generated Visual Market Reports  

**VisuAlize** is a full-stack web application that provides AI-driven financial analysis and interactive market reports, allowing users to analyze stock tickers through intuitive visualizations and dynamic insights.  

## Project Overview  

VisuAlize enables users to input a company name or stock ticker and receive AI-powered financial insights, including key metrics, market trends, and dynamically generated graphs. Unlike many financial data platforms, VisuAlize offers unrestricted analysis, making high-quality financial information accessible without paywalls.  

### Key Features  

- **Company Search & Analysis**  
  - Users input a company name or stock ticker.  
  - The system retrieves and displays general company information, including sector, market cap, and key statistics.  

- **Generated Market Reports**  
  - Automatically generates a structured market report for the selected company.  
  - Uses machine learning techniques to extract and summarize key financial insights.  

- **Chat-Style Financial Queries**  
  - Interactive chat interface where users can ask specific questions about a company’s performance, financials, or trends.  
  - AI-powered responses provide in-depth analysis with data-driven explanations.  

- **Dynamic Financial Visualizations**  
  - Real-time financial graphs generated using **D3.js** and other visualization tools.  
  - Stock price trends, revenue growth, and other financial metrics displayed interactively.  
  - AI-enhanced graphs that identify key patterns and trends.  

- **No Paywalls**  
  - Unlike traditional financial analysis tools, VisuAlize provides unrestricted access to its reports and insights.  

- **User Authentication with Supabase**  
  - Secure login and authentication system powered by **Supabase**.  
  - Users can sign up, log in, and manage their personal dashboard.  

- **Personal Stock List Feature**  
  - Tracks and lists all companies the user has researched.  
  - Provides quick access to previously analyzed stocks.

## Project Structure  

### Backend (FastAPI)  
- **Built with FastAPI**, the backend handles data retrieval, analysis, and AI-driven insights.  
- Deployed on **Render**.  
- **Features:**  
  - Retrieves stock data from financial APIs.  
  - Uses AI/ML models for financial insights.  
  - Generates structured market reports.  
  - Processes chat-based queries for company analysis.  
  - Integrates with **Supabase** for managing user authentication and storing user-specific data.

### Frontend (React + TypeScript)  
- **Developed with React and TypeScript**, providing a seamless and responsive user interface.  
- Deployed on **Vercel** at: [VisuAlize](https://visualize-navy.vercel.app)  
- **Features:**  
  - User-friendly input field for stock search.  
  - Dynamic graphs rendered with **D3.js**.  
  - Chat-style interface for AI-driven company analysis.  
  - Clean and modern UI for financial insights.  
  - Includes user dashboard with login functionality and a stock history feature for revisiting past searches.

## Usage Instructions  

1. **Visit the Live Site:** [VisuAlize](https://visualize-navy.vercel.app)  
2. **Enter a Stock Ticker or Company Name** in the input bar.  
3. **Explore the AI-generated Market Report.**  
4. **Ask AI-powered financial questions** in the chat interface.  
5. **Analyze Dynamic Graphs** to visualize key metrics and trends.  

## Future Improvements  

- **Support for additional financial metrics** (e.g., EBITDA, debt ratios).  
- **Expanded AI capabilities** for deeper trend analysis.  
- **Integration of alternative data sources** (news sentiment, macroeconomic trends).  
- **Mobile-friendly interface optimizations.**  