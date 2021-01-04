$('.edit').click((el) => {
	let td = el.currentTarget.parentElement.previousElementSibling;
	$(td.lastChild).removeClass('hid');
	$(td.firstChild).addClass('hid');
});

var isDisabled = true;

$('#credentials').on('input', () => {
	if(isDisabled) {
		isDisabled = false;
		activeSubmit();
	}
});

$('#add-mail > td > a').click(() => {
	let = htnl =`<tr><td>Почта администратора для рассылки</td><td><input class="form-control col" type="text"
		name="mail"></td><td><a class="remove btn btn-outline-danger">Удалить</a></td></tr>`;		
	$('#add-mail').before(htnl);
});

$('table').on('click', (el) => {
	if(el.target.classList.contains('remove')) {
		$(el.target.parentElement.parentElement).remove();
		if(isDisabled) {
			isDisabled = false;
			activeSubmit();
		}
	};
});

function activeSubmit() {
	$('#home form input[type="submit"]')
		.removeAttr('disabled')
		.removeClass('btn-outline-secondary')
		.addClass('btn-outline-success');
}

$('#project > div > button:nth-child(1)').click((el) => {
	$('#addProj').removeClass('hid');
	$(el.currentTarget).addClass('hid');
});


$('#services .add').click((el) => {
	$('#services form[action="/admin/addService"]').removeClass('d-none');
	$(el.currentTarget).addClass('d-none');
});

$('#faq .add').click((el) => {
	$('#faq form[action="/admin/addQestion"]').removeClass('d-none');
	$(el.currentTarget).addClass('d-none');
});

$('#advantages .add').click((el) => {
	$('#advantages form[action="/admin/addAdvantage"]').removeClass('d-none');
	$(el.currentTarget).addClass('d-none');
});