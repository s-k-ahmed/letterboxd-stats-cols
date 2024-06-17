const bodyEl = document.getElementsByTagName('body')[0];
const scriptEl = document.createElement('script');
scriptEl.setAttribute('type', 'text/javascript');
scriptEl.setAttribute('src', chrome.runtime.getURL('inject.js'));
bodyEl.appendChild(scriptEl);

/*
const mapEl = document.getElementsByClassName('svgMap-map-controls-wrapper');
const keyWrapper = document.createElement("div");
keyWrapper.classList.add("map-colour-key-wrapper");
keyWrapper.style.cursor = 'pointer';
keyWrapper.style.height = '30px';
keyWrapper.style.position = 'relative';
keyWrapper.style.background = "#2c3440";
const colourKeyA = document.createElement("div");
const colourKeyB = document.createElement("div");
const colourKeyC = document.createElement("div");
const colourKeyD = document.createElement("div");
const colourKeyE = document.createElement("div");
const colourKeys = [colourKeyA, colourKeyB, colourKeyC, colourKeyD, colourKeyE];
colourKeys.forEach(value => {
    value.style.height = '20px';
    value.style.width = '20px';
    value.style.position = 'relative';
    keyWrapper.appendChild(value);
})
colourKeyA.style.background = 'hsl(143, 100%, 23%)';
colourKeyB.style.background = 'hsl(143, 100%, 61%)';
colourKeyC.style.background = 'hsl(143, 100%, 100%)';
colourKeyD.style.background = 'hsl(30, 100%, 75%)';
colourKeyE.style.background = 'hsl(30, 100%, 51%)';
[...mapEl].forEach(value => {
    value.appendChild(keyWrapper);
})
    */