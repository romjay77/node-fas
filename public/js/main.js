var servicePosition, aboutPosition, projectPosition, contactPosition;
var postsWidth = 0;
$(document).ready(() => {
	$("a").on('click', function(event) {
		buttonEffect(this);
		if (this.hash === "") return;
		if (!this.hash) return;

		event.preventDefault();
		var hash = this.hash;
		
		let position = $(hash).offset().top;
		$('html, body').animate({		  
			scrollTop: position
		}, 800, () => {
			window.location.hash = hash;
		});
	});

	startCarousel();

	$('.point').click(it => updateCarousel(it.currentTarget.id.match(/\d/g).join('')));
	$('.active-point').click(() => restartCarousel());
		
	let carousel = document.getElementsByClassName('group');
	let tX = 0;
	let tY = 0;
	let teX = 0;
	let teY = 0;

	for(let it = 0; it < carousel.length; it++) {
		carousel[it].addEventListener('touchstart', event => {
		tX = event.changedTouches[0].screenX;
		tY = event.changedTouches[0].screenY;
		},  false);

		carousel[it].addEventListener('touchend', event => {
		teX = event.changedTouches[0].screenX;
		teY = event.changedTouches[0].screenY;
		handleGesureTwo(tX, tY, teX, teY);
		},  false);
	}

	$('.service > div').on('touchstart', setShadowEffect);
	$('.service > div').on('touchend', setShadowEffect);
	$('.service > div').hover(setShadowEffect, setShadowEffect);
	$('.project').on('touchstart', projectEffect);
	$('.project').on('touchend', projectEffect);
	$('.project').hover(projectEffect, projectEffect);

	servicePosition = $('#services').position();
	aboutPosition = $('#about').position();
	projectPosition = $('#projects').position();
	contactPosition = $('#contact').position();

	startCalculationPostsWidth(6);
});

$(window).on('scroll', e => {
	parralaxBackground();
	//scrollingOffers();	
	ancorsScrolling();
});

$('.form-btn > button').click(event => {
	$('.form-btn > button').addClass('shadow');
	setTimeout(() => { $('.form-btn > button').removeClass('shadow'); }, 400);
});

function buttonEffect(button) {
	if(!button.classList.contains('button')) return;

	$(button).addClass('shadow');
	setTimeout(() => { $(button).removeClass('shadow'); }, 400);
}

function startCalculationPostsWidth(attempt) {
	if (attempt === 0) return;

	let count = $('.feed > iframe').length;
	if(count === 0) {
		setTimeout(() => {
			startCalculationPostsWidth(attempt - 1);
		}, 500);
	} else {
		calculatePostsWidth(count);
	}
}

function calculatePostsWidth(count) {
	postsWidth = count * 10;
	$('.feed > iframe').each(function() {
		postsWidth += $(this).width();
	});

	$('.feed > iframe').css('left', `${postsWidth/2}px`);
}

function ancorsScrolling() {
	let scrolTop = $(window).scrollTop();
	let height = $(window).height();
	if (scrolTop + height > contactPosition.top) {
		setTitle(4);
	} else if (scrolTop + height > projectPosition.top) {
		setTitle(3);
	} else if(scrolTop + height > aboutPosition.top) {
		setTitle(2);
	} else if(scrolTop + height > servicePosition.top) {
		setTitle(1);
	} else {
		setTitle(0);
	}
}

function setTitle(number) {
	let title, desc, selector;

	switch (number) {
		case 4:
			title = model.title5;
			desc = model.description5;
			selector = '.item[href="#contact"]';
			break;
		case 3:
			title = model.title4;
			desc = model.description4;
			selector = '.item[href="#projects"]';
			break;
		case 2:
			title = model.title3;
			desc = model.description3;
			selector = '.item[href="#about"]';
			break;
		case 1:
			title = model.title2;
			desc = model.description2;
			selector = '.item[href="#services"]';
			break;	
		default:
			title = model.title1;
			desc = model.description1;
			selector = '.item[href="#start"]';
			break;
	}

	if(title === document.title) return;
	document.title = title;
	$('meta[name="description"]').attr("content", desc);
	$('.item').removeClass('active');
	$(selector).addClass('active');
}

function scrollingOffers() {
	let positionOffers = $('.offers').position();

	if(!positionOffers) return;
	
	let height = $(window).height() + $(window).scrollTop() - 150;
	if(positionOffers.top < height) {
		$('.offer div').addClass('opacity');
		$('.offer img').addClass('opacity');
		$('.offers .article').addClass('opacity');
	}
	else {
		$('.offer div').removeClass('opacity');
		$('.offer img').removeClass('opacity');
		$('.offers .article').removeClass('opacity');
	}	
}

function projectEffect(event) {
	setShadowEffect(event);

	let element = event.currentTarget;

	if ($(element.children[1]).attr('style') === 'opacity: 0.4;' && $(element.children[1]).attr('style') !== null) {
		$(element.children[1]).css('opacity', 1);
		$(element.children[0]).css('opacity', 0.6);
		$(element.children[1].children[0]).css('transform', 'scale(1)');
	} else {
		$(element.children[1]).css('opacity', 0.4);
		$(element.children[0]).css('opacity', 1);
		$(element.children[1].children[0]).css('transform', 'scale(1.3)');
	}
}

$('.question').click((event) => {
	$(event.currentTarget).toggleClass('show-answer');
});

$('.nav-menu .toggle, .fixed-menu .toggle').click(function() {
	toggle();
	$('div.nav-mobile').toggleClass('opened');
});

$('div.nav-mobile a').click(function() {
	toggle();
	$('div.nav-mobile').toggleClass('opened');
});

function toggle()
{
	toggleEffect('.nav-menu div.icon > a > div > span');
	toggleEffect('.fixed-menu div.icon > a > div > span');
}

function toggleEffect(selector)
{
	let array = $(selector).toArray();
	if(array[0].getAttribute('class').includes('Open'))
	{
		array[0].classList.remove('spanfirstOpen');
		array[1].classList.remove('spanmidleOpen');
		array[2].classList.remove('spanlastOpen');
		array[0].classList.add('spanfirstClose');
		array[1].classList.add('spanmidleClose');
		array[2].classList.add('spanlastClose');
	} else 	{
		array[0].classList.remove('spanfirstClose');
		array[1].classList.remove('spanmidleClose');
		array[2].classList.remove('spanlastClose');
		array[0].classList.add('spanfirstOpen');
		array[1].classList.add('spanmidleOpen');
		array[2].classList.add('spanlastOpen');
	}
}

(function ($) {
	"use strict";
	var input = $('.validate-input .input');
	$('.validate-form').on('submit',function(){
		var check = true;
		for(var i=0; i<input.length; i++) {
			if(validate(input[i]) == false){
				showValidate(input[i]);
				check=false;
			}
		}
		return check;
	});
	$('.validate-form .input').each(function(){
		$(this).focus(function(){
		   hideValidate(this);
		});
	});
	function validate (input) {
		if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
			if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
				return false;
			}
		}
		else {
			if($(input).val().trim() == ''){
				return false;
			}
		}
	}
	function showValidate(input) {
		var thisAlert = $(input).parent();

		$(thisAlert).addClass('alert-validate');
	}
	function hideValidate(input) {
		var thisAlert = $(input).parent();

		$(thisAlert).removeClass('alert-validate');
	}
})(jQuery);

var it = 0;
var isBreak = false;
var isPerfomed = 0;
var oneOffsetService = 0;
var oneOffsetPoint = 30;
var countOnWindow = 0;
var countOfPoint = 0;
var whatToShow = 0;

function startCarousel() {
	let service = $('.service');
	let width = $(window).width();
	countOnWindow = width <= 1050 ? (width <= 700 ? 1 : 2) : 3;
	countOfPoint = Math.ceil(service.length / countOnWindow);
	let isCarousel = service.length > countOnWindow;
	if(isCarousel) {
		for(let i = 0; i < countOfPoint; i++) {
			if (i === 0) {
				$('.points').append(`<div id = "p${i}" class="point active-point"><div></div></div>`);
			} else {
				$('.points').append(`<div id = "p${i}" class="point"><div></div></div>`);
			}
		}
		whatToShow = service.length - countOnWindow;
		setTimeout(stratCarousel, 5000, service, true);
	}
}

function stratCarousel(serv, ifPerf) {
	if(isBreak || !ifPerf) return;
	let rule = serv[0].attributes[1] === undefined ? 0 : serv[0].attributes[1].value.match(/\d/g).join('');

	if(whatToShow > 0) {
		let onDisplay = whatToShow <= countOnWindow ? whatToShow : countOnWindow;
		oneOffsetService = onDisplay * 100;
		let persent = parseInt(rule) + oneOffsetService;
		whatToShow = whatToShow - onDisplay;
		$(serv).css('transform', `translateX(-${persent}%)`);
		it = parseInt(it) + 1;
	} else {
		it = 0;
		$(serv).css('transform', 'translateX(0%)');
		whatToShow = serv.length - countOnWindow;
	}	
	setActivePoint();

	if(isBreak || !ifPerf) return;
	setTimeout(stratCarousel, 5000, serv, true);
}

function startCarouselOneThread(data, token) {
	setTimeout(() => { isBreak = false; stratCarousel(data, token === isPerfomed);}, 5000);
}

function restartCarousel() {
	isBreak = true;
	let token = Math.floor(Math.random() * 1001);
	isPerfomed = token;
	startCarouselOneThread($('.service'), token);
}

function updateCarousel(point) {
	let token = Math.floor(Math.random() * 1001);
	isPerfomed = token;
	isBreak = true;
	let service = $('.service');
	let interval = point - it;    

	if(interval > 0) {
		let rule = service[0].attributes[1] === undefined ? 0 : service[0].attributes[1].value.match(/\d/g).join('');
		let skipped = rule === 0 ? 0 : parseInt(rule)/ 100;
		let margin = (point * countOnWindow) - skipped;
		margin = margin <= whatToShow ? margin : whatToShow;
		whatToShow = whatToShow - margin;
		oneOffsetService = margin * 100;
		let persent = parseInt(rule) + oneOffsetService;
		$(service).css('transform', `translateX(-${persent}%)`);
		it = point;
		setActivePoint(point);
	} else if(interval < 0) {
		interval = interval * -1;
		let rule = service[0].attributes[1].value.match(/\d/g).join('');
		let margin = (parseInt(rule)/100) - (point * countOnWindow);
		whatToShow = whatToShow + margin;
		oneOffsetService = margin * 100;
		let persent = parseInt(rule) - oneOffsetService;
		$(service).css('transform', `translateX(-${persent}%)`);
		it = point;
		setActivePoint(point);
	} else {
		restartCarousel();
	}

	startCarouselOneThread(service, token);
}

function handleGesureTwo(tX, tY, teX, teY) {
	let oX = (tX - teX) < 1 ? (teX - tX) : (tX - teX);
	let oY = (tY - teY) < 1 ? (teY - tY) : (tY - teY);
	if(oX > oY) {
		if(teX < tX) {
			let num = it + 1 > countOfPoint - 1 ? 0 : it + 1;
			updateCarousel(num);
		} else {
			let num = it - 1 === -1 ? countOfPoint - 1 : it - 1;
			updateCarousel(num);
		}
	}
};

function setActivePoint(id) {
	if(!id) {
		id = it;
	}

	$('.point').removeClass('active-point');
	$(`#p${id}`).addClass('active-point');
}

function setShadowEffect(element) {
	$(element.currentTarget).toggleClass('shadow-effect');
}

$('.project').click((el) => {
	let name = el.currentTarget.children[1].id;
	
	var ifrm = document.createElement("iframe");
	ifrm.setAttribute('src', `ajaxGallery?i=${name}`);
	ifrm.style.width = '100%';
	ifrm.style.height = '100%';
	$('#frame').html(ifrm);
	$('#frame').addClass('frame-show');
	$('#root-frame-bckg').addClass('bckg-frame-show');
});

function parralaxBackground() {
	let scrolled = window.pageYOffset;
	let height = $(window).height();
	if(height -50 < scrolled) {
		swithMeny(true);
	} else {
		swithMeny(false);
	}
}

function swithMeny(on) {
	let has = $('.fixed-menu').hasClass('show-menu');
	if(on && !has) {
		$('.fixed-menu').addClass('show-menu');
	} else if(!on && has) {
		$('.fixed-menu').removeClass('show-menu');
	}
}