var particules = function()
{
	var stockParticules = [];

	var params = {
		inApp: true,
		particule: {
			fall: 'bottom',
			console: false,
			sequenceMove: 8, //ms
			sequenceAdd: 500, //ms

						
			trace: false,
			totalParticule: 100,
			maxParticulePerFrame: 2,
			

			/*
			trace: true,
			totalParticule: 1,
			maxParticulePerFrame: 1,
			*/

			className: ['particule'],
			classSizeName: ['xs', 'xm', 'xl'],
			classLightName: ['light', 'medium', 'strong'],
			timeBeforeKill: 30000, //ms
			trajectory: {
				time: 1000, //ms
				//maxY: ($(document).height() / 100) * 25,
				//minY: ($(document).height() / 100) * 15,
				//maxX: ($(document).width() / 100) * 10,
				//minX: ($(document).width() / 100) * 2,
				degrees: 35,
			}
		},
	}

	//
	var getUnite = function(val)
	{
		var size = 1;
		while ((size = size * 10) < val);
		return size;
	}

	//
	var getRandom = function(val)
	{
		return Math.floor(Math.random() * getUnite(val)) % val;
	}

	/*
		Calculer les trajectoires
	*/
	//
	var getTrajectory = function(particule)
	{
		if (particule.trajectory == null || particule.trajectory.y.end <= particule.up)
		{
			//
			particule.trajectory = {
				typeDirection: ((getRandom(2) == 1) ? (true) : (false)),
				moveParticule: 0,
				degree: 90,
				x: {
					degree:{

					},
				},
				y: {
					degree:{

					},
				}
			};

			// Degrees
			particule.trajectory.x.degree.degreeDiff = particule.trajectory.degree - params.particule.trajectory.degrees;
			particule.trajectory.x.degree.degreeRect = (params.particule.sequenceMove * particule.trajectory.x.degree.degreeDiff) / params.particule.trajectory.time;
			
			// Degrees
			particule.trajectory.y.degree.degreeDiff = params.particule.trajectory.degrees - particule.trajectory.degree;
			particule.trajectory.y.degree.degreeRect = (params.particule.sequenceMove * particule.trajectory.y.degree.degreeDiff) / params.particule.trajectory.time;
			
			// X
			//particule.trajectory.x.start = particule.left;
			//particule.trajectory.x.end = particule.trajectory.x.start + (getRandom(params.particule.trajectory.maxX - params.particule.trajectory.minX) + params.particule.trajectory.minX);
			//particule.trajectory.x.mid = (particule.trajectory.x.end - particule.trajectory.x.start) / 2;
			//particule.trajectory.x.move = (params.particule.sequenceMove * particule.trajectory.x.mid) / params.particule.trajectory.time;

			// Y
			particule.trajectory.y.start = particule.up;
			particule.trajectory.y.end = particule.trajectory.y.start + (getRandom(params.particule.trajectory.maxY - params.particule.trajectory.minY) + params.particule.trajectory.minY);
			particule.trajectory.y.mid = (particule.trajectory.y.end - particule.trajectory.y.start) / 2;
			particule.trajectory.y.move = (params.particule.sequenceMove * particule.trajectory.y.mid) / params.particule.trajectory.time;
		}

		// Rectification x
		particule.trajectory.x.degree.degreeActu = params.particule.trajectory.degrees + (particule.trajectory.x.degree.degreeRect * particule.trajectory.moveParticule);
		particule.trajectory.x.degree.degreePourc = (particule.trajectory.x.degree.degreeActu * 100) / particule.trajectory.degree;

		// Rectification y
		particule.trajectory.y.degree.degreeActu = params.particule.trajectory.degrees + (particule.trajectory.y.degree.degreeRect * particule.trajectory.moveParticule);
		particule.trajectory.y.degree.degreePourc = (particule.trajectory.y.degree.degreeActu * 100) / particule.trajectory.degree;

		// Calcule trajectoire x et y
		//particule.trajectory.x.moveActu = particule.trajectory.x.move - ((particule.trajectory.x.degree.degreePourc * particule.trajectory.x.move) / 100); //-
		particule.trajectory.x.moveActu = particule.trajectory.y.move - ((particule.trajectory.x.degree.degreePourc * particule.trajectory.y.move) / 100); //-
		particule.trajectory.y.moveActu = particule.trajectory.y.move - ((particule.trajectory.y.degree.degreePourc * particule.trajectory.y.move) / 100); //-

		//
		particule.trajectory.moveParticule = particule.trajectory.moveParticule + 1;

		/*
		if (particule.id == 0) {
			console.log('-----------');
			console.log('Type direction: '+particule.trajectory.typeDirection);
			console.log('Move particule: '+particule.count);
			console.log('Height: '+(particule.trajectory.x.end - particule.trajectory.x.start));
			console.log('Degree rect X: '+particule.trajectory.x.degree.degreeRect);
			console.log('Degree rect Y: '+particule.trajectory.y.degree.degreeRect);
			console.log('Degree actu X: '+particule.trajectory.x.degree.degreeActu);
			console.log('Degree actu Y: '+particule.trajectory.y.degree.degreeActu);
			console.log('Degree pourc X: '+particule.trajectory.x.degree.degreePourc);
			console.log('Degree pourc Y: '+particule.trajectory.y.degree.degreePourc);
			console.log('Move X: '+particule.trajectory.x.moveActu);
			console.log('Move Y: '+particule.trajectory.y.moveActu);
			console.log('-----------');
		}
		*/

		/*
			x et y inversé !! ne pas oublié
		*/
		return {
			up: particule.up + particule.trajectory.y.moveActu,
			left: ((particule.trajectory.typeDirection == true) ? (particule.left + particule.trajectory.x.moveActu) : (particule.left - particule.trajectory.x.moveActu)),
			trajectory: particule.trajectory,
		};
	}

	var run = function(addParams)
	{
		$(document).ready(function()
		{
			//
			params.particule.trajectory.maxY = ($(document).height() / 100) * 25;
			params.particule.trajectory.minY = ($(document).height() / 100) * 15;
			params.particule.trajectory.maxX = ($(document).width() / 100) * 10;
			params.particule.trajectory.minX = ($(document).width() / 100) * 2;

			//
			if (typeof(addParams) != 'undefined') {
				params.particule = $.extend({}, params.particule, addParams);
			}

			//
			setInterval(function() {
				console.log(stockParticules.length);
				if (params.inApp == false || params.particule.totalParticule <= stockParticules.length) {
					return ;
				}
				for (var i = 0; i < params.particule.maxParticulePerFrame; i++)
				{
					stockParticules.push({
						id: stockParticules.length,
						count: 0,
						up: 0,
						left: getRandom($(document).width() - 1),
						opacity: 1,
						tajectory: null,
						elem: document.createElement('div'),
					});
					$(stockParticules[stockParticules.length - 1].elem)
						.addClass(params.particule.className[getRandom(params.particule.className.length)])
						.addClass(params.particule.classSizeName[getRandom(params.particule.classSizeName.length)])
						.addClass(params.particule.classLightName[getRandom(params.particule.classLightName.length)])
						.css({
							position: 'absolute',
							bottom: 0,
							left: stockParticules[stockParticules.length - 1].left+'px',
						})
					;
					document.body.appendChild(stockParticules[stockParticules.length - 1].elem);
				}
			}, params.particule.sequenceAdd);

			//
			setInterval(function() {
				var trajectory;
				var tmp = [];
				if (params.inApp == false) {
					return ;
				}
				for (var i = 0; i < stockParticules.length; i++) {
					if (stockParticules[i].elem != null)
					{
						//
						if (params.particule.trace == true) {
							var a = document.createElement('div');
							var b = $(stockParticules[i].elem);
							$(a).addClass('particule').addClass('xs').css({
								position: 'absolute',
								bottom: b.css('bottom'),
								left: b.css('left'),
							});
							document.body.appendChild(a);				
						}

						//
						infosTranjectory = getTrajectory(stockParticules[i]);
						stockParticules[i].left = infosTranjectory.left;
						stockParticules[i].up = infosTranjectory.up;
						stockParticules[i].trajectory = infosTranjectory.trajectory;
						stockParticules[i].opacity = ((stockParticules[i].up >= $(document).height() / 2) ? (stockParticules[i].opacity - ((getRandom(2) + 1) / 1000)) : (stockParticules[i].opacity));

						//
						var css = {};
						switch (params.particule.fall)
						{
							case ('top'):
								css.top = stockParticules[i].up+'px';
								css.left = stockParticules[i].left+'px';
							break;
							case ('left'):
								css.left = stockParticules[i].up+'px';
								css.bottom = stockParticules[i].left+'px';
							break;
							case ('right'):
								css.right = stockParticules[i].up+'px';
								css.bottom = stockParticules[i].left+'px';
							break;
							default:
								css.bottom = stockParticules[i].up+'px';
								css.left = stockParticules[i].left+'px';
						}
						$(stockParticules[i].elem).css($.extend({}, {opacity: stockParticules[i].opacity}, css));

						//
						if (stockParticules[i].opacity <= 0 || stockParticules[i].count * params.particule.sequenceMove >= params.particule.timeBeforeKill) {
							$(stockParticules[i].elem).remove();
						} else {
							stockParticules[i].id = i;
							stockParticules[i].count = stockParticules[i].count + 1;
							tmp.push(stockParticules[i]);
						}
					}
				}
				stockParticules = tmp;
				if (params.particule.console == true) {
					console.log(stockParticules.length);
				}
			}, params.particule.sequenceMove);
		});

	}

	//
	$(window).focus(function() {
		params.inApp = true;
	});

	//
	$(window).blur(function() {
		params.inApp = false;
	});

	//
	return {
		run:run,
	}
}
