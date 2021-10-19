function copy_text(text){
    console.log(text);
    navigator.clipboard.writeText(text);
}

const $main = document.querySelector('#project_cards');

let data;

function bindItem(item) {
	/* Creating a new div element */
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
	
	/* Adding the card to the main element */
	$main.appendChild(div);
}


async function fetchData(){
	
	const response = await fetch('http://yencis.github.io/project_cards.json')
	
	const json = await response.json()
	console.log(json);
	data = json;
	bindData(data)
}

function bindData(data) {
	
	/* Clearing out the contents in the main section */
	$main.innerHTML = '';
	
	/* Looping through each card and binding it to html */
	data.forEach(bindItem);

}
console.log("run");
fetchData();