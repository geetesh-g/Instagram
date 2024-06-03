import navbar from "../components/navbar.js";
document.querySelector("#navbar").innerHTML = navbar();

// lets make a quick LLD of the problem

/* 

  1. We need an image 
  2. We need caption from user
  3. after taking all that things we have to send it to server 
  4. lets do a quick try
   
*/

// first of all we  have to convert the local url to  global
// for that we need to send it imgbb server

let image_url;

const createImg = () => {
	handleImg();
};
let img_file = document.querySelector("#image");
img_file.onchange = createImg;

const upload = () => {
	createPost();
};
let create_btn = document.querySelector("#create");
create_btn.onclick = upload;

const handleImg = async () => {
	// where our image is stored -> on our system
	// who can acces irt -> only you
	// whome we want it to accessible -> to all
	// what is the thing that is accessible to all -> internate
	// can any other user access your system -> No
	// what is the the thing why which we can acccess anything -> URL
	// we have to convert our local url to global url

	let actual_file = img_file.files;
	console.log(actual_file);

	let actual_img = actual_file[0];

	// now we get the img data we have to send it to imgBB to convert it from local to global url

	const API_KEY = "a4c291a0ce4c76b803740098a6c7c89d";

	// now imgbb says that convert img data into form

	let form = new FormData();
	form.append("image", actual_img);

	console.log(form);

	try {
		let response = await fetch(
			`https://api.imgbb.com/1/upload?key=${API_KEY}`,
			{
				method: "POST",
				body: form,
			}
		);
		let data = await response.json();
		image_url = data.data.display_url;
		console.log(image_url);
	} catch (error) {
		console.log(error);
	}
};

// now we have got the image url and we have store it in a server
// that server is json server

// first of all we have to take inputs from user

const createPost = async () => {
	let id = document.querySelector("#create_id").value;
	let caption = document.querySelector("#caption").value;

	let data_of_user = {
		id,
		image_url,
		caption,
	};

	try {
		let response = await fetch(`http://localhost:3000/posts`, {
			method: "POST",
			body: JSON.stringify(data_of_user),
			headers: {
				"Content-Type": "application/json",
			},
		});

		let data = await response.json();
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};

// to update the post what we need -> post address
// how can we get that image address ->   url
// in the url we have send the id of the post -> yes
// and we will take that id from user -> right

let update_post = document.querySelector("#update_post");
update_post.onclick = () => {
	changePost();
};

let changePost = async () => {
	try {
		let Id = document.querySelector("#update_id").value;
		let new_caption = document.querySelector("#new_caption").value;

		let send_this_data = {
			Id,
			caption: new_caption,
		};

		let response = await fetch(`http://localhost:3000/posts/${Id}`, {
			method: "PATCH",
			body: JSON.stringify(send_this_data),
			headers: {
				"Content-Type": "application.json",
			},
		});

		let data = await response.json();
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};

let update_section = document.querySelector("#update_section");
update_section.onclick = () => {
	let update_div = document.querySelector("#update_div");
	let create_div = document.querySelector("#create_div");

	create_div.style.display = "none";
	update_div.style.display = "block";
	update_div.style.display = "flex";
	update_div.style.gap = "12px";
};

// delete section
// when user clicks on delete button that is shown in creat post part
// we will display : block property for dlt_div and before that we will display : none the create_div
// now we have to take image id from user and then iff user clicks on delete post button we have to delete that data present in the server or local server

let delete_section = document.querySelector("#dlt_section");
delete_section.onclick = () => {
	let create_div = document.querySelector("#create_div");
	create_div.style.display = "none";

	let dlt_div = document.querySelector("#dlt_div");
	dlt_div.style.display = "block";
	dlt_div.style.display = "flex";
	dlt_div.style.gap = "12px";
};

let dlt_btn = document.querySelector("#delete");
dlt_btn.onclick = () => {
	dlt_post();
};

let dlt_post = async () => {
	try {
		let Id = document.querySelector("#dlt_id").value;
		console.log(Id);
		let send_this_data = {
			Id,
		};

		let response = await fetch(`http://localhost:3000/posts/${Id}`, {
			method: "DELETE",
			body: JSON.stringify(send_this_data),
			headers: {
				"Content-Type": "application.json",
			},
		});

		console.log(response);
		// let res = await response.json();
		// console.log(res);
	} catch (error) {
		console.log(error);
	}
};
