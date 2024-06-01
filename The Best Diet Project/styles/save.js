//A object constructor for the contact description
function contactDescription(
  contactName,
  contactSurname,
  contactEmail,
  contactRecipes
) {
  this.contactName = contactName;
  this.contactSurname = contactSurname;
  this.contactEmail = contactEmail;
  this.contactRecipes = contactRecipes;
}

// Created an arrays to store the saved items
let savedContacts = [];
let savedArticles = [];
let savedFacts = [];
let savedRecipes = [];
let savedNum = 1;

//Displays stored data in sessionStorage encase user reloads
function myLoad() {
  if (sessionStorage.getItem("hasCodeRunBefore") === null) {
    sessionStorage.setItem("typesOfContacts", JSON.stringify(savedContacts));
    sessionStorage.setItem("typesOfArticles", JSON.stringify(savedArticles));
    sessionStorage.setItem("typesOfFacts", JSON.stringify(savedFacts));
    sessionStorage.setItem("typesOfRecipes", JSON.stringify(savedRecipes));
    sessionStorage.setItem("numberofItems", JSON.stringify(savedNum));
    sessionStorage.setItem("hasCodeRunBefore", true);
  } else {
  }
}

//Adds any new items that the user saved to different arrays and stores it
function saveButton(item, type) {
  savedArticles = JSON.parse(sessionStorage.getItem("typesOfArticles"));
  savedFacts = JSON.parse(sessionStorage.getItem("typesOfFacts"));
  savedRecipes = JSON.parse(sessionStorage.getItem("typesOfRecipes"));
  savedNum = JSON.parse(sessionStorage.getItem("numberofItems"));

  savedNum = savedArticles.length + savedFacts.length + savedRecipes.length + 1;

  if (type === "article") {
    savedArticles.push(item);
    sessionStorage.setItem("typesOfArticles", JSON.stringify(savedArticles));
    alert(
      `Item saved! You now have ${savedNum} item(s) in your "Save for later" folder.`
    );
  } else if (type === "facts") {
    savedFacts.push(item);
    sessionStorage.setItem("typesOfFacts", JSON.stringify(savedFacts));
    alert(
      `Item saved! You now have ${savedNum} item(s) in your "Save for later" folder.`
    );
  } else if (type === "recipe") {
    savedRecipes.push(item);
    sessionStorage.setItem("typesOfRecipes", JSON.stringify(savedRecipes));
    alert(
      `Item saved! You now have ${savedNum} item(s) in your "Save for later" folder.`
    );
  }
  sessionStorage.setItem("numberofItems", JSON.stringify(savedNum));
}

//A function that displays and stores the users comments
function commentForm() {
  let savedComment = document.getElementById("comment").value;
  sessionStorage.setItem("commentText", savedComment);
  alert("Comment Submitted");
  console.log(sessionStorage.getItem("commentText"));
}

//A function that stores the contact details
function contactForm() {
  savedContacts = JSON.parse(sessionStorage.getItem("typesOfContacts"));
  let newContact = new contactDescription(
    document.getElementById("fname").value,
    document.getElementById("lname").value,
    document.getElementById("email").value,
    selectedRadio()
  );
  console.log(newContact);
  savedContacts.push(newContact);
  sessionStorage.setItem("typesOfContacts", JSON.stringify(savedContacts));
  alert("Contact details sent");
  console.log(JSON.parse(sessionStorage.getItem("typesOfContacts")));
}

//A function that returns which radio value the user selected
function selectedRadio() {
  let btnRadio = "";
  document.getElementsByName("recipe_type").forEach((radio) => {
    if (radio.checked) {
      btnRadio = radio.value;
    }
  });
  return btnRadio;
}

//jQUERY functions
$(document).ready(function () {
  let currentCard = 1;

  //Animated the like button when clicked
  $(".submitLike").on("click", function (e) {
    let clickLike = e.target;
    let clickColor = "";
    clickLike.classList.toggle("liked");
    clickColor = e.target.classList[1];
    if (clickColor === "liked") {
      $(this).animate({
        width: "50px",
        height: "20px",
      });
    } else {
      $(this).animate({
        width: "10px",
        height: "10px",
      });
    }
  });

  //Slides all the saveMenu elements up
  $(".saveMenu").slideUp();

  //When user hovers over the saveMenu the appropriate items will slide down
  $(".headingSave").hover(function (hoverType) {
    var mouseType = hoverType.type;
    if (mouseType === "mouseenter") {
      var menuID = $(this).attr("data-menu");
      $("#" + menuID).slideDown(1000);
    } else {
      $(".saveMenu").slideUp(600);
    }
  });

  //Creates a repeated slide effect
  setInterval(function () {
    $("#sliderWrapper #sliderList").animate(
      { "margin-left": "-=400px" },
      1000,
      function () {
        currentCard++;
        if (currentCard === $("#sliderWrapper #sliderList .slide").length) {
          currentCard = 1;
          $("#sliderWrapper #sliderList").css("margin-left", 0);
        }
      }
    );
  }, 4000);

  //Hides and shows when the diet_img is clicked
  $(".diet_img").on("click", function () {
    $(this).hide(1000).show(2000);
  });
});
/*References:https://www.youtube.com/watch?v=hMxGhHNOkCU&list=RDCMUCVTlvUkGslCV_h-nSAId8Sw&start_radio=1&rv=hMxGhHNOkCU&t=12
             https://api.jquery.com/category/selectors/
             https://www.w3schools.com/jquery/eff_stop.asp
             https://www.w3schools.com/jquery/event_mousemove.asp#:~:text=The%20mousemove()%20method%20triggers,Use%20this%20event%20carefully.
             https://www.w3schools.com/jsref/prop_style_backgroundcolor.asp
             https://www.w3schools.com/js/default.asp
             https://www.w3schools.com/html/default.asp
             https://www.w3schools.com/jsref/default.asp
             https://youtu.be/NO5kUNxGIu0?si=3vpsSH35wAaeV3T7
             https://youtu.be/FQtjI1PC5Z0?si=c4N4H0zFOupZU-yP
             https://youtu.be/RKXIMnSwUcg?si=qF_OUuock5oYnbfg
             https://youtu.be/WCRi7y6aNrQ?si=iH0gCE5qNfs_5fKN
             https://youtu.be/g_vXSKbfUiQ?si=uAYWloYKxep1bJAp
             https://youtu.be/RxUc6ZWwgfw?si=H8isfEYrV2N39rAe*/
