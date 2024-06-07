import navbar from "../components/navbar.js";

let nav = document.querySelector("#navbar");
nav.innerHTML = navbar();

/*   LLD

  1. fetch the data from server
  2. append data in the dom
  3. data should contain only caption and image

*/

const append = (posts) => {
	document.querySelector("#container").innerHTML = "";
	posts.forEach((el) => {
		let figure = document.createElement("figure");
		let image = document.createElement("img");
		let figCap = document.createElement("figcaption");

		image.src = el.image_url;
		figCap.innerText = el.caption;

		figure.append(image, figCap);
		document.querySelector("#container").append(figure);
	});
};

const getData = async () => {
	try {
		let response = await fetch(`https://myapp-833z.onrender.com/posts`);
		let data = await response.json();
		console.log(data);
		createButtons(data.length, 2);
	} catch (error) {
		console.log(error);
	}
};

getData();

const paginate = async (clicked_button, limit) => {
	try {
		let response = await fetch(
			`https://myapp-833z.onrender.com/posts?_page=${clicked_button}&_limit=${limit}_`
		);
		let data = await response.json();
		console.log(data);
		append(data);
	} catch (error) {
		console.log(error);
	}
};

paginate(1, 2);
let btn_div = document.querySelector("#page_div");

let createButtons = (data_length, limit) => {
	let num_of_buttons = Math.ceil(data_length / limit);

	for (let i = 1; i <= num_of_buttons; i++) {
		let btn = document.createElement("button");
		btn.id = i;
		btn.innerText = i;
		btn_div.append(btn);
		btn.onclick = () => {
			console.log(i);
			paginate(btn.id, 2);
		};
	}
	document.querySelector("footer").append(btn_div);
};
