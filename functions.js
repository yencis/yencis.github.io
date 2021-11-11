function copy_text(text){
    console.log(text);
    navigator.clipboard.writeText(text);
}

const $main = document.querySelector('#project_cards');
const text_input = document.getElementById("search");
let project_cards;
let data;
let tags_set;
let tags_dict;

function bindItem(item) {
	/* Creating a new div element */
	const link = document.createElement('a');
	const div = document.createElement('div');
	div.style.cssText = "background-image:url("+item.images+")"
	div.classList.add("project_card")

	/* Injecting data into the template of our card */
	const card = `
			<div class="grey-box"></div>
			<h3>${item.name}</h3>
			<h4>${item.description}</h4>
			`;
		
	/* Injecting the template into our div*/
	div.innerHTML = card;
	link.appendChild(div);
	link.href = item.url;
	/* Adding the card to the main element */
	$main.appendChild(link);
}


async function fetchData(){
	
	const response = await fetch('https://yencis.github.io/project_cards.json')
	const json = await response.json()
	console.log(json);
	data = json;
	project_cards = [];
	let tags = [];
	tags_dict = {};
	for (e of data){
		project_cards.push(e.name)
		//console.log(e.tags);
		tags = tags.concat(e.tags);
		for (t of e.tags){
			tags_dict[t] = (tags_dict[t])?tags_dict[t].concat(e):[e];
		}
	}
	//console.log(tags);
	tags_set = new Set(tags);
	//project_cards = data.map((e) => {e.name});
	//console.log(data[0].name);
//	console.log(project_cards);
	bindData(data)
}

function bindData(data) {
	
	/* Clearing out the contents in the main section */
	$main.innerHTML = '';
	
	/* Looping through each card and binding it to html */
	data.forEach(bindItem);

}
/*
function search_with_query_2(){
	console.log(text_input);
	var value = text_input.value;
	if (value==""){
		bindData(data);
		return;
	}
	//var stuff = ["jeff","epstein","jeffrey"]
	var results = fuzzysort.go(value,project_cards)
	var targets = [];
	results.forEach(element => targets.push(element.target));
	console.log("results "+targets);
	var new_cards = [];
	for (card of data){
		console.log("card "+card.name);
		if (targets.includes(card.name)){
			new_cards.push(card);
		}
	}
	console.log("new_cards "+new_cards);
	bindData(new_cards);
}
*/
function search_with_query(){
	let value = text_input.value;
	let targets = [...fuzzysort.go(value, project_cards).map(e=>e.target)];
	// converts to set to get rid of duplicates
	(value)?bindData([...new Set([...data.filter(e=>targets.includes(e.name)),...get_tags(value)])]):bindData(data);
}

function get_tags(tag_value){
	
	let targets = [...fuzzysort.go(tag_value, [...tags_set])]
	bind_this = [];
	for (t of targets){
		bind_this = bind_this.concat(tags_dict[t.target]);
	}
	res = [...fuzzysort.go(tag_value, [...tags_set])].map(t=>tags_dict[t.target])[0]
	console.log("res");
	console.log(res);
	return res;
	
	
	//return res
}

function search_with_tags(tag_value){
	bindData(get_tags(tag_value));
}

function clear_query(){
	bindData(data);
}

console.log("run");
fetchData();
