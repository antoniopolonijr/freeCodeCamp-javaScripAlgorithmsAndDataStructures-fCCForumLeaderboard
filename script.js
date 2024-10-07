const forumLatest =
  "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp";

const postsContainer = document.getElementById("posts-container");

// category object which holds all of the forum categories and classNames for the styling.
const allCategories = {
  299: { category: "Career Advice", className: "career" },
  409: { category: "Project Feedback", className: "feedback" },
  417: { category: "freeCodeCamp Support", className: "support" },
  421: { category: "JavaScript", className: "javascript" },
  423: { category: "HTML - CSS", className: "html-css" },
  424: { category: "Python", className: "python" },
  432: { category: "You Can Do This!", className: "motivation" },
  560: { category: "Backend Development", className: "backend" },
};

// to calculate the difference between the current time and the time of the last activity on a topic. This will allow you to display how much time has passed since a topic had any activity.
const timeAgo = (time) => {
  const currentTime = new Date(); // represents the current date and time
  const lastPost = new Date(time); // will be the date of the last activity on a topic
  const timeDifference = currentTime - lastPost;
  const msPerMinute = 1000 * 60;
  const minutesAgo = Math.floor(timeDifference / msPerMinute);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  if (minutesAgo < 60) {
    return `${minutesAgo}m ago`;
  }
  if (hoursAgo < 24) {
    return `${hoursAgo}h ago`;
  }
  return `${daysAgo}d ago`;
};

// function to convert view counts to a more readable format. For example, if the view count is 1000, it should display as 1k and if the view count is 100,000 it should display as 100k.
const viewCount = (views) => {
  const thousands = Math.floor(views / 1000);
  if (views >= 1000) {
    return `${thousands}k`;
  }
  return views;
};

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
    showLatestPosts(data); // call it to see your changes.
  } catch (err) {
    // If there is an error from the fetch call, the catch block will handle it.
    console.log(err); // to log the err parameter.
  }
};

fetchData();

// To display the data on the page.
const showLatestPosts = (data) => {
  const { topic_list, users } = data; // destructuring to get the topic_list and users properties from the data object.
  const { topics } = topic_list; // The topic_list object contains a topics array which contains the latest topics posted to the forum. Destructure the topics array from the topic_list object.
  postsContainer.innerHTML = topics
    .map((item) => {
      const {
        id,
        title,
        views,
        posts_count,
        slug,
        posters,
        category_id,
        bumped_at,
      } = item;
      return `<tr>
      <td>
      <p class="post-title">${title}</p>
      </td>
      <td></td>
      <td>${posts_count - 1}</td>
      <td>${viewCount(views)}</td>
      <td>${timeAgo(bumped_at)}</td>
    </tr>`;
      // to build out the table which will display the forum data.
      // To display the topic title, add a p element inside the first td element.
      // In the third td element, add the following embedded expression: ${posts_count - 1}. This will display the number of replies to the topic.
      // In the fourth td element, add an embedded expression that contains the views variable. This will display the number of views the post has. // update the current value to instead call the viewCount function
      // to display data in the Activity column, you need to use the bumped_at property of each topic, which is a timestamp in the ISO 8601 format. You need to process this data before you can show how much time has passed since a topic had any activity.
      // To display the time since the last post, call the timeAgo function and pass in the bumped_at variable for the argument. Place this function call inside the last td element.
    })
    .join(""); // In the preview window, you should see a column of commas. To fix this, you should chain the join method to your map method.
  // to start populating the data inside the postsContainer.
};
