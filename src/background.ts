
// Listen for messages from content script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "getProspects") {
      // Get prospects from storage
      chrome.storage.local.get(['prospects'], function(result) {
        sendResponse(result.prospects || []);
      });
      return true; // Required for async sendResponse
    }
    
    if (request.action === "saveProspect") {
      // Save a new prospect
      chrome.storage.local.get(['prospects'], function(result) {
        const prospects = result.prospects || [];
        prospects.push(request.data);
        chrome.storage.local.set({prospects: prospects}, function() {
          sendResponse({success: true});
        });
      });
      return true; // Required for async sendResponse
    }
  }
);

// Open the extension popup when the browser action is clicked
chrome.action.onClicked.addListener(function(tab) {
  chrome.tabs.create({url: 'index.html'});
});
