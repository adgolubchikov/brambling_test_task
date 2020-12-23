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
	table.setAttribute('class', 'mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp animated');
	let i;
	db = customSort();
	for (i=0;i<db.length;i++) {
		let tr = document.createElement('tr');
		tr.innerHTML = '<td><img width="30px" src="images/'+db[i].image+'.svg" /></td><td>'+
		db[i].name+'</td><td>'+db[i].age+i18n('years')+'</td><td>'+db[i].phone+'</td>'+
		(db[i].favourite ? '<td style="cursor:pointer;" onclick="dislike(this,'+db[i].id+')">&#9733;' : '<td style="cursor:pointer;" onclick="like(this,'+db[i].id+')">&#9734;')+'</td>';
		table.appendChild(tr);
	}
	
	document.querySelector('main').appendChild(table);
}

function renderPreview() {
	document.querySelector('main').innerHTML='';
	let preview = document.createElement('div');
	preview.setAttribute('class', 'animated');
	let i;
	db = customSort();
	for (i=0;i<db.length;i++) {
		preview.innerHTML+='<div class="preview"><table><tr><td width="10%"><img width="100%" src="images/'+db[i].image+'.svg" /></td>'+
		'<td width="80%">'+db[i].name+'</td>'+
		(db[i].favourite ? '<td width="10%" style="cursor:pointer;" onclick="dislike(this,'+db[i].id+')">&#9733;' : '<td width="10%" style="cursor:pointer;" onclick="like(this,'+db[i].id+')">&#9734;')+'</td>'+
		'</tr></table><div>'+db[i].age+i18n('years')+'</div><div>'+db[i].phone+'</div><div>'+db[i].phrase+'</div></div>';
		
		if (db[i].video !== undefined) {
			preview.innerHTML+='<div class="preview"><video src="videos/'+db[i].video+'.mp4" controls muted loop preload="none"></video></div>';
		}
	}
	
	document.querySelector('main').appendChild(preview);
	
	let vid = document.querySelectorAll('video');
	[].forEach.call(vid, function (item) {
		item.addEventListener('mouseover', hoverVideo, false);
		item.addEventListener('mouseout', hideVideo, false);
	});
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
	if (sortDirection == 'up') {
		if (sortBy == 'id') {
			return db.sort((a, b) => a.id - b.id);
		}
		if (sortBy == 'name') {
			return db.sort((a, b) => {
				if (a.name > b.name) return 1;
				if (a.name < b.name) return -1;
				return 0;
				});
		}
		if (sortBy == 'age') {
			return db.sort((a, b) => a.age - b.age);
		}
	}
	else {
		if (sortBy == 'id') {
			return db.sort((a, b) => b.id - a.id);
		}
		if (sortBy == 'name') {
			return db.sort((a, b) => {
				if (a.name < b.name) return 1;
				if (a.name > b.name) return -1;
				return 0;
				});
		}
		if (sortBy == 'age') {
			return db.sort((a, b) => b.age - a.age);
		}		
	}
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

function like(element, id) {
	element.innerHTML='&#9733;';
	element.setAttribute('onclick', 'dislike(this,'+id+')');
	db.filter(item => item.id == id)[0].favourite = true;
}

function dislike(element, id) {
	element.innerHTML='&#9734;';
	element.setAttribute('onclick', 'like(this,'+id+')');
	db.filter(item => item.id == id)[0].favourite = false;	
}

function hoverVideo(e) {   
    this.play();
}

function hideVideo(e) {
    this.pause();
}
