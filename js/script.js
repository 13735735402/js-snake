var data = {
	snake:[[0,0]],				//蛇身
	score:0,					//得分
	t:0,						//top值 蛇头
	l:0,						//left值 蛇头
	timer:'',
	timerR:'',
	timerL:'',
	timerU:'',
	timerD:'',
	type:true,
	typeR:false,
	typeL:false,
	typeU:false,
	typeD:false,
	direction:'x',
	rantop:0,
	ranleft:0
};

function begin(){
	if(data.type){
		$('.begin').css('opacity','0');
		data.t = 0;
		data.l = 0;
		data.score = 0;
		data.type = false;
		data.typeU = true;
		data.typeD = true;
		$(".gameover").hide();
		$(".score").html('score: <strong>'+data.score+'</strong> 分');
		data.timer = setInterval(function(){
			if(data.l>440){
				$(".gameover").show();
				clearInterval(data.timer);
				$('.container').children('.body').remove();
				$('.begin').css('opacity','1');
				data.snake = [[0,0]];
				data.score = 0;
				data.t = 0;
				data.l = 0;
				data.type = true;
				data.typeR = false;
				data.typeL = false;
				data.typeU = false;
				data.typeD = false;
				data.direction = 'x';
			}else{
				moveR();
			}
		},25);
	}
}

function turnRight(){
	if(data.typeR && data.direction != 'x'){
		clearInterval(data.timer);
		clearInterval(data.timerL);
		clearInterval(data.timerU);
		clearInterval(data.timerD);
		data.typeR = false;
		data.typeL = true;
		data.typeU = true;
		data.typeD = true;
		data.direction = 'x';
		data.timerR = setInterval(function(){
			if(data.l>440){
				$(".gameover").show();
				clearInterval(data.timerR);
				$('.container').children('.body').remove();
				$('.begin').css('opacity','1');
				data.snake = [[0,0]];
				data.count = 0;
				data.t = 0;
				data.l = 0;
				data.type = true;
				data.typeR = false;
				data.typeL = false;
				data.typeU = false;
				data.typeD = false;
				data.direction = 'x';
			}else{
				moveR();
			}
		},25);
	}
}

function turnLeft(){
	if(data.typeL && data.direction != 'x'){
		clearInterval(data.timer);
		clearInterval(data.timerR);
		clearInterval(data.timerU);
		clearInterval(data.timerD);
		data.typeL = false;
		data.typeR = true;
		data.typeU = true;
		data.typeD = true;
		data.direction = 'x';
		data.timerL = setInterval(function(){
			if(data.l<0){
				$(".gameover").show();
				clearInterval(data.timerL);
				$('.container').children('.body').remove();
				$('.begin').css('opacity','1');
				data.snake = [[0,0]];
				data.count = 0;
				data.t = 0;
				data.l = 0;
				data.type = true;
				data.typeR = false;
				data.typeL = false;
				data.typeU = false;
				data.typeD = false;
				data.direction = 'x';
			}else{
				moveL();
			}
		},25);
	}
}

function turnUp(){
	if(data.typeU && data.direction == 'x'){
		clearInterval(data.timer);
		clearInterval(data.timerR);
		clearInterval(data.timerL);
		clearInterval(data.timerD);
		data.typeU = false;
		data.typeR = true;
		data.typeL = true;
		data.typeD = true;
		data.direction = 'y';
		data.timerU = setInterval(function(){
			if(data.t<0){
				$(".gameover").show();
				clearInterval(data.timerU);
				$('.container').children('.body').remove();
				$('.begin').css('opacity','1');
				data.snake = [[0,0]];
				data.count = 0;
				data.t = 0;
				data.l = 0;
				data.type = true;
				data.typeR = false;
				data.typeL = false;
				data.typeU = false;
				data.typeD = false;
				data.direction = 'x';
			}else{
				moveU();
			}
		},25);
	}
}

function turnDown(){
	if(data.typeD && data.direction == 'x'){
		clearInterval(data.timer);
		clearInterval(data.timerR);
		clearInterval(data.timerL);
		clearInterval(data.timerU);
		data.typeD = false;
		data.typeR = true;
		data.typeL = true;
		data.typeU = true;
		data.direction = 'y';
		data.timerD = setInterval(function(){
			if(data.t > 570){
				$(".gameover").show();
				clearInterval(data.timerD);
				$('.container').children('.body').remove();
				$('.begin').css('opacity','1');
				data.snake = [[0,0]];
				data.count = 0;
				data.t = 0;
				data.l = 0;
				data.type = true;
				data.typeR = false;
				data.typeL = false;
				data.typeU = false;
				data.typeD = false;
				data.direction = 'x';
			}else{
				moveD();
			}
		},25);
	}
}
//键盘监听事件
$("#page").keydown(function(e){
	if(e.keyCode==37){
		/*左*/
		turnLeft();
	}
	if(e.keyCode==38){
		/*上*/
		turnUp();
	}
	if(e.keyCode==39){
		/*右*/
		turnRight();
	}
	if(e.keyCode==40){
		/*下*/
		turnDown();
	}
});

function randomDiv(){
	var randomDIV = $('<div class="randomDIV"></div>');
	$('.container').append(randomDIV);
	data.rantop = Math.random()*570;
	data.ranleft = Math.random()*440;
	$('.randomDIV').css({
		'top':data.rantop+'px',
		'left':data.ranleft+'px'
	});
}

function moveR(){
	update();
	$(".head").css({"-webkit-transform":"rotate(0deg)"});
	data.l += 5;
	var end = data.snake.pop();
	data.snake.unshift([data.t,data.l]);
	if(data.t>data.rantop-20 && 
		data.t<data.rantop+20 && 
		data.l>data.ranleft-20 && 
		data.l<data.ranleft+20){
		randomDiv();
		data.score += 100;
		data.snake.push(end);
		$(".score").html('score: <strong>'+data.score+'</strong> 分');
	}
}

function moveL(){
	update();
	$(".head").css({"-webkit-transform":"rotate(-180deg)"});
	data.l -= 5;
	var end = data.snake.pop();
	data.snake.unshift([data.t,data.l]);
	if(data.t>data.rantop-20 && 
		data.t<data.rantop+20 && 
		data.l>data.ranleft-20 && 
		data.l<data.ranleft+20){
		randomDiv();
		data.score += 100;
		data.snake.push(end);
		$(".score").html('score: <strong>'+data.score+'</strong> 分');
	}
}

function moveU(){
	update();
	$(".head").css({"-webkit-transform":"rotate(-90deg)"});
	data.t -= 5;
	var end = data.snake.pop();
	data.snake.unshift([data.t,data.l]);
	if(data.t>data.rantop-20 && 
		data.t<data.rantop+20 && 
		data.l>data.ranleft-20 && 
		data.l<data.ranleft+20){
		randomDiv();
		data.score += 100;
		data.snake.push(end);
		$(".score").html('score: <strong>'+data.score+'</strong> 分');
	}
}

function moveD(){
	update();
	$(".head").css({"-webkit-transform":"rotate(90deg)"});
	data.t += 5;
	var end = data.snake.pop();
	data.snake.unshift([data.t,data.l]);
	if(data.t>data.rantop-20 && 
		data.t<data.rantop+20 && 
		data.l>data.ranleft-20 && 
		data.l<data.ranleft+20){
		randomDiv();
		data.score += 100;
		data.snake.push(end);
		$(".score").html('score: <strong>'+data.score+'</strong> 分');
	}
}

function update(){
	$('.container').children('.body').remove();
	for(var i = 0;i<data.snake.length;i++){
		if(i == 0){
			var snakebody = $('<div class="body head"><img src="./img/1.png"/></div>');
			snakebody.css({
				'top':data.snake[i][0]+'px',
				'left':data.snake[i][1]+'px',
				'zIndex':"2"
			});
			$('.container').append(snakebody);
		}else{
			var snakebody = $('<div class="body"></div>');
			snakebody.css({
				'top':data.snake[i][0]+'px',
				'left':data.snake[i][1]+'px'
			});
			$('.container').append(snakebody);
		}
		
	}
}

randomDiv();
$(".score").html('score: <strong>'+data.score+'</strong> 分');