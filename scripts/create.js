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
	let id = document.querySelector("#id").value;
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
