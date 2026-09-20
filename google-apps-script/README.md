# Google Apps Script Setup Guide — DNRCET SIH-2026

This guide explains how to connect your Google Response Sheet to the **DNRCET SIH-2026 Team Details Portal**.

## Step 1: Open Your Google Sheet
1. Open the Google Spreadsheet containing the registration responses for DNRCET SIH-2026.
2. Verify that your sheet has the following column headers (row 1):
   - `Timestamp`
   - `TEAM ID`
   - `FULL NAME`
   - `BRANCH`
   - `YEAR`
   - `EMAIL`
   - `MOBILE NUMBER`
   - `CATEGORY OF PROJECT`
   - `ROLL NO`
   - `TEAM MEMBER 1`
   - `TEAM MEMBER 2`
   - `TEAM MEMBER 3`
   - `TEAM MEMBER 4`
   - `TEAM MEMBER 5`
   - `TEAM MEMBER 6`
   - `TEAM LEADER NAME`
   - `Email Address`
   - `TEAM NAME`

## Step 2: Add the Apps Script Code
1. Click **Extensions** in the Google Sheets top menu.
2. Select **Apps Script**.
3. Clear any default code in `Code.gs`.
4. Copy and paste the entire contents of [`Code.gs`](./Code.gs) into the editor.
5. Click the **Save** icon (disk icon) or press `Ctrl + S`.

## Step 3: Deploy as a Web App
1. Click the blue **Deploy** button at the top right, then select **New deployment**.
2. Under "Select type", click the gear icon and select **Web app**.
3. Fill in the fields:
   - **Description**: `DNRCET SIH-2026 Team API`
   - **Execute as**: `Me (<your-email>)`
   - **Who has access**: `Anyone` *(Crucial: Allows your backend server to query the endpoint)*
4. Click **Deploy**.
5. If prompted, click **Authorize access**, select your Google account, click **Advanced**, and then click **Go to DNRCET SIH 2026 (unsafe)** to grant spreadsheet read permissions.
6. Copy the **Web App URL** generated (it will look like `https://script.google.com/macros/s/AKfycb.../exec`).

## Step 4: Configure the Backend
1. In your project root, open or create `.env`:
   ```env
   GOOGLE_SHEET_API_URL=https://script.google.com/macros/s/AKfycb.../exec
   PORT=3001
   ```
2. Restart your development server:
   ```bash
   npm run dev
   ```

## Security Guarantee
- The script searches only for the specific `teamId` requested.
- If a match is found, only that row is returned.
- If not found, a `404` error is returned.
- The complete list of registered teams is **never** sent to the client browser.
