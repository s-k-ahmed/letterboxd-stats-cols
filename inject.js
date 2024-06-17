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
//keyWrapper.style.cursor = 'default';
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
const keyNumbers = [1, Math.round((1 + medianCount) / 2), medianCount, Math.round(Math.exp((Math.log(medianCount) + Math.log(maxWatchCount)) / 2)), maxWatchCount]
colourKeys.forEach((colkey, index) => {
    colkey.style.height = '20px';
    colkey.style.width = '20px';
    colkey.style.position = 'relative';
    colkey.style.margin = '5px';
    colkey.style.display = 'flex';
    colkey.style.justifyContent = 'center';
    colkey.style.alignItems = 'center';
    //colkey.style.fontWeight = 'bold';
    //colkey.style.fontFamily = 'TiemposTextWeb-Semibold, Georgia, serif';
    let innerNum = keyNumbers[index];
    colkey.innerText = innerNum;
    colkey.classList.add('col-key');
    keyWrapper.appendChild(colkey);
})
colourKeyA.style.background = 'hsl(143, 100%, 23%)';
colourKeyB.style.background = 'hsl(143, 100%, 61%)';
colourKeyC.style.background = 'hsl(143, 100%, 100%)';
colourKeyD.style.background = 'hsl(30, 100%, 75%)';
colourKeyE.style.background = 'hsl(30, 100%, 51%)';
colourKeyA.style.color = 'hsl(143, 100%, 61%)';
colourKeyB.style.color = 'hsl(143, 100%, 23%)';
colourKeyC.style.color = '#2c3440';
colourKeyD.style.color = 'hsl(30, 100%, 45%)';
colourKeyE.style.color = 'hsl(30, 100%, 90%)';

[...mapEl].forEach(value => {
    value.appendChild(keyWrapper);
})