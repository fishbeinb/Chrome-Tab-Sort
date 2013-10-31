var domains = [];
var domainWindow = [];

//Recursive Third
function orginizeTabs(tabs, maxTab, currentTab)
	{
	if(maxTab>currentTab)
	{
		if(domains.indexOf(tabs[currentTab].url.substring(tabs[currentTab].url.indexOf("www.")+4, tabs[currentTab].url.indexOf(".com"))) > -1)
		{
			tabinfo = new Object();
			tabinfo.windowId = domainWindow[domains.indexOf(tabs[currentTab].url.substring(tabs[currentTab].url.indexOf("www.")+4, tabs[currentTab].url.indexOf(".com")))].id;
			tabinfo.index = -1;
			chrome.tabs.move(tabs[currentTab].id, tabinfo, function(t){orginizeTabs(tabs, maxTab, currentTab + 1);});
		}
		else
		{
			domains.push(tabs[currentTab].url.substring(tabs[currentTab].url.indexOf("www.")+4, tabs[currentTab].url.indexOf(".com")));
			newWindow = new Object();
			newWindow.tabId = tabs[currentTab].id;
			chrome.windows.create(newWindow, function(newWindow){domainWindow.push(newWindow); orginizeTabs(tabs, maxTab, currentTab + 1);});
		}
	}
};

//Second
function updateIcon() {
	chrome.tabs.query({},function(tabs){orginizeTabs(tabs, tabs.length, 0);});
};

//First
chrome.browserAction.onClicked.addListener(updateIcon);
