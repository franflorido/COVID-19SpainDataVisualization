import * as d3 from "d3";
import * as topojson from "topojson-client";
const spainjson = require("./spain.json");
const d3Composite = require("d3-composite-projections");
import { latLongCommunities } from "./communities";
import { stats, stats_1, ResultEntry } from "./stats";

const aProjection = d3Composite
  .geoConicConformalSpain() // Let's make the map bigger to fit in our resolution
  .scale(3300)
  // Let's center the map
  .translate([500, 400]);

const geoPath = d3.geoPath().projection(aProjection);

const geojson = topojson.feature(spainjson, spainjson.objects.ESP_adm1);

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

// 50 pixel max radius, we could calculate it relative to width and height

const calculateMaxAffected = (dataset:ResultEntry[]) => {
  return dataset.reduce(
    (max, item) => (item.value > max ? item.value : max),
    0
  );
};

const updateChart = (dataset: ResultEntry[]) => {
  
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
