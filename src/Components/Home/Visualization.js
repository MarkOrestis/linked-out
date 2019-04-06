import React, { Component } from 'react';
import * as d3 from 'd3v4';
import Button from '@material-ui/core/Button';
import { withFirebase } from '../Firebase';

const styles = theme => ({
	/*
	button: {
      	margin: theme.spacing.unit,
	},
	*/
	button: {
		minWidth: 130,
      	padding: '4px 5px',
      	cursor: 'pointer',
      	textAlign: 'center',
      	fontSize: 13,
      	border: '1px solid #e0e0e0',
      	textDecoration: 'none',
	},
	
	tooltip: {
      position: 'absolute',
      textAlign: 'center',
      width: 150,
      height: 60,
      padding: 2,
      font: '12px sans-serif',
      background: 'lightsteelblue',
      border: 0,
      bordeeRadius: 8,
      pointerEvents: 'none',
    }
});

class Visualization extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			users: [],
		  };
	}

	componentWillUnmount() {
		this.props.firebase.users().off();
	  }

	componentDidMount() {
		this.setState({ loading: true });
		this.props.firebase.users().on('value', snapshot => {
			const usersObject = snapshot.val();
	  
			const usersList = Object.keys(usersObject).map(key => ({
			  ...usersObject[key],
			  uid: key,
			}));
	  
			this.setState({
			  users: usersList,
			  loading: false,
			});
			this.drawViz();			
		  });

	}

	drawViz() {
		var data = (this.state.users);

		var w = 960, h = 500;

	    var radius = .0005;
	    var color = d3.scaleOrdinal(d3.schemeCategory20);
	    var centerScale = d3.scalePoint().padding(1).range([0, w]);
	    var forceStrength = 0.05;

	    var div = d3.select("#viz").append("div")
	        .attr("className", "tooltip")
	        .style("opacity", 0)
	        .style("position", "absolute")
	        .style('text-aligh', 'center')
	        .style('width', '150px')
	        .style('height', '60px')
	        .style('padding', '2px')
	        .style('font', '12px sans-serif')
	        .style('border', '0px')
	        .style('border-radius', '8px')
	        .style('background', 'lightsteelblue');

	    if (document.getElementById('vis')) {
	    	console.log("FOUND THE VIZ");
	    	document.getElementById('vis').parentNode.removeChild(document.getElementById('vis'))
	    }

	    var svg = d3.select("#viz").append("svg")
	    	.attr("id", "vis")
	        .attr("width", w)
	        .attr("height", h)

	    var simulation = d3.forceSimulation()
	        .force("collide", d3.forceCollide(function (d) {
	            return d.r + 8
	        }).iterations(16)
	        )
	        .force("charge", d3.forceManyBody())
	        .force("y", d3.forceY().y(h / 2))
	        .force("x", d3.forceX().x(w / 2))
		
		
			// console.log(data)

	        data.forEach(function (d) {
	        	// console.log(d);
	            d.r = radius;
	            d.x = w / 2;
	            d.y = h / 2;
	        });


	        var circles = svg.selectAll("circle")
	            .data(data, function (d) { 
	            	// console.log(d);
					// console.log(d.uid);

					return d.uid;
	            });

	        var circlesEnter = circles.enter().append("circle")
	            .attr("r", function (d, i) { return d.r; })
	            .attr("cx", function (d, i) { return 175 + 25 * i + 2 * i ** 2; })
	            .attr("cy", function (d, i) { return 250; })
	            .style("fill", function (d, i) { return color(d.major); })
	            .style("stroke", function (d, i) { return color(d.major); })
	            .style("stroke-width", 10)
	            .style("pointer-events", "all")
	            .call(d3.drag()
	                .on("start", dragstarted)
	                .on("drag", dragged)
	                .on("end", dragended))
	            .on("mouseover", function(d) {
	                div.transition()
	                    .duration(200)
	                    .style("opacity", .9);
	                div.html("Name: " + d.fname + ' ' + d.lname +"<br/>" +
	                        "Major: " + d.major + "<br/>" +
	                        "Company: " + d.company + "<br/>"
	                )
	                    .style("left", (d3.event.pageX + 20) + "px")
	                    .style("top", (d3.event.pageY - 50) + "px");
	                })
	                .on("mouseout", function(d) {
	                div.transition()
	                    .duration(500)
	                    .style("opacity", 0);
	                });

	        circles = circles.merge(circlesEnter);



	        function ticked() {
	            circles
	                .attr("cx", function (d) { return d.x; })
	                .attr("cy", function (d) { return d.y; });
	        }

	        simulation
	            .nodes(data)
	            .on("tick", ticked);

	        function dragstarted(d, i) {
	            //console.log("dragstarted " + i)
	            if (!d3.event.active) simulation.alpha(1).restart();
	            d.fx = d.x;
	            d.fy = d.y;
	        }

	        function dragged(d, i) {
	            //console.log("dragged " + i)
	            d.fx = d3.event.x;
	            d.fy = d3.event.y;
	        }

	        function dragended(d, i) {
	            //console.log("dragended " + i)
	            if (!d3.event.active) simulation.alphaTarget(0);
	            d.fx = null;
	            d.fy = null;
	            var me = d3.select(this)
	            console.log(me.classed("selected"))
	            me.classed("selected", !me.classed("selected"))

	            d3.selectAll("circle")
	                .style("fill", function (d, i) { return color(d.major); })

	            d3.selectAll("circle.selected")
	                .style("fill", "none")

	        }

	        function groupBubbles() {
	            // @v4 Reset the 'x' force to draw the bubbles to the center.
	            simulation.force('x', d3.forceX().strength(forceStrength).x(w / 2));

	            // @v4 We can reset the alpha value and restart the simulation
	            simulation.alpha(1).restart();
	        }

	        function splitBubbles(byVar) {

	            centerScale.domain(data.map(function (d) { return d[byVar]; }));

	    
	            //@v4 Reset the 'x' force to draw the bubbles to their year centers
	            simulation.force('x', d3.forceX().strength(forceStrength).x(function (d) {
	                return centerScale(d[byVar]);
	            }));

	            // @v4 We can reset the alpha value and restart the simulation
	            simulation.alpha(2).restart();
	        }


	        function setupButtons() {
	            d3.selectAll('.button')
	                .on('click', function () {

	                    // Remove active class from all buttons
	                    d3.selectAll('.button').classed('active', false);
	                    // Find the button just clicked
	                    var button = d3.select(this);

	                    // Set it as the active button
	                    button.classed('active', true);

	                    // Get the id of the button
	                    var buttonId = button.attr('id');

	                    console.log(buttonId)
	                    // Toggle the bubble chart based on
	                    // the currently clicked button.
	                    splitBubbles(buttonId);
	                });
	        }

	        setupButtons();

	}

	render() {
		const { users, loading } = this.state;
		const { classes } = this.props;
		return (

			<div>
		    <div id={"#" + this.props.id}></div>
		    <div id="toolbar">
		      	<Button variant="contained" color="primary" id="all" className='button' style={{ margin: '5px 0px'}}>All</Button>
		      	<div style={{width: 8, display: 'inline-block'}}/>
		      	<Button variant="contained" color="primary" id="year" className='button' style={{ margin: '5px 0px'}}>By Year</Button>
		      	<div style={{width: 8, display: 'inline-block'}}/>
		      	<Button variant="contained" color="primary" id="major" className='button' style={{ margin: '5px 0px'}}>By Major</Button>
		      	<div style={{width: 8, display: 'inline-block'}}/>
		      	<Button variant="contained" color="primary" id="gpa" className='button' style={{ margin: '5px 0px'}}>By GPA</Button>
		      	<div style={{width: 8, display: 'inline-block'}}/>
		      	<Button variant="contained" color="primary" id="company" className='button' style={{ margin: '5px 0px'}}>By Company</Button>
		      	<div style={{width: 8, display: 'inline-block'}}/>
		      	<Button variant="contained" color="primary" id="salary" className='button' style={{ margin: '5px 0px'}}>By Salary</Button>
		    </div>
		    <div id="viz">
				{loading && <div>Loading ...</div>}
			</div>
		    </div>
		);
	}
}

export default withFirebase(Visualization);
