var colors = ["","","","","",""];
var alphas = [0,0,0,0];
var blackStops = [0,0,0,0,0,0];
var transparentStops = [0,0,0,0,0,0];
var colorStops = [0,0,0,0,0,0];
var angles = [0,0,0];

$(function(){
   
	$('.color .control')
	.on('focus', function(){
		$(this).select();
	})
	.on('mouseup', function(e){
		e.preventDefault();
	});

	$('.colors .control').on('input',function(){
		colors[$(this).parent().index()] = '#' + $(this).val();
		$('#cubes').css("background",buildBackground());
	});

	$('.alphas .control').on('input',function(){
		value = $(this).val();
		alphas[$(this).parent().index()] = value / 100;
		$('#cubes').css("background",buildBackground());

		$(this).siblings('span').text($(this).val());
	});
	
	$('.blackStops .control').on('input',function(){
		value = $(this).val();
		blackStops[$(this).parent().index()] = value;
		$('#cubes').css("background",buildBackground());
	
		$(this).siblings('span').text(value);
	});	

	$('.transparentStops .control').on('input',function(){
		value = $(this).val();
		transparentStops[$(this).parent().index()] = value;
		$('#cubes').css("background",buildBackground());
	
		$(this).siblings('span').text(value);
	});

	$('.colorStops .control').on('input',function(){
		value = $(this).val();
		colorStops[$(this).parent().index()] = value;
		$('#cubes').css("background",buildBackground());
	
		$(this).siblings('span').text(value);
	});

	$('.angles .control').on('input',function(){
		value = $(this).val();
		angles[$(this).parent().index()] = value;
		$('#cubes').css("background",buildBackground());
	
		$(this).siblings('span').text(value);
	});
	


	$('#menu > ul > li').on('click', function(){
		$this = $(this);
		menuItem = $this.text().toLowerCase();
		$this.parent().siblings().hide();
		$this.parent().siblings(`.${menuItem}`).show();
	});
	
	
	$('.control').trigger('input');


});

function buildBackground(){
	bg = buildGradient(true, angles[0],
			"black", blackStops[0],
			"transparent", transparentStops[0],
			"black"
			) + ',' + 
		buildGradient(true, angles[1],
			"black", blackStops[1],
			"transparent", transparentStops[1],
			"black"
			) + ',' + 
		buildGradient(true, angles[2],
			"black", blackStops[2],
			"transparent", transparentStops[2],
			"black"
			) + ',' + 
		buildGradient(true,angles[3],
			buildRGBA(colors[0],alphas[0]),colorStops[0],
			buildRGBA(colors[1],alphas[1])
			) + ',' +
		buildGradient(true,angles[4],
			buildRGBA(colors[2],alphas[2]),colorStops[1],
			buildRGBA(colors[3],alphas[3])
			) + ',' +
		buildGradient(true,angles[5],
			buildRGBA(colors[4],alphas[4]),colorStops[2],
			buildRGBA(colors[5],alphas[5])
			);

	console.clear();
	console.log(bg);

	return bg;

// 	return 'repeating-linear-gradient(45deg,' +
// 		   'black 0px,' +
// 		   'black ' + edges[0] + 'px,' +
// 		   'transparent ' + edges[0] + 'px,' +
// 		   'transparent ' + edges[1] + 'px,' +
// 		   'black ' + edges[1] + 'px,' +
// 		   'black' +
// 		   '),' +
// 		   'repeating-linear-gradient(-45deg,' +
// 		   'black 0px,' +
// 		   'black ' + edges[2] + 'px,' +
// 		   'transparent ' + edges[2] + 'px,' +
// 		   'transparent ' + edges[3] + 'px,' +
// 		   'black ' + edges[3] + 'px,' +
// 		   'black' +
// 		   '),' +
// 		   'repeating-linear-gradient(90deg,' +
// 		   'black 0px,' +
// 		   'black ' + edges[4] + 'px,' +
// 		   'transparent ' + edges[4] + 'px,' +
// 		   'transparent ' + edges[5] + 'px,' +
// 		   'black ' + edges[5] + 'px,' +
// 		   'black' +
// 		   '),' +
// 			'repeating-linear-gradient(45deg,' +
// 			buildRGBA(colors[0],alphas[0]) + ' 0%,' +
// 			buildRGBA(colors[0],alphas[0]) + ' 50%,' +
// 			buildRGBA(colors[1],alphas[1]) + ' 50%,' +
// 			buildRGBA(colors[1],alphas[1]) + ' 100%' +
// 			'),' +
// 			'repeating-linear-gradient(-45deg,' +
// 			buildRGBA(colors[2],alphas[2]) + ' 0%,' +
// 			buildRGBA(colors[2],alphas[2]) + ' 50%,' +
// 			buildRGBA(colors[3],alphas[3]) + ' 50%,' +
// 			buildRGBA(colors[3],alphas[3]) + ' 100%' +
// 			'),' +
// 			'repeating-linear-gradient(90deg,' +
// 			colors[4] + ' 0%,' +
// 			colors[4] + ' 50%,' +
// 			colors[5] + ' 50%,' +
// 			colors[5] + ' 100%' +
// 			'),' +
// 			'black';
}


function buildGradient(repeating,angle){
	args = Array.prototype.slice.call(arguments,2);
	
	gradient = (repeating ? 'repeating-':'') + `linear-gradient(\n${angle}deg,\n`;

	width = 0;
	for(var index = 0; index < args.length; index+=2){

		var argColor, argWidth;

		argColor =args[index];

		if (index+1 <= args.length){
			argWidth =parseInt(args[index+1]);
		}

		gradient += `${argColor} ${width}px,\n${argColor}`;

		if (!isNaN(argWidth)){
			gradient += ` ${width += argWidth}px`;
		}

		gradient += `,\n`;


	}

	return gradient.replace(/,\s*$/, ")");;


}



function buildRGBA(hex,alphas){	
	return 'rgba(' + 
			parseInt(hex.slice(-3,-2),16)*17 + ',' +
			parseInt(hex.slice(-2,-1),16)*17 + ',' + 
			parseInt(hex.slice(-1),16)*17 + ',' +
			alphas + ')';
}