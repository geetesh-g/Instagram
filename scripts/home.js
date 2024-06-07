import navbar from "../components/navbar.js";

let nav = document.querySelector("#navbar");
nav.innerHTML = navbar();

/*   LLD

  1. fetch the data from server
  2. append data in the dom
  3. data should contain only caption and image

*/

const updatePostId = async () => {
	try {
		// Fetch all posts
		let response = await fetch("https://instagram-3.onrender.com/posts");
		let posts = await response.json();

		// Find the post with an empty ID and update it
		for (let post of posts) {
			if (post.id === "") {
				await fetch(`https://instagram-3.onrender.com/posts/${post.id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ id: 1 }), // Assign a temporary ID
				});

				// Now delete the post with the temporary ID
				await fetch(`https://instagram-3.onrender.com/posts/1`, {
					method: "DELETE",
				});

				console.log("Post with empty ID updated and deleted successfully.");
				return;
			}
		}

		console.log("No post with an empty ID found.");
	} catch (error) {
		console.error("Error updating and deleting post:", error);
	}
};

updatePostId();

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

const paginated = async (clicked_button, limit) => {
	try {
		let response = await fetch(
			`https://instagram-3.onrender.com/posts?_page=${clicked_button}&_per_page=${limit}_`
		);
		let data = await response.json();
		console.log(data);
		append(data);
	} catch (error) {
		console.log(error);
	}
};

paginated(1, 2);

let createButtons = (data_length, limit) => {
	let num_of_buttons = Math.ceil(data_length / limit);
	let page = document.createElement("p");
	page.innerText = "Pages >";
	let btn_div = document.createElement("div");
	for (let i = 1; i <= num_of_buttons; i++) {
		let btn = document.createElement("button");
		btn.innerText = i;
		btn_div.setAttribute("id", "page_div");
		btn_div.append(btn);
		btn.onclick = () => {
			paginated(i, 2);
		};
	}
	document.querySelector("#container").append(page, btn_div);
};

const getData = async () => {
	try {
		let response = await fetch(
			`https://instagram-3.onrender.com/posts?_start=0&_limit=10_`
		);
		let data = await response.json();
		console.log(data);
		createButtons(data.length, 2);
	} catch (error) {
		console.log(error);
	}
};

getData();
