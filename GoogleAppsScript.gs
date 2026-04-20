function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    
    // 1. Create a New Google Sheet named after the Company
    var companyName = payload.company_name || payload["Company Name"] || "Leadspark Submission";
    var ss = SpreadsheetApp.create("Leadspark - " + companyName);
    
    // 2. Main Worksheet
    var mainSheet = ss.getSheets()[0];
    mainSheet.setName("form_data");
    
    // Check if payload contains the structured headers/row arrays from nextjs
    if (payload.headers && payload.row) {
        mainSheet.appendRow(payload.headers);
        mainSheet.appendRow(payload.row);
        mainSheet.getRange(1, 1, 1, payload.headers.length).setFontWeight("bold");
    } else {
        // Fallback for flat dictionary payloads
        var keys = Object.keys(payload);
        var values = Object.values(payload);
        mainSheet.appendRow(keys);
        mainSheet.appendRow(values);
        mainSheet.getRange(1, 1, 1, keys.length).setFontWeight("bold");
    }
    
    // 3. Create Additional Worksheets
    var rawHeaders = ["ID", "First Name", "Last Name", "Title", "Organization", "Has Email", "Has Direct Phone", "Has City", "Has Country", "Timestamp (IST)"];
    var enrichHeaders = ["Apollo ID", "Full Name", "Job Title", "Company", "Company Website", "Email Address", "Phone Number", "Profile URL", "Company Website.1", "Industry Genre", "Org ID", "Company Research", "Website Scrapping", "Personalisation Line", "Target Here", "Not to Target Here", "Email Outreach 1", "QA Score 1"];
    
    for (var i = 1; i <= 5; i++) {
        var rawSheet = ss.insertSheet("Raw Prospects ICP " + i);
        rawSheet.appendRow(rawHeaders);
        rawSheet.getRange(1, 1, 1, rawHeaders.length).setFontWeight("bold");
        
        var enrichSheet = ss.insertSheet("Enriched Prospects ICP " + i);
        enrichSheet.appendRow(enrichHeaders);
        enrichSheet.getRange(1, 1, 1, enrichHeaders.length).setFontWeight("bold");
    }
    
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success", 
      url: ss.getUrl(),
      id: ss.getId() 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: err.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
