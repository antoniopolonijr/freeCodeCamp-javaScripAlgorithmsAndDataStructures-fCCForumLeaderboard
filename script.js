const forumLatest =
  "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp";

const postsContainer = document.getElementById("posts-container");

/*
To populate the forum leaderboard with data, you will need to request the data from an API. This is known as an asynchronous operation, which means that tasks execute independently of the main program flow.
You can use the async keyword to create an asynchronous function, which returns a promise.
Example Code
const example = async () => {
  console.log("this is an example");
};
*/
const fetchData = async () => {
  /*
  In the last project, you used the .catch() method to handle errors. Here you'll use a try...catch statement instead.
The try block is designed to handle potential errors, and the code inside the catch block will be executed in case an error occurs.
Example Code
try {
  const name = "freeCodeCamp";
  name = "fCC";
} catch (err) {
  console.log(err); // TypeError: Assignment to constant variable.
}  
  */
  try {
    const res = await fetch(forumLatest);
    /*
In the previous project, you used fetch() with the .then() method to perform logic after the promise was resolved. Now you will use the await keyword to handle the asynchronous nature of the fetch() method.
The await keyword waits for a promise to resolve and returns the result.
Example Code
const example = async () => {
  const data = await fetch("https://example.com/api");
  console.log(data);
}
    */
    const data = await res.json(); // You want to get the response body as a JSON object. The .json() method of your res variable returns a promise, which means you will need to await it.
    // console.log(data); // To view the data results, log the data variable to the console inside your try block. // remove your console.log(data); from your try block now that you understand what is being returned from the fetch call.
  } catch (err) {
    // If there is an error from the fetch call, the catch block will handle it.
    console.log(err); // to log the err parameter.
  }
};

fetchData();
