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