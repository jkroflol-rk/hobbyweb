function drawGraph(country) {
    let width = 600;
    let height = 400;
    let margin = 60;
    let svg = d3.select("#lineGraph")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "line");

    let dataset = [];
    d3.csv("dataset/NZ_MIGRATION.csv").then(function (data) {
        data.forEach(function (d) {
            if (d.country === country) {
                dataset.push({
                    "x": parseInt(d.year),
                    "y": parseInt(d.estimate)
                });
            }
        });

        // Add x Axis
        let xScale = d3.scaleLinear()
            .domain([2013, 2023])
            .range([0, width - margin - 30]);
        svg.append("g")
            .attr("transform", "translate(" + margin + "," + (height - margin) + ")")
            .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));
        svg.append("text")
            .attr("class", "x-label")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height - 6)
            .text("Year");
        // Add Y axis
        let yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, d => d.y)])
            .range([height - margin, margin]);
        svg.append("g")
            .call(d3.axisLeft(yScale))
            .attr("transform", "translate(" + margin + ", 0)");
        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "middle")
            .attr("y", 10)
            .attr("dy", "0.2em")
            .attr("x", -(height / 2))
            .attr("transform", "rotate(-90)")
            .text("Number of visitor");
        svg.append("path")
            .datum(dataset)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(function (d) { return xScale(d.x); })
                .y(function (d) { return yScale(d.y); })
            )
            .attr("transform", "translate(" + margin + ",0)");
    });
}

window.addEventListener('load', function () {
    drawGraph("Vietnam"); // Initial call with default country
});
