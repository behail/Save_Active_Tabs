// load the js file after the dom is loaded, before image and fonts are loaded
document.addEventListener("DOMContentLoaded", () => {
  // elements
  const saveBtn = document.getElementById("save-tab");
  const deleteBtn = document.getElementById("delete-all");
  const olEl = document.getElementById("tab-lists");

  // variables
  const localStorageKey = "tabsList";
  let tabsList = [];

  // Initial stage
  if (localStorage.getItem(localStorageKey)) {
    tabsList = JSON.parse(localStorage.getItem(localStorageKey));
  }

  // render items on the DOM
  const render = (lists) => {
    olEl.innerHTML = "";
    for (const list of lists) {
      olEl.innerHTML += `<li>
            <a href=${list.url} target="_blank">
                ${list.title}
            </a>
        </li>`;
    }
  };

  render(tabsList);

  // add current tab to the tab list
  saveBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currTab = tabs[0];
      tabsList.push({ title: currTab.title, url: currTab.url });
      localStorage.setItem(localStorageKey, JSON.stringify(tabsList));
      render(tabsList);
    });
  });

  // remove all tab lists from the localstorage , momery and DOM
  deleteBtn.addEventListener("click", function () {
    tabsList = [];
    localStorage.clear();
    render(tabsList);
  });
});
