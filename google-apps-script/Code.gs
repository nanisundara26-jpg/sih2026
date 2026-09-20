/**
 * DNRCET SIH-2026 — Google Apps Script for Team Details Lookup
 * 
 * INSTRUCTIONS TO DEPLOY:
 * 1. Open your Google Response Sheet (linked to Google Forms / SIH Registration).
 * 2. Click "Extensions" > "Apps Script".
 * 3. Replace all existing code in the editor with this script.
 * 4. Click "Deploy" > "New deployment".
 * 5. Select type: "Web app".
 * 6. Set Description: "DNRCET SIH 2026 Team API".
 * 7. Execute as: "Me" (your Google account).
 * 8. Who has access: "Anyone" (allows the backend server to query the endpoint).
 * 9. Click "Deploy", authorize permissions, and copy the "Web App URL".
 * 10. Paste this URL into your backend .env file as:
 *     GOOGLE_SHEET_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
 */

function doGet(e) {
  try {
    var rawTeamId = (e && e.parameter && (e.parameter.teamId || e.parameter.team_id || e.parameter.id)) || "";
    var requestedTeamId = rawTeamId.toString().trim().toUpperCase();

    if (!requestedTeamId) {
      return createJsonResponse({
        success: false,
        error: "Missing Team ID",
        message: "Please provide a valid teamId parameter in the request query."
      }, 400);
    }

    // Open active spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      return createJsonResponse({
        success: false,
        error: "Spreadsheet Not Found",
        message: "Unable to access the active Google Sheet."
      }, 500);
    }

    var sheet = ss.getSheets()[0]; // Default to first sheet (Responses)
    var data = sheet.getDataRange().getValues();

    if (!data || data.length < 2) {
      return createJsonResponse({
        success: false,
        error: "No Data",
        message: "The registration sheet currently contains no records."
      }, 404);
    }

    var headers = data[0].map(function(h) {
      return (h || "").toString().trim();
    });

    // Find the TEAM ID column index (flexible matching for header variations)
    var teamIdColIndex = -1;
    for (var col = 0; col < headers.length; col++) {
      var normalizedHeader = headers[col].toUpperCase().replace(/[^A-Z0-9]/g, "");
      if (normalizedHeader === "TEAMID") {
        teamIdColIndex = col;
        break;
      }
    }

    if (teamIdColIndex === -1) {
      return createJsonResponse({
        success: false,
        error: "Column Not Found",
        message: "Could not locate a 'TEAM ID' column in the Google Sheet headers."
      }, 500);
    }

    // Search for matching row (case-insensitive, trimmed)
    var matchedRow = null;
    for (var r = 1; r < data.length; r++) {
      var rowValue = (data[r][teamIdColIndex] || "").toString().trim().toUpperCase();
      if (rowValue === requestedTeamId) {
        matchedRow = data[r];
        break;
      }
    }

    if (!matchedRow) {
      return createJsonResponse({
        success: false,
        error: "Team ID Not Found",
        message: "We couldn't find a registered team with this ID. Please verify the Team ID and try again."
      }, 404);
    }

    // Build single team record safely
    var teamRecord = {};
    for (var c = 0; c < headers.length; c++) {
      var key = headers[c];
      var val = matchedRow[c];

      // Format date objects
      if (val instanceof Date) {
        val = Utilities.formatDate(val, Session.getScriptTimeZone() || "GMT+05:30", "dd/MM/yyyy HH:mm:ss");
      } else if (val === null || val === undefined) {
        val = "";
      } else {
        val = val.toString().trim();
      }

      if (key) {
        teamRecord[key] = val;
      }
    }

    // Return ONLY the matched team record
    return createJsonResponse({
      success: true,
      team: teamRecord
    }, 200);

  } catch (err) {
    return createJsonResponse({
      success: false,
      error: "Internal Server Error",
      message: err.toString()
    }, 500);
  }
}

/**
 * Helper to build JSON responses with proper ContentService MIME type
 */
function createJsonResponse(obj, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
