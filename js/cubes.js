var alpha = [0,0,0,0];
var colors = ["","","","","",""];
var edges = [0,0,0,0,0,0];
var angles = [0,0,0,0,0,0]

$(function(){
    $('.control-wrapper').hover(
        function(){
            $(this).stop(true).animate({opacity:1});
            $(this).queue(function(){
                $(this).animate({opacity:1});
                $(this).dequeue();
            });
        },
        function(){
            $(this).stop(true).queue(function(){
                $(this).animate({opacity:0});
                $(this).dequeue();
            });
        }
    );
	
	$('.opacity .control').on('input',function(){
		
		var value = $(this).val();
		alpha[$(this).parent().index()] = value / 100;
		$('#cubes').css("background",buildBackground());
	
		var leftValue = (value*1.3 + 15) - Math.floor((value*1) / $(this).width() * 2)*50;
		$(this).next('span').css({left: leftValue + 'px'}).text(value);
	});
	
	
	$('.color .control').on('input',function(){
		colors[$(this).parent().index()] = $(this).val();
		$('#cubes').css("background",buildBackground());
	});
	
	$('.edges .control').on('input',function(){
		var value = $(this).val();
		edges[$(this).parent().index()] = value;
		$('#cubes').css("background",buildBackground());
	
		var leftValue = (value*1.3 + 15) - Math.floor((value*1) / $(this).width() * 2)*50;
		$(this).next('span').css({left: leftValue + 'px'}).text(value);
	});
	
	
	$('.control').trigger('input');
});


function buildBackground(){
	return 'repeating-linear-gradient(45deg,' +
		   'black 0%,' +
		   'black ' + edges[0] + '%,' +
		   'transparent ' + edges[0] + '%,' +
		   'transparent ' + edges[1] + '%,' +
		   'black ' + edges[1] + '%,' +
		   'black 100%' +
		   '),' +
		   'repeating-linear-gradient(-45deg,' +
		   'black 0%,' +
		   'black ' + edges[2] + '%,' +
		   'transparent ' + edges[2] + '%,' +
		   'transparent ' + edges[3] + '%,' +
		   'black ' + edges[3] + '%,' +
		   'black 100%' +
		   '),' +
		   'repeating-linear-gradient(90deg,' +
		   'black 0%,' +
		   'black ' + edges[4] + '%,' +
		   'transparent ' + edges[4] + '%,' +
		   'transparent ' + edges[5] + '%,' +
		   'black ' + edges[5] + '%,' +
		   'black 100%' +
		   '),' +
			'repeating-linear-gradient(45deg,' +
			buildRGBA(colors[0],alpha[0]) + ' 0%,' +
			buildRGBA(colors[0],alpha[0]) + ' 50%,' +
			buildRGBA(colors[1],alpha[1]) + ' 50%,' +
			buildRGBA(colors[1],alpha[1]) + ' 100%' +
			'),' +
			'repeating-linear-gradient(-45deg,' +
			buildRGBA(colors[2],alpha[2]) + ' 0%,' +
			buildRGBA(colors[2],alpha[2]) + ' 50%,' +
			buildRGBA(colors[3],alpha[3]) + ' 50%,' +
			buildRGBA(colors[3],alpha[3]) + ' 100%' +
			'),' +
			'repeating-linear-gradient(90deg,' +
			colors[4] + ' 0%,' +
			colors[4] + ' 50%,' +
			colors[5] + ' 50%,' +
			colors[5] + ' 100%' +
			'),' +
			'black';
}

function buildRGBA(hex,alpha){	
	return 'rgba(' + 
			parseInt(hex.slice(-3,-2),16)*17 + ',' +
			parseInt(hex.slice(-2,-1),16)*17 + ',' + 
			parseInt(hex.slice(-1),16)*17 + ',' +
			alpha + ')';
}