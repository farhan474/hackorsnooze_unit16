"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $navLogin.hide();
  $navLogOut.show();
  $navSubmit.show();
  $navFavList.show();
  $navMyStories.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  
}

// show submit form when submit is clicked
function navSubmitClick(evt) {
	console.debug("navSubmit", evt);
	hidePageComponents();
	$submitForm.show();
	
  }

$navSubmit.on("click", navSubmitClick);

// show favlist when it is clicked
function navFavListClick(evt) {
	console.debug("navFavList", evt);
	hidePageComponents();
	$favStoriesList.show();
	
  }

$navFavList.on("click", navFavListClick);

// shows my sotries when clicked
function navMyStoriesClick(evt){
	console.debug("navMyStoryList", evt);
	hidePageComponents();
	$myStoryList.show();
}
$navMyStories.on("click", navMyStoriesClick)

