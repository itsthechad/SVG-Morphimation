# SVG-Morphimation
Create "elaborate" SVG morphing animations. Requires jQuery.

This javascript creates an "elaborate" SMIL morphing animation by reading in an SVG file formatted in a specific way and formatting it into SMIL syntax. If done correctly, you can quickly and easily create animations in a vector drawing program (this currently is designed to work with iDraw but may also work with Illustrator [if not, it can easily be modified to do so]). 

For an example of an animation created with this process, check out the included index.html.

Instructions for use:

1. In your HTML, create a container with an ID of "themorphimation". The animation will be placed inside that container.
   Suggestion: Place a regular JPG or PNG image in that container for the purposes of progressive enhancement. That image will be replaced with the animation, assuming everything works properly. If not, then at least the still image will appear.

2. Include jQuery and the morphimation.js

3. Initiate the animation by calling morphimation( mergedSVGsPath, animDuration )
   Arguments:
     mergedSVGsPath is the path to the SVG document (renamed with an HTML extension - more on this below)
	 animDuration is the total amount of time you want the animation to last (in seconds)
	 
   Example:
   
   	<script>
	// Document ready
	jQuery(document).ready(function($){

		// Initiate and run the morphimation, passing in the path of your SVG file (renamed with html extenstion) and the animation duration
		morphimation( "caricatureSVGs.html", 10 );

	});
	</script>
	 
4. Make sure the SVG file is formatted correctly (see below) and renamed with an HTML extension (a silly requirement that I haven't gotten around to fixing).


SVG file:

I've been using a program called iDraw (it's like Illustrator-lite) to create and export my animation frames. The morphimation script is built to simply read the output SVG file and construct the animation from it, rather than me having to manually convert the many SVGs into the complicated animation every time I make a change. 

If you use iDraw, follow the directions below. I'm assuming Illustrator exports are very similar or exactly the same, but I haven't tested yet. If Illustrator's output is different, then the javascript would need to be modified to deal with it.

Creating your SVG file in iDraw (or Illustrator):

* Every layer of the document will become a frame of the animation. Start with a single layer, draw the most complex version of your animation, then copy the layer, tweak it, and repeat to make additional frames for the animation.
* Very important: Every frame/layer must have the same exact points for morphing to work. You can't have a square with 4 points in one frame morph into a triangle with 3 points in another. You can, however, have a 4-pointed square morph into a triangle with 4 points, one of which is embedded in one side of the triangle. This is why you want to draw the most complex frame first - you can't add or remove points later.
* Every layer can have many different paths within it. In my example, one frame of my caricature animation is a layer. In that layer is a mouth path, neck path, 7 separate nose paths, many eye paths etc. Each of these paths should be named uniquely and consistently. Every layer should have the same exact paths with the same exact names (though the points and curves in those paths can, of course, move around from layer to layer to create the movement) This unique-but-consistent-between-layers naming is necessary so the javascript can build the animation.
* To have the animation loop (recommended), have the first and last layer/frame be the exact same.
* In you layer palette, place your first layer/frame at the bottom of the palette and the last layer/frame at the top.
* Before exporting, make all layers hidden (unclick the eye icon) except for the first layer.
* Exporting (iDraw instructions):
  1. File -> Export
  2. Choose: SVG, Entire Canvas, 100%, 1x scale, Convert to sRGB
  3. Click Save and save with a web-friendly file name
  4. Rename the file to have a .html extension instead of .svg
  