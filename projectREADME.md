# Flex Path Midcourse Assessment

Congratulations on getting to this assessment!
You have learned a TON about JavaScript, HTML, CSS, and React so far in this course.

This assessment will test your ability to understand and implement the concepts
you've learned in the Flex Path course so far.

## This assessment will work differently from the exercise modules you've been
working through.

1. The requirements are organized as feature descriptions. 
They describe the behavior we want you to implement in your frontend 
application. 

2. We will give you resources to help you implement these features, but 
it will be your responsibility to use these resources to create an 
application that implements the feature requirements and matches the style of 
the application from the Demo video.

3. There is no solution file to reference for this assignment. We will
provide you with a Demo video of what a passing submission looks like.

4. This assessment will be manually graded by LaunchCode staff.

5. Your submission will involve submitting a link to your GitHub repo and a 
5 minute screen recording video of you demoing your application. 
We will provide you with instructions on using Open Broadcasting Software[(https://obsproject.com/)]
desktop application to record this video.
If there is a different video recording software you prefer, feel free to use it.
But, the video must meet the requirements we describe below.

## How These Instructions Are Organized

We will start by providing you with information on how to get the `api` program
and your `assignment-app` starter code installed and running.
This section will be called `Getting Started`.

Then, we will provide the feature requirements you need to implement in your 
application. Included in these requirements will be relevant resource
links to help you learn how to implement certain styles or visual 
pieces. We will then provide you with a video showing off a passing submission 
to this assessment and a video on how to get your starter code running. 
This section will be called `App Requirements`.

Finally, we will provide more details on how to submit your Github Repo
and code video walkthrough when you have finished the assessment. 
This section will be called `Submission Requirements`


## Getting Started

We have provided you with a simple backend application to use for your
fetch calls in this Assessment. The program is inside the `/api` folder
inside of this git repo.

Instructions on installing and running the `api`:
1. Open a VS Code terminal window. We show you how to do this
in the Demo video in this repository.
2. Use the `cd` command in the terminal to navigate inside of the `/api` folder
3. Run the command `npm install`. This will install the required packages
for the api to run.
4. To start the api, run the command `npm run api`
5. The app will run at `http://localhost:3000`, but you DO NOT have to worry about
that. We have written a "proxy" inside of the Vite app to automatically
redirect requests from your starter frontend Vite app to this api.
6. From your frontend code, all you need to do is send your fetch requests to 
`/api/data/search` to reach the api endpoint.
7. To stop the `api` application, use the keyboard combo `ctrl + c` 
(Control key and 'c' key) in your VS Code terminal.

DISCLAIMER - For your fetch requests to work, you need to make sure you are 
running the api program. Your console should look like this if the `api`
program is running as expected:
![The console should look like this when running the api program](/readMeFiles/api-terminal-console.png)

Instructions on installing and running the `assignment-app` starter code:
1. Using the "+" button inside of the VS Code terminal, create a new terminal
window for you to use. 
![VS Code terminal Plus location](/readMeFiles/vs-code-add-new-terminal.png)
2. Use the `cd` command in the terminal to navigate inside of the `assignment-app`
folder.
3. Run the command `npm install`. This will install the required packages for 
your frontend Vite app to run.
4. To start the app, run `npm run dev`
5. The app will run at `http://localhost:5173` on your machine.
6. To stop the `assignment-app` application, use the keyboard combo `ctrl + c` 
(Control key and 'c' key) in your VS Code terminal.


## App Requirements

We will be building a frontend application that allows users to 
view the results of a User Mobile Device Behavior dataset,
use a keyword search on a selected field to filter the search results,
and view some summary metrics (Average and Median) for the search results
returned from the dataset.

We will build this application using JavaScript and React.

We will not write our own CSS files for styling.
Instead, we will rely on Bootstrap version 5 for styling: https://getbootstrap.com/docs/5.3/getting-started/introduction/

We will provide links to all the relevant Bootstrap documentation you will
need to create this app. But, you will have to read through it 
and figure out how to use Bootstraps classes to get similar styles to 
the Demo application from the video.

You will fetch the data for this application from an `api` program we have provided
for you. Instructions on how to install and run it were provided above.

The `server.js` program will run at `http://localhost:3000`, 
but you DO NOT have to worry about that. 

We have written a "proxy" inside of the Vite apps configuration file to automatically
redirect requests from your frontend Vite app to this program.

The only route you'll need to fetch data against is `/api/data/search` inside
of the frontend application, like so:

```javaScript
const data = await fetch(`/api/data/search`)
```

This route takes 2 optional query parameters:
- `filterType`
- `keyword`

The keyword is whatever a user types in the search bar before hitting the 
`Search` button.
The filterType is whichever field in the dataset they choose to run this keyword 
search against.

Valid values for the filterType are 
```javaScript
const filterTypeOptions = ["gender", "operatingSystem", "model", "behaviorclass"]
```


### Here are the requirements for your application:

The Demo app was designed to be displayed on a screen around 13.5 inches.
If your computer has a smaller screen, feel free to size down the components as
needed.

You DO NOT have to worry about displaying for a ton of different screen sizes
(like mobile devices). 

DO NOT use any 3rd party React or NPM libraries besides the ones 
installed. 

You must create your own components using basic HTML, JSX, and Bootstrap
`className` styling.

#### General App Requirements
1. Create a Nav bar for the app. It will have two links in the navbar:
- A Link pointing to the app location `/` that appears as "User Behavior Data"
- A Link pointing to the app location `/search` that appears as 
  "Search Through Dataset"
2. You will setup two separate pages in the App: "Home" and "Search".
	 - Home: Inside of this repo is a file named `dataset-information.txt`.
		 It contains the text we used to create the `Home` page from the Demo app.
		 Please use this text content to write HTML to match the layout and style of the 
		 page from the video.
	- Search: This page will contain all components pertaining to Searching the dataset.
	  We'll lay out its requirements in a separate numbered list
3. You will use the `react-router-dom` package to display the 'Home' page 
   at the route `/` in the app, and the "Search" page at the route `/search`.
	 When you click the links in the navbar, it should change the page shown below.
	 It should NOT cause a complete window refresh. It will smoothly transition
	 between the displayed page component.
4. The Navbar should `stick` to the top of the page when you scroll down
5. If you are on the Search page and have executed a search that returns results, 
   those should not disappear if you navigate to the "Home" page and then
	 back to the "Search" page. It is fine if the dropdown option and text search
	 field are reset, but the results should NOT be reset from jumping between
	 routes in the app.

#### Search Menu
1. The "Search" page will have a form that allows a user to choose a `filterType`
   option (valid ones provided above) to filter their search by, 
	 a free text search input that allows them to provide a `keyword` to use to
	 only return records from the api that have values in the `filterType` field
	 that match the keyword, and a "Search" button to fire the search event off.
2. When there are no records to display, the page will show the message
   `No Records To Display` under the Search button. When there are records to
	 display, it will display the message 
	 `Displaying [number of records returned from search] Records`

	 So if the search returns 217 records, the message would say
	 `Displaying 217 records`

   When a search is being executed, 
	 this message should display `Loading...` until the search is completed

3. The Search Menu should be left aligned on the screen
4. If you have a filterType option selected, but don't provide a search keyword,
   then the app should pull back all 700 records from `/api/data/search`. 
	 We built the `api` to ignore the filterType option if no search keyword is
	 provided, so that behavior is expected. You can see this in action in the
	 `demo-app-walkthrough` video in this repo.

#### Metrics Display
1. There should be 4 cards displayed below the Search Menu, each one displaying
   the Average and Median values for a given metric from the returned search
	 results. The 4 metrics you will report on are:
	 - App Usage Time (min/day)
	 - Screen On Time (hours/day)
	 - Number of Apps Installed
	 - Age
2. Anytime you execute a search, these metrics should be calculated for the 
   given search results and displayed in these cards.
3. These cards should also display the proper units for these metrics.
   For example, the App Usage Time (min/day) should display
	 `[number] Minutes` for the displayed average and median
4. The numbers should be displayed in "en-US" format, where long numbers
   are formatted with a comma after every third integer


#### Search Results Table
1. There should be a <table> component that will display the search results.
2. This table should have a table header for each property in the search
   result records.
3. Then, for each search result record, it should display that property under
   the relevant column in the table. 
4. You DO NOT need to worry about pagination. Display all the records that are
   returned from your search.
5. The text inside the Table Cells should be left-aligned. The header names
   should be left-aligned as well.
5. When search results are loading, the table should not display, and should show
   the message `Loading Records...` 
6. If there is an error retrieving search results, a message in the color `red`
   should display above the table headers with the message of the error encountered.

#### Bootstrap Version 5 styling
1. We want you to build this application using the Bootstrap CSS styling library.
   We have already imported the relevant links into the index.html file.
2. All you need to do is read the provided documentation and learn which
   classes you need to use in your app to get styling results matching the Demo
   video.
3. Reading through documentation and learning how to use new technologies
   is an ESSENTIAL skill in this job. That's why we're introducing it here.
4. Here are the relevant documentation links you need for all components 
   in this app. We have provided a link to the "Getting Started" page
   and targeted links to the specific styling examples you'll need
   to match the styling of the Demo App:

Getting Started:
*  https://getbootstrap.com/docs/5.0/getting-started/introduction/

Layout:
*  https://getbootstrap.com/docs/5.0/layout/containers/
*  https://getbootstrap.com/docs/5.0/layout/grid/
*  https://getbootstrap.com/docs/5.0/layout/columns/

Content:
*  https://getbootstrap.com/docs/5.0/content/typography/
*  https://getbootstrap.com/docs/5.0/content/tables/

Forms:
*  https://getbootstrap.com/docs/5.0/forms/form-control/
*  https://getbootstrap.com/docs/5.0/forms/select/
*  https://getbootstrap.com/docs/5.0/forms/checks-radios/
*  https://getbootstrap.com/docs/5.0/forms/input-group/
*  https://getbootstrap.com/docs/5.0/forms/layout/

Components (these aren't React components, just their name for these things):
*  https://getbootstrap.com/docs/5.0/components/buttons/
*  https://getbootstrap.com/docs/5.0/components/card/
*  https://getbootstrap.com/docs/5.0/components/navbar/

Helpers:
*  https://getbootstrap.com/docs/5.0/helpers/position/

Utilities
*  https://getbootstrap.com/docs/5.0/utilities/spacing/
*  https://getbootstrap.com/docs/5.0/utilities/text/
*  https://getbootstrap.com/docs/5.0/utilities/position/
*  https://getbootstrap.com/docs/5.0/utilities/flex/
*  https://getbootstrap.com/docs/5.0/utilities/display/


Here are some screenshots of the Demo app

![Finished Home Page](/readMeFiles/finished-app-home-page.png)
![Finished Search Page](/readMeFiles/finished-app-search-page.png)
![Finished Search Page with Results](/readMeFiles/finished-app-search-page-results.png)
![Finished App Search Page Select Behavior](/readMeFiles/finished-app-select-behavior.png)
![Search Return Example](/readMeFiles/search-return-example.png)


Videos provided in this repo:
- Demo walkthrough video - `demo-app-walkthrough.mp4`
- How to run the `api` and `assignment-app` applications with two VS code terminals - `running-the-app.mp4`

VIDEO DISCLAIMER - You will need to clone the repo to your local device before
you can watch the .mp4 files since GitHub does not support watching it from here.


## Submission Requirements
When you are ready to submit your assessment, you will submit your 
GitHub Repo link and Walkthrough video .mp4 file through canvas.

### Requirements for Github Repo:
- Once submitted, the application in your github repo must be able to build
and run. 
- LaunchCode staff will be pulling down your app to review your code,
ensure that the application has all required features, meets the style
requirements, and can be built and run on their local device. 


### Requirements for Walkthrough Video:

[Link to download OBS](https://obsproject.com/)

Download the right version of OBS for your device (Windows or Mac) from
the home page.
![OBS Homepage](/readMeFiles/obs-homepage.png)

Watch the following tutorial for how to record your screen and capture 
audio from your laptop with OBS:
[Tutorial for how to record your screen with OBS](https://www.youtube.com/watch?v=j1HIHYRnOfo)

Please save your walkthrough video as an `.mp4` file.

We will NOT accept a video shot from your phone of your computer screen.
Please install the OBS application, watch the tutorial video, and record
the video directly on your computer.

Walkthrough Video Requirements:
1. Your video MUST be at least 5 minutes long and NO LONGER than 10 minutes
2. Show yourself starting the application on your device. Then open
your web browser and navigate to the running React app.
3. Give us a walkthrough of the features of the app and how they run
4. Then, show us your code files in VS Code. Give us a quick summary
of how you organized your app and walk us through 1 of the React 
component code files you built. 
5. Then, tell us which feature requirement was the most difficult for you
to implement. Tell us why it was difficult and the process you went through
to figure it out.

Video Technical Requirements:
1. We must be able to hear you walking us through everything in the video, so
make sure to capture your laptops microphone audio in OBS.
2. The code file text must be clear and readable in the video. Ensure
you are capturing a good Base Resolution for your video
in the OBS settings. A good Base Resolution is 1920x1080.
![Example of good video recording settings](/readMeFiles/video-recording-settings.png)
3. You can find where OBS is saving your videos inside of Settings -> Output -> Recording:
![Example of where OBS files are saved](/readMeFiles/recording-files-path.png)


# If you encounter any issues during this process, please seek help in this order:
1. Reach out to your Peers in the Slack
2. Log a ticket to the LaunchCode Support Queue: https://support.launchcodelearning.org/support/tickets/new
3. Reach out to Course Staff in the Slack





























