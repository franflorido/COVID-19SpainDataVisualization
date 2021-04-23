# COVID-19SpainDataVisualization using D3js
In this repository im going to add some D3js data visualization of the COVID-19 data in Spain. Im going to create a Spain map that contains a graphic representation of COVID data in 2020 and 2021. You will be able to change the view of both representation using the buttons you will find above the map and you will get this result.

## COVID results 2020 

![2020bueno](./Tarea1/content/2020bueno.PNG "affected coronavirus 2020" ) 

## COVID results 2021 

![2021bueno](./Tarea1/content/2021bueno.PNG "affected coronavirus 2021")

In order to perform that first we had to get the actualiced .json file containig the COVID data. The data I used came from this website.

https://covid19.secuoyas.io/api/v1/es/ccaa?fecha=2020-04-01

After getting the data I had to do some data cleaning in order to get them in the format I wanted. You can see the way I cleaned the data in the jupyter notebook you will find in the following directory.

COVID-19SpainDataVisualization/Tarea1/JSONcleaning.ipynb

After cleaning the data we can start performing the visualization.

The first thing you have to do is to create a project folder containing the following files and directories:

- src/ (directory)
- package.json (npm configuration file)
- tsconfig.json (typescript configuration file)

The second thing we need to do is to install npm and the following modules:

```bash
npm install
```

When you deal with maps you can use two map formats GeoJSON or TopoJSON, topoJSON is lightweight and offers some extra features, let's install the needed package to work with:

```bash
npm install topojson-client --save
```

```bash
npm install @types/topojson-client --save-dev
```

Let's install the library that contains this projections:

```bash
npm install d3-composite-projections --save
```

Let's install the node typings to get require typing:

```bash
npm install @types/node --save-dev
```
Once we have everything we needed installed, let´s create the required files in the src/ directory:

- src/index.ts: Business logic.
- src/communities.ts: Contains information about the latitude and longitude of each community of Spain.
- src/stats.ts: Contains information about COVID-19 cases per community.
- src/index.html: HTML code of the project.
- src/map.css: CSS code of the project.

### src/index.html:

```diff
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="./map.css" />
    <link rel="stylesheet" type="text/css" href="./base.css" />
  </head>
  <body>
    <div>
      <button id="Results2020">Results2020</button>
      <button id="Results2021">Results2021</button>
    </div>
    <script src="./index.ts"></script>
  </body>
</html>
```
As you can see the buttons are inserter inside the body function.

### src/communities.ts:


```typescript
export const latLongCommunities = [
  {
    name: "Madrid",
    long: -3.70256,
    lat: 40.4165,
  },
  {
    name: "Andalucía",
    long: -4.5,
    lat: 37.6,
  },
  {
    name: "Valencia",
    long: -0.37739,
    lat: 39.45975,
  },
  {
    name: "Murcia",
    long: -1.13004,
    lat: 37.98704,
  },
  {
    name: "Extremadura",
    long: -6.16667,
    lat: 39.16667,
  },
  {
    name: "Cataluña",
    long: 1.86768,
    lat: 41.82046,
  },
  {
    name: "País Vasco",
    long: -2.75,
    lat: 43.0,
  },
  {
    name: "Cantabria",
    long: -4.03333,
    lat: 43.2,
  },
  {
    name: "Asturias",
    long: -5.86112,
    lat: 43.36662,
  },
  {
    name: "Galicia",
    long: -7.86621,
    lat: 42.75508,
  },
  {
    name: "Aragón",
    long: -1.0,
    lat: 41.0,
  },
  {
    name: "Castilla y León",
    long: -4.45,
    lat: 41.383333,
  },
  {
    name: "Castilla La Mancha",
    long: -3.000033,
    lat: 39.500011,
  },
  {
    name: "Islas Canarias",
    long: -15.5,
    lat: 28.0,
  },
  {
    name: "Islas Baleares",
    long: 2.52136,
    lat: 39.18969,
  },
  {
    name: "Navarra",
    long: -1.65,
    lat: 42.816666,
  },
  {
    name: "La Rioja",
    long: -2.445556,
    lat: 42.465,
  },
  {
    name: "Ceuta",
    long: -5.3162,
    lat: 35.8883,
  },
  {
    name: "Melilla",
    long: -2.93848,
    lat: 35.2919,
  },
];
```

### src/stats.ts:

```typescript
export interface ResultEntry {
  name: string;
  value: number;
}

export const initialStats: ResultEntry[] = [
  {
    name: "Madrid",
    value: 174,
  },
  {
    name: "La Rioja",
    value: 39,
  },
  {
    name: "Andalucía",
    value: 34,
  },
  {
    name: "Cataluña",
    value: 24,
  },
  {
    name: "Valencia",
    value: 30,
  },
  {
    name: "Murcia",
    value: 0,
  },
  {
    name: "Extremadura",
    value: 6,
  },
  {
    name: "Castilla La Mancha",
    value: 16,
  },
  {
    name: "País Vasco",
    value: 45,
  },
  {
    name: "Cantabria",
    value: 10,
  },
  {
    name: "Asturias",
    value: 5,
  },
  {
    name: "Galicia",
    value: 3,
  },
  {
    name: "Aragón",
    value: 11,
  },
  {
    name: "Castilla y León",
    value: 19,
  },
  {
    name: "Islas Canarias",
    value: 18,
  },
  {
    name: "Islas Baleares",
    value: 6,
  },
  {
    name: "Navarra",
    value: 20,
  },
  {
    name: "Ceuta",
    value: 5,
  },
  {
    name: "Melilla",
    value: 25,
  },
];

# Data cleaned from Jupyter

export const stats_1: ResultEntry[] = [
  { name: "Andalucía", value: 6392 },
  { name: "Aragón", value: 2491 },
  { name: "Asturias", value: 1322 },
  { name: "Baleares", value: 1131 },
  { name: "Canarias", value: 1380 },
  { name: "Cantabria", value: 1213 },
  { name: "Castilla La Mancha", value: 7047 },
  { name: "Castilla y León", value: 6847 },
  { name: "Cataluña", value: 19991 },
  { name: "Ceuta y Melilla", value: 1000 },
  { name: "Valencia", value: 5922 },
  { name: "Extremadura", value: 1679 },
  { name: "Galicia", value: 4432 },
  { name: "Madrid", value: 29840 },
  { name: "Murcia", value: 1041 },
  { name: "Navarra", value: 2497 },
  { name: "País Vasco", value: 6838 },
  { name: "La Rioja", value: 1960 },
  { name: "Islas Canarias", value: 6838 },
  { name: "Islas Baleares", value: 1960 },
];

### src/map.css:

We will create two classes:

- country: Class for the country color and community lines.
- affected-marker: Class for the orange circles.

```typescript
.country {
  stroke-width: 1;
  stroke: #2f4858;
  fill: #008c86;
}

.affected-marker {
  stroke-width: 1;
  stroke: #bc5b40;
  fill: #f88f70;
  fill-opacity: 0.7;
}

We will use Spain topojson info: https://github.com/deldersveld/topojson/blob/master/countries/spain/spain-comunidad-with-canary-islands.json

Let's copy it under the following route _./src/spain.json_

- Now we will import all the dependencies into _index.ts_:

_./src/index.ts_

```diff
import * as d3 from "d3";
import * as topojson from "topojson-client";
const spainjson = require("./spain.json");
const d3Composite = require("d3-composite-projections");
import { latLongCommunities } from "./communities";
import { stats, stats_1, ResultEntry } from "./stats";

```

- After importing the dependences we are goin to buil the map::

_./src/index.ts_

```typescript
const aProjection = d3Composite
  .geoConicConformalSpain() // Let's make the map bigger to fit in our resolution
  .scale(3300)
  // Let's center the map
  .translate([500, 400]);

const geoPath = d3.geoPath().projection(aProjection);
const geojson = topojson.feature(spainjson, spainjson.objects.ESP_adm1);
);
```
Now let's create the map:

```typescript
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 1024)
  .attr("height", 800)
  .attr("style", "background-color: #FBFAF0");

svg
  .selectAll("path")
  .data(geojson["features"])
  .enter()
  .append("path")
  .attr("class", "country")
  // data loaded from json file
  .attr("d", geoPath as any);
```

Now that we have the map we are going to create a funcion that updates the chart every time we click the button with "updateChart" and inside it we are going to create some funcitons in order to visualice the data according to the button clicked:

```typescript
const updateChart = (dataset: ResultEntry[]) => {
```
### First we calculate the max cases given the year we have clicked in and we are going to scale the radius of each circunference

```typescript
  const maxAffected = calculateMaxAffected(dataset);

  const affectedRadiusScale = d3
    .scaleLinear()
    .domain([0, maxAffected])
    .range([0, 50]);

  const calculateRadiusBasedOnAffectedCases = (
    comunidad: string,
    dataset: ResultEntry[]
  ) => {
    const entry = dataset.find((item) => item.name === comunidad);
    return entry ? affectedRadiusScale(entry.value) + 5 : 0;
  };
```
# Now we are going to print the circles in the map 
```typescript
  svg.selectAll("circle").remove();
  svg
    .selectAll("circle")
    .data(latLongCommunities)
    .enter()
    .append("circle")
    .attr("class", "affected-marker")
    .attr("r", (d) => calculateRadiusBasedOnAffectedCases(d.name, dataset))
    .attr("cx", (d) => aProjection([d.long, d.lat])[0])
    .attr("cy", (d) => aProjection([d.long, d.lat])[1]);
};
```
# An to sumb up we are going to declare de buttons instance
```typescript
document
  .getElementById("Results2020")
  .addEventListener("click", function handleResults() {
    updateChart(stats);
  });

document
  .getElementById("Results2021")
  .addEventListener("click", function handleResults() {
    updateChart(stats_1);
  });
```

With this done we have completed the essay! Feel free to try it and make changes!
