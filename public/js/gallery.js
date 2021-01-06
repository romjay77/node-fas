$('.close').click(() => closeFrame());
$('.arrow-right').click(() => transformRightAdv());
$('.arrow-left').click(() => transformLeftAdv());
var arrayImg = $('body > div.box > img').toArray();

function closeFrame() {
	let parent = window.parent
	parent.$('#root-frame-bckg').removeClass('bckg-frame-show');
	parent.$('#frame').removeClass('frame-show').html('');
}

$(document).ready(function() {
	addactive(0);
	document.body.addEventListener("touchstart", touchstartEvent);
	document.body.addEventListener("touchend", touchsendEvent);
	function touchstartEvent (ev) {
		touchstartProject(ev);
	}
	function touchsendEvent (ev) {
		touchendProject(ev);
	}
});

function touchstartProject(event) {
let target = checkTarget(event.target, arrayImg);
	if(target !== undefined) {
		tX = event.changedTouches[0].screenX;
		tY = event.changedTouches[0].screenY;
	}
}
function touchendProject(event) {
	let target = checkTarget(event.target, arrayImg);
	if(target !== undefined) {
		teX = event.changedTouches[0].screenX;
		teY = event.changedTouches[0].screenY;
		handleGesure(tX, tY, teX, teY);
	}
}

function transformRightAdv() {
	let img = $('.active_img');
	for(let i = 0; i < arrayImg.length; i++) {
		if(img[0] === arrayImg[i]) {
			$(img).removeClass('active_img');
			let index = i + 1 >= arrayImg.length ? 0 : i + 1;
			addactive(index);
			break;
		}
	}
}

function transformLeftAdv() {
	let img = $('.active_img');
	for(let i = 0; i < arrayImg.length; i++) {
		if(img[0] === arrayImg[i]) {
			$(img).removeClass('active_img');
			let index = i - 1 < 0 ? arrayImg.length - 1 : i - 1;
			addactive(index);
			break;
		}
	}
}

function handleGesure(tX, tY, teX, teY) {
	let oX = (tX - teX) < 1 ? (teX - tX) : (tX - teX);
	let oY = (tY - teY) < 1 ? (teY - tY) : (tY - teY);
	if(oX > oY) {
		if(teX < tX) {
			transformRightAdv();
		}
		else {
			transformLeftAdv();
		}
	}
}

function checkTarget(target, array) {
	let isRoot = true;
	let ret;
	let result = [];
	result.push(target);
	while(result.length !== 0 && isRoot) {
		let it = result.pop();
		if (smallCheck(it, array)) {
			return it;
		}
		else {
			isRoot = it.parentElement !== null;
			if (isRoot) {
				result.push(it.parentElement)
			}
		}
	}
	return ret;
}

function smallCheck(target, array) {
	return array.includes(target);
}

function addactive(i) { 
	$(arrayImg[i]).addClass('active_img');

	setSrc(i-1);
	setSrc(i);
	setSrc(i+1);

	setTimeout(() => {
		checkImg(arrayImg[i]);
	}, 100);
}

function setSrc(i) {
	let index = i < 0 ? arrayImg.length -1 : 
		i >= arrayImg.length ? arrayImg.length -1 : i;
	if(!$(arrayImg[index]).attr('src')) {
		$(arrayImg[index]).attr('src', $(arrayImg[index]).data('src'));
	}
}

function checkImg(img) {
	if (img.height > img.width) {
		$(img).css('width', 'auto');
		$(img).css('height', '100%');
	}
	else {
		img.removeAttribute('style');
	}
}