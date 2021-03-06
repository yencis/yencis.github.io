const sample = [
    {
        language: 'Java',
        value: 70,
        color: '#000000'
    },
    {
        language: 'HTML5',
        value: 32,
        color: '#00a2ee'
    },
    {
        language: 'CSS',
        value: 37,
        color: '#00a2ee'
    },
    {
        language: 'Python',
        value: 32,
        color: '#00a2ee'
    },
    {
        language: 'JavaScript',
        value: 32,
        color: '#00a2ee'
    }
];

const sWidth = screen.width/2;
const sHeight = screen.height/1.4;
const fontSize = 20*sWidth/1024;
console.log(sWidth+" "+sHeight);



sample.sort((a, b) => a.value-b.value);

const margin = 150;
const width = sWidth - 2 * margin;
const height = sHeight - 2 * margin;
const svg = d3.select('svg');

const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

//const array = ["cheese","dog"]

const yScale = d3.scaleBand()
    .range([height, 0])
    .domain(sample.map((s) => s.language))
    .padding(0.2);

let yAxisGen = d3.axisLeft(yScale);

let yAxis = chart.append('g')
    .call(yAxisGen);

yAxis.attr("transform", `translate(${-20},${0})`);
yAxis.select(".domain")
    .attr("opacity", "0");
yAxis.selectAll(".tick line")
    .attr("opacity", "0");
yAxis.selectAll(".tick text")
    .attr("font-size", fontSize)
    .attr("color", "#458FFF")
    .attr("font-family", "Rubik");
const xScale = d3.scaleLinear()
    .range([0, width])
    .domain([0, 100]);

let xAxisGen = d3.axisBottom(xScale);

let xAxis = chart.append('g')
    .attr('transform', `translate(0, ${width})`)
    .call(xAxisGen);

xAxis.select(".domain")
    .attr("opacity", "0");

xAxis.selectAll(".tick text")
    .attr("font-size", fontSize)
    .attr("color", "#458FFF")
    .attr("font-family", "Rubik");

xAxis.selectAll(".tick line")
    .attr("opacity", "0");

xAxis.attr("transform", `translate(${0},${height})`);
/*chart.selectAll()
    .data(sample)
    .enter()
    .append('rect')
    .attr('x', (s) => xScale(s.value))
    .attr('y', (s) => yScale(s.language))
    .attr('height', (s) => height - yScale(s.language))
    .attr('width', yScale.bandwidth());*/

const format = xScale.tickFormat(20, sample.format)

chart.append("g")
    .attr("fill", "#C3DCFF")
    .selectAll("rect")
    .data(sample)
    .join("rect")
    //.attr('font-family','FontAwesome')
    //.attr("xlink:href", "https://github.com/favicon.ico")
   // .attr("z-index",-2)
    .attr("id","bg")
    .attr("x", xScale(0))
    .attr("y", (d, i) => yScale(d.language))
    .attr("width", d => width)
    .attr("height", yScale.bandwidth());

chart.append("g")
    .attr("fill", "#2469CD")
    .selectAll("rect")
    .data(sample)
    .join("rect")
    //.attr('font-family','FontAwesome')
    //.attr("xlink:href", "https://github.com/favicon.ico")
   // .attr("z-index",5)
    .attr("id","rects")
    .attr("x", xScale(0))
    .attr("y", (d, i) => yScale(d.language))
    //.attr("width", d => width- xScale(0))
    .attr("width",d=>xScale(0))
    //.attr("width", d => height-yScale(0))
    .attr("height", yScale.bandwidth());

/*
    chart.selectAll("#rects")
        .transition()
        .duration(800)
        .attr("width", d => xScale(d.value) - xScale(0))
        .delay(function(d,i){console.log(i) ; return(i*100)});
*/
$(document).ready(function () {
    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        var elemID = $(elem).attr("id");
        var elemTag = $(elem).prop("tagName");

        return elemTop <= docViewBottom &&
        elemBottom >= docViewTop &&
        elemTag == "svg"
            ? elemID
            : false;
    }

    $(window).scroll(function () {
        //console.log("e");
        $("svg").each(function () {
            var ele = isScrolledIntoView(this);
           // console.log(ele);
            if (ele) {
                var ele_ = ele.replace(/-/g, "_");

                var fn = eval(ele_);
                var checkEle = $("#" + ele).attr("data-enable");

                if (!checkEle) {
                    //   console.log(ele);
                    $(this).attr("data-enable", "true");
                    setTimeout(() => {
                        console.log("e");
                        chart.selectAll("#rects")
                            .transition()
                            .duration(600)
                            .attr("width", d => xScale(d.value) - xScale(0))
                            .delay(function (d, i) {
                                console.log(i);
                                return (i * 100)
                            });
                    }, 100);
                }
            }
        });
    });
});
    // function that starts drawing d3 chart
