const h1 = document.querySelector("h1");
const form = document.querySelector("form");
const domTitle = document.getElementById("title");
const domFeedback = document.getElementById("text");

const connectToLocalStorage = (element) =>{
    //put the valu of the HTML element passed into the element parameter as the corresponding item in localStorage idendified by the name attribute
    //the first time this happens there will be no item with that name but that is ok (it won't cause an error)
    element.value = localStorage.getItem(element.name);
    element.addEventListener("change", ()=>{ //when ever the element changes (in this case we hit a key on the keyboarda and something is being written to it)
        localStorage.setItem(element.name, element.value);//we save the value of the element, using the name attribute as a key (the name for the value)
    })
}
const goToThankYou = ()=>{ //these two lines are used often in the code so we make a function for it to simplify
    h1.innerHTML = "thank you for providing us with your valuable feedback";
    form.innerHTML="";
}

const goToMainPage = ()=>{//these lines are also used often so it is nice to make a function for them as well
    h1.innerHTML = "Write us some feedback"
    form.innerHTML = `
        <label for="title">Title: </label>
        <input type="text" id="title" name="subject">
        <br/>
        <label for="text">Tell us what is on your mind: </label><br/>
        <textarea name="feedback" id="text" cols="50" rows="10"></textarea><br/>
        <input type="submit" id="submitButton" value="send feedback">
    `
    const newTitle = document.getElementById("title");
    const newFeedback = document.getElementById("text");
    connectToLocalStorage(newTitle);
    connectToLocalStorage(newFeedback);
}

//calling the function we made above for the title and for the larger textbox below it (called feedback here)
connectToLocalStorage(domTitle); 
connectToLocalStorage(domFeedback);


form.addEventListener("submit",(e)=>{ //when ever we submit the form this happens:
    e.preventDefault(); //preventing a refresh to happen
    history.pushState("Thank you", null, "#thankyou") //enabling us tu use the back button to get the #thankyou away from the url
    localStorage.setItem("subject", "")
    localStorage.setItem("feedback", "")
    goToThankYou();
    
})



window.addEventListener("popstate", (e)=>{ //when ever the user pushes the back or forward button in the browser
    if(e.state === null) goToMainPage(); //this event has a state that can be set with the history.pushState function
    if(e.state === "Thank you") goToThankYou();
    
})

if(location.hash === "#thankyou") goToThankYou(); //in case we refresh the Thank you page

/*
  The challenge is to make an about page that should be accessible either throug a link or a button on the "thank you" page
  You should be able to do the following:
    * Go back to the "thank you" page, using the back button in your browser
    * Go again to the "about" page using the forward button in your browser
    * Refresh the "about" page and still see the content on that page
  
  Extra challenge:
  Make the About page accessible on both the "thank you" page and the front page
  (the one with the form) and still be able to go back, forward and refresh.
*/