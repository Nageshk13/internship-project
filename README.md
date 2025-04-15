internship-project - Charities Efficiency Management System

A web-based solution for charities to efficiently manage donations, donors, volunteers, and financial reporting — all in one place.

 🧾 Project Overview
This system is designed to help charitable organizations move beyond paper-based or Excel workflows. It enables seamless tracking, organization, and reporting of donations and volunteer efforts, while enhancing transparency and donor trust.

 🎯 Goals
- 🕒 Save administrative time
- 📂 Keep records organized and secure
- 🤝 Build transparency and trust with donors
- 📊 Provide detailed reports for tax, planning, and audits

 🚀 Features
 1. Donation & Donor Management
- Donor profiles with full donation history
- Track donations by amount, date, and payment method
- Auto-generate receipts
- Maintain communication logs (emails, calls, messages)
- Search and sort donors easily

 2. Volunteer Management
- Volunteer profiles with skills and preferences
- Assign and manage tasks (event help, content creation, etc.)
- Volunteers can log working hours
- Send announcements and updates

 3. Financial Reporting
- Monitor income (monthly/yearly donation summaries)
- Track and categorize expenses
- Auto-generate reports in PDF/Excel formats
- Dashboard with charts for income/expenses analysis
- Helps with tax filing (e.g., TDS) and donor reporting

 🛠️ System Architecture
- Frontend: Web-based UI (to be integrated with user-friendly dashboards)
- Backend: Secure backend managing donor, volunteer, and financial data
- Database: Stores all user profiles, donations, reports, and task assignments
- Report Engine: Generates downloadable reports and visual charts

 📈 Data Flow & Diagrams
- Data Flow Diagram (DFD)
  Purpose: Shows the flow of data between users, processes, and the system’s data stores.
  
  Entities:
  1.Donor
  2.Volunteer
  3.Admin
  
  Processes:
  1.Accept Donation
  2.Register Donor / Volunteer
  3.Assign Volunteer Task
  4.Generate Financial Report
  
  Data Stores:
  1.Donor Database
  2.Volunteer Database
  3.Financial Records
  
  Data Flows:
  1.Donor provides details → Donation Process → Donor DB
  2.Admin views donor/volunteer records → Reports
  3.Volunteer logs hours → Volunteer DB

- Sequence Diagram
- System Architecture Diagram  
  Purpose: Describes the step-by-step interaction between users and the system during key operations.

  Example: Donation Flow
   Donor → Website: Submit Donation Form
   Website → Server: Validate & Record Donation
   Server → Database: Save Donation Data
   Server → Email Service: Send Receipt
   Email Service → Donor: Send Confirmation Email

  Example: Volunteer Task Assignment
   Admin → Website: Assign Task
   Website → Server: Store Task Info
   Server → Volunteer DB: Update Volunteer Record
   Website → Volunteer: Display Task on Dashboard

 ✅ Test Cases
| Test ID | Scenario Description | Expected Outcome |
|--------|----------------------|------------------|
| TP01 | Register New Donor | Profile stored successfully |
| TP02 | Make a Donation | Donation recorded, receipt sent |
| TP03 | View Donor History | Donation history displayed |
| TP04 | Volunteer Registration/Login | Profile created |
| TP05 | Assign Task to Volunteer | Task shown in dashboard |
| TP06 | Volunteer Logs Hours | Hours updated correctly |
| TP07 | Generate Financial Report | PDF downloaded |
| TP08 | Generate Empty Report | "No data found" shown |
| TP09 | Unauthorized Access | "Access Denied" shown |
| TP10 | Email Send Failure | Retry or flag for manual sending |

 📌 Expected Outcomes
- Smooth and secure donation workflow
- Effective volunteer task and time tracking
- Accurate, accessible financial reports
- Transparency for donors, auditors, and stakeholders

Figma Design - https://www.figma.com/proto/e3ElBQYFuE0Rr7iCk0CUWX/Untitled?page-id=6%3A495&node-id=6-640&p=f&viewport=577%2C572%2C0.2&t=aDaDZ57N1jc9Lags-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=6%3A640&show-proto-sidebar=1
