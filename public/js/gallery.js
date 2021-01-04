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
	addactive();
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
			$(img).removeAttr('src');
			let trgt = arrayImg[i + 1] === undefined ? arrayImg[0] : arrayImg[i + 1];
			$(trgt).addClass('active_img');
			$(trgt).attr('src', $(trgt).data('src'));
			setTimeout(() => {
				checkImg(trgt);
			}, 100);
			break;
		}
	}
}

function transformLeftAdv() {
	let img = $('.active_img');
	for(let i = 0; i < arrayImg.length; i++) {
		if(img[0] === arrayImg[i]) {
			$(img).removeClass('active_img');
			$(img).removeAttr('src');
			let trgt = arrayImg[i - 1] === undefined ? arrayImg[arrayImg.length - 1] : arrayImg[i - 1];
			$(trgt).addClass('active_img');
			$(trgt).attr('src', $(trgt).data('src'));
			setTimeout(() => {
				checkImg(trgt);
			}, 100);		
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

function addactive() { 
	$(arrayImg[0]).addClass('active_img');
	$(arrayImg[0]).attr('src', $(arrayImg[0]).data('src'));
	setTimeout(() => {
		checkImg(arrayImg[0]);
	}, 100);
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