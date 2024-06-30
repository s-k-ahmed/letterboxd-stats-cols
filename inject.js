const countryPaths = document.getElementsByClassName("svgMap-country");

const acwCounts = [];
for (const country in window.allCountriesWatched) {
    let countryCount = Object.getOwnPropertyDescriptor(window.allCountriesWatched[country], "count").value;
    acwCounts.push(countryCount);
}
const maxWatchCount = Math.max(...acwCounts);
const uniqueCounts = Array.from(new Set(acwCounts));
uniqueCounts.pop();
const medianCount = uniqueCounts[Math.floor((uniqueCounts.length - 1) / 2)];

[...countryPaths].forEach(path => { 
    let dataid = path.getAttribute("data-id");
    if (!path.hasAttribute("fill")){
        return;
    }
    let watchCount = window.allCountriesWatched[dataid].count;
    if (watchCount == 0) {
        return;
    }
    let fillhue;
    let fillsat = "100%";
    let filllight;
    if (watchCount <= medianCount) {
        let prop = (watchCount - 1) / (medianCount - 1);
        fillhue = "143";
        let light = Math.round(23 + (77 * prop));
        filllight = light.toString() + "%";
    }
    else {
        let prop = (Math.log(watchCount) - Math.log(medianCount) + 1)/(Math.log(maxWatchCount) - Math.log(medianCount) + 1);
        fillhue = "30";
        let light = Math.round(100 - (49 * prop));
        filllight = light.toString() + "%";
    }
    let fillReplace = "hsl(" + fillhue + "," + fillsat + "," + filllight + ")";
    path.style.fill = fillReplace;
    path.removeAttribute("fill");

    path.addEventListener('mouseenter', () => {
        path.style.fill = '#40bcf4';
    });
    path.addEventListener('mouseleave', () => {
        path.style.fill = fillReplace;
    })
});

const mapEl = document.getElementsByClassName('svgMap-map-controls-wrapper');
const keyWrapper = document.createElement("div");
keyWrapper.classList.add("map-colour-key-wrapper");
keyWrapper.style.cursor = 'default';
keyWrapper.style.height = '30px';
keyWrapper.style.position = 'relative';
keyWrapper.style.background = "#2c3440";
keyWrapper.style.display = 'flex';

const colourKeyA = document.createElement("div");
const colourKeyB = document.createElement("div");
const colourKeyC = document.createElement("div");
const colourKeyD = document.createElement("div");
const colourKeyE = document.createElement("div");
const colourKeys = [colourKeyA, colourKeyB, colourKeyC, colourKeyD, colourKeyE];
const keyNumbers = [1, Math.round((1 + medianCount) / 2), medianCount, Math.round(Math.exp((Math.log(medianCount) + Math.log(maxWatchCount)) / 2)), maxWatchCount];
const keyHues = [143, 143, 0, 30, 30];
const keySats = ['100%', '100%', '0%', '100%', '100%'];
const keyLights = ['23%', '61%', '100%', '75%', '51%'];
const keyHoverLights = ['12%', '31%', '50%', '38%', '26%'];

colourKeys.forEach((colkey, index) => {
    let colKeyBG = 'hsl(' + keyHues[index] + ", " + keySats[index] + ", " + keyLights[index] + ")";
    let colKeyHoverBG = 'hsl(' + keyHues[index] + ", " + keySats[index] + ", " + keyHoverLights[index] + ")";
    colkey.style.background = colKeyBG;
    colkey.style.height = '20px';
    colkey.style.width = '20px';
    colkey.style.position = 'relative';
    colkey.style.margin = '5px';
    colkey.style.display = 'flex';
    colkey.style.justifyContent = 'center';
    colkey.style.alignItems = 'center';
    colkey.style.color = 'white';
    //colkey.style.fontWeight = 'bold';
    //colkey.style.fontFamily = 'TiemposTextWeb-Semibold, Georgia, serif';
    let innerNum = keyNumbers[index];
    if (innerNum < 100) {
        colkey.style.fontSize = 'smaller';
    }
    else {
        colkey.style.fontSize = 'xx-small';
    }
    colkey.addEventListener('mouseenter', () => {
        colkey.style.background = colKeyHoverBG;
        colkey.innerText = innerNum;
    })
    colkey.addEventListener('mouseleave', () => {
        colkey.style.background = colKeyBG;
        colkey.innerText = "";
    })
    colkey.classList.add('col-key');
    keyWrapper.appendChild(colkey);
});

[...mapEl].forEach(value => {
    value.appendChild(keyWrapper);
})