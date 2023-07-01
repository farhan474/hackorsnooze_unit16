"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
	storyList = await StoryList.getStories();
	$storiesLoadingMsg.remove();
	putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
	// console.debug("generateStoryMarkup", story);

	const hostName = story.getHostName();
	const storyId = story.storyId
	return $(`
		
      <li id="${storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);

}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
	console.debug("putStoriesOnPage");

	$allStoriesList.empty();
	$favStoriesList.empty();

	// loop through all of our stories and generate HTML for them
	for (let story of storyList.stories) {
		const $story = generateStoryMarkup(story);
		$allStoriesList.append($story);
	}
	// when user is logged update favorite List
	if (currentUser) {
		$("li").prepend(`<span class ="far fa-star"></span>`)
		for (let fav of currentUser.favorites) {
			let $fav = generateStoryMarkup(fav);
			$fav.prepend(`<span class ="fas fa-star"></span>`);
			$(`#${fav.storyId}`).children('span').toggleClass("far fas");
			$favStoriesList.append($fav);
		}
		$("span").on("click", favButton)
	}
	// when user is logged in update myStory list 
	if (currentUser){
		for(let story of currentUser.ownStories){
			console.log(story)
			let $ownStory = generateStoryMarkup(story);
			console.log($ownStory)
			$ownStory.append(`<button>Delete <i class="fa fa-trash-o"></i></button>`)
			$myStoryList.append($ownStory)
		}
		$("button").on("click", deleteStoryButton)
	}

	$allStoriesList.show();
	$favStoriesList.hide();
	$myStoryList.hide();
}
// function for submitting a story and adding it to the UI
async function submitStory(e) {
	e.preventDefault();
	console.debug("putSubmitOnPage");
	let story = { author: $("#author").val(), title: $("#title").val(), url: $("#url").val() };
	let newStory = await storyList.addStory(currentUser, story);
	let newStoryMarkup = generateStoryMarkup(newStory);
	newStoryMarkup.prepend(`<span class ="fas fa-star"></span>`);
	console.log(newStory, newStoryMarkup)
	$submitForm.hide();
	$allStoriesList.show()
	$allStoriesList.prepend(newStoryMarkup)
}

$("#submitButton").on("click", submitStory);

//favorite function
async function favButton(event) {
	let id = $(event.target).closest("li").attr("id");

	if ($(event.target).hasClass("far")) {
		currentUser.addFav(id)
		$(event.target).toggleClass('far fas')
	}
	else {
		currentUser.deleteFav(id)
		$(event.target).toggleClass('far fas')
	}
}

// Deleting own stories
async function deleteStoryButton(event){
	let id = $(event.target).closest("li").attr("id");
	await axios.delete(`${BASE_URL}/stories/${id}`,{ params:{token: currentUser.loginToken} })
	$(event.target).closest("li").remove();

}


