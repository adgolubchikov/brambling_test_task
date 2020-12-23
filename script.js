let db = [];
let view = document.querySelector('input[name=view]:checked').value;
let lang = document.querySelector('input[name=language]:checked').value;
let sortBy = document.querySelector('input[name=sortby]:checked').value;
let sortDirection = document.querySelector('input[name=direction]:checked').value;

fetch('http://localhost:8000/data.json').then(response => response.json()).then(data => {
	db=[...data];
	renderHeader();
	renderMain();
});

function renderTable() {
	document.querySelector('main').innerHTML='';
	let table = document.createElement('table');
	table.setAttribute('class', 'mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp');
	let i;
	db = customSort();
	for (i=0;i<db.length;i++) {
		let tr = document.createElement('tr');
		tr.innerHTML = '<td><img width="30px" src="images/'+db[i].image+'.svg" /></td><td>'+
		db[i].name+'</td><td>'+db[i].age+i18n('years')+'</td><td>'+
		db[i].phone+'</td><td>'+db[i].favourite+'</td>';
		table.appendChild(tr);
	}
	
	
	document.querySelector('main').appendChild(table);
}

function renderPreview() {
	
}

function renderHeader() {
	let keys = Object.keys(en);
	let i;
	for (i=0; i<keys.length;i++) {
		if (document.getElementById(keys[i]) != null) document.getElementById(keys[i]).innerHTML=i18n(keys[i]);
	}
}

function i18n(input) {
	if (lang == 'ru') {
		return ru[input];
	}
	else {
		return en[input];
	}
}

const ru = {
	sort: 'Сортировка',
	view: 'Вид',
	id: 'ID',
	name: 'Имя',
	age: 'Возраст',
	up: 'По возрастанию',
	down: 'По убыванию',
	table: 'Таблица',
	preview: 'Превью',
	years: ' лет'};
const en = {
	sort: 'Sort by',
	view: 'View',
	id: 'ID',
	name: 'Name',
	age: 'Age',
	up: 'Ascending',
	down: 'Descending',
	table: 'Table',
	preview: 'Preview',
	years: ' years'};

function customSort() {
	return db;
}

function renderMain() {
	if (view == 'table') {
		renderTable();
	}
	else {
		renderPreview();
	}
}

function setLanguage() {
	lang = document.querySelector('input[name=language]:checked').value;
	renderHeader();
	renderMain();
}

function setView() {
	view = document.querySelector('input[name=view]:checked').value;
	renderMain();
}

function setSortBy() {
	sortBy = document.querySelector('input[name=sortby]:checked').value;
	renderMain();
}

function setSortDirection() {
	sortDirection = document.querySelector('input[name=direction]:checked').value;
	renderMain();
}
