const bodyEl = document.getElementsByTagName('body')[0];
const scriptEl = document.createElement('script');
scriptEl.setAttribute('type', 'text/javascript');
scriptEl.setAttribute('src', chrome.runtime.getURL('inject.js'));
bodyEl.appendChild(scriptEl);