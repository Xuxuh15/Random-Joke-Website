
//grab the quote container
const jokeContainer = document.getElementById('joke-container');

//grab button to attach event listener to
const newJokeButton = document.getElementById('new-joke-button');
//toggle menu button
const toggleMenuButton = document.getElementById('toggle-menu');
//category menu element
const checkBoxContainer = document.getElementById("categories-check-box");
//grab array of input check boxe elements
const checkBoxes = document.getElementsByTagName('input'); 


let categories = '/Any'; 
//url of random quote api
let url = new URL(`https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist,explicit`);
//allows us to easily add and delete params to URL object

//to be passed as a fetch parameter
const options = {
	method: 'GET'
};

//a function that sends a GET request random quote generator API
const getNewJoke = async()=>{
    let joke; 
    while(!joke){
        try {
            const response = await fetch(url, options);
            const data = await response.json(); 
            joke = await data.joke;
            if(response.status === 429){
                joke = 'Could not recive request at this moment. Try again in a few minutes'; 
            }
            if(joke){
                jokeContainer.innerText = joke; 
            }

            } 
            catch (error) {
            joke.container.innerText = `Status Code: ${error.status} \n Could not load content`
            console.log(error);
        }
    }
    
}

//function that sets the visibility of category menu
const toggleMenu = ()=>{
    if(checkBoxContainer.style.visibility === 'hidden'){
        checkBoxContainer.style.visibility = 'visible';
    }
    else{
        checkBoxContainer.style.visibility = 'hidden'; 
    }
 

}

//hides and expands the categories menu
const toggleCheck = (e)=>{
let checkBox = e.target;
console.log('Called');
if(checkBox.hasAttribute('Checked')){
    checkBox.removeAttribute('Checked'); 
}
else{
    checkBox.setAttribute('Checked', ''); 

}
}

//checks if checkbox is checked and modifies url path accordingly
const toggleParams = (e)=>{
    let checkBox = e.target; 
    if(checkBox.checked){
        if(categories === ''){
            categories = categories + `${checkBox.value}`;
        }
        else{
            categories = categories + `,${checkBox.value}`;
        }
        
    }
    else{
        let categoryChoices = categories.split(','); 
        categoryChoices.splice(categoryChoices.indexOf(checkBox.value),1); 
        categories = categoryChoices.toString(); 
    }
    if(categories === ''){
        url.pathname = `/joke`;
    }
    else{
        url.pathname = `/joke/${categories}`;
    }
}




//attach event listener for button click
newJokeButton.addEventListener('click',getNewJoke); 

//attach event handler to toggle menu button
toggleMenuButton.addEventListener('click', toggleMenu);

//attach event listeners to checkbox input elements
for(i = 0; i < checkBoxes.length; i++){
    checkBoxes[i].addEventListener('click', toggleCheck);
    checkBoxes[i].addEventListener('change', toggleParams ); 
}







