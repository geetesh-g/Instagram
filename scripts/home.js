import navbar from "../components/navbar.js";

let nav = document.querySelector("#navbar");
nav.innerHTML = navbar();

/*   LLD

  1. fetch the data ffarom server
  2. append data in the dom
  3. data should contain only caption and image

*/

const getData = async () => {
	try {
		let response = await fetch(`http://localhost:3000/posts?_start=1&_end=8`);
		let data = await response.json();
		console.log(data);
		append(data);
	} catch (error) {
		console.log(error);
	}
};

const append = (posts) => {
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

getData();
