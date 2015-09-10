//** 
//** Set up and animate the homepage charicature animation
//**

// Variables
var $mergedSVGs;
var SVGpath;
var animDur;



// Gets first SVG from merged.html and substitutes it in for the PNG placeholder
function setupStaticSVG() {

	// grab all the svg data from the merged.html file
	jQuery.get( SVGpath, function(data) {

		$mergedSVGs = data; // save this later for prepAdmins()

		// create a static SVG from the first SVG in the file		
		jQuery('#themorphimation').html( $mergedSVGs );
		jQuery('#themorphimation svg g').not(':nth-child(2)').remove();
		

		// set a few details and styling for the SVG
		jQuery('#themorphimation>svg')[0].setAttribute("viewBox", "0, 0, 552, 680");
		jQuery('#themorphimation>svg').attr({
			id: "themorphimationSVG",
			//width: "520px",
			//height: "680px",
			style: "float:left; max-width:520px;"
		});
		// remove width and height for responsive purposes
		jQuery('#themorphimation>svg').removeAttr('width height');

		// If we're not in mobile, setup the animations (mobile doesn't get animations, sorry)
		if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

			// add an empty "animate" xml element to every path element
			jQuery('#themorphimationSVG path').each(function(index) {

				// create the animate element using the SVG namespace and fill it with starting values
				var animation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
				animation.setAttributeNS(null, "id", jQuery(this).attr('id') + '-animation');
				animation.setAttributeNS(null, "dur", animDur + 's');
				animation.setAttributeNS(null, "repeatCount", "indefinite");
				animation.setAttributeNS(null, "attributeName", "d");
				animation.setAttributeNS(null, "values", "");
				//animation.setAttributeNS(null, "keyTimes", "");
				animation.setAttributeNS(null, "begin", "0s");
				// append the animate element to the current path
				this.appendChild(animation);
				// tell the animation to begin
				//animation.beginElement();

			});

			// prep the animation frames
			prepAnims();

			// setup mouse listner for interactive fun
			jQuery('#themorphimationSVG path').mouseenter(mouseEnterPath);

		}

	});

}

// event listener for interactive fun with SVG
function mouseEnterPath() {

	// fade the current element (an SVG path) out or in as the mouse enters and leaves, respectively
	jQuery(this).stop().fadeTo(100, 0.0, function() {
		jQuery(this).stop().fadeTo(15000, 1);
	});
}


//Prep the animation frames
function prepAnims() {

	// get the g elements with ids from the merged SVGs
	var $gs = jQuery($mergedSVGs).find('g[id]');

	// go through the gs once to find out the total duration value
	//var totalDuration = 0;
	//var useKeyTimes = true;
	//$gs.each(function(index) {
		// if the g's id is a number, then we'll add it to the totalDuration
		//if ( jQuery(this).attr("id").isNumeric ){
		//	totalDuration += jQuery(this).attr("id");
		//	console.log(totalDuration);
		//} 
		// otherwise, the user did not setup the SVG for keyTimes, so we'll make a note not to use them at all
		//else {
		//	useKeyTimes = false;
		//}
	//});//each $gs
	
	var isLastG = false;

	//loop through each g
	$gs.each(function(index) {

		// we're gonna need to do something different with the last g, so we'll note when we get there
		if ($gs.length == index + 1) {
			isLastG = true;
		}

		// find all the paths belonging to the current g
		var $paths = jQuery(this).find("path");

		//loop through each path within the current g
		$paths.each(function(index) {

			//get the current path's id
			var pathsID = jQuery(this).attr("id");
			//get the current path's d values (the bezier curve data)
			var pathsD = jQuery(this).attr("d");

			// append the data differently, depending on whether we're on the last g or not
			if (!isLastG) {
				// append the current frame values to the path's animate element
				jQuery('#' + pathsID + '-animation').attr('values', function(i, val) {
					return val + pathsD + '; ';
				});
/* 				jQuery('#' + pathsID + '-animation').prop('keyTimes', function(i, val) {
					return val + '1; ';
				}); */
			} else {
				// slight difference when we're on the last g: no trailing semicolon
				jQuery('#' + pathsID + '-animation').attr('values', function(i, val) {
					return val + pathsD;
				});
/* 				jQuery('#' + pathsID + '-animation').prop('keyTimes', function(i, val) {
					return val + '1';
				}); */
			}
		});//each $paths
	});//each $gs	
} //prepAnims


// Document ready
function morphimation( mergedSVGsPath, animDuration ) {

	SVGpath = mergedSVGsPath;
	animDur = animDuration;
	
	setupStaticSVG();

} //morphimation

