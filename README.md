# alex-algolia (Movies Dataset)

* hosted on: https://alexo12.github.io/movies-instaSearch/

## Project Summary

- In this Movie Database, the user has the ability to search any movie and obtain results instantly. Displayed to the user upon rendering, are 15 movies sorted by relevance with their title, release year and movie poster. When a user hovers over a certain movie they will notice a 'more info' icon appear near the bottom right of the movie card. Selecting the movie prompts a modal to the user with additional information on the film such as the genre(s), audience score and rating, as well as lead actors of the movie. The User also has the ability to filter resuls be genre and/or movie rating.

- I chose to base the project off of the movies dataset from the algolia datasets repository. The web application displays 15 hits at a time along side a genres and ratings filter for the user to utilize while searching for their desired film. Above those two widgets is the 'clear all filters' widget to further aid the user in the querying process. In the Angolia dashboard, I've configured the relevance settings to take a movie's title, alternative titles, actors, and year of the film as searchable attributes in that respective order. I have also added year, score, and rating into the ranking and sorting controls along side the default criterea. 

## Algolia Feedback

- I had a really fun time developing this with the help of the instant search library. The documentations were really informative and easy to follow as well as the user dashboard. Once getting the hang of the side navigation to all the tutorials, looking for the corresponding code snippet to the feature I was building was seamless. 

## Challenges/Roadblocks

- !! Updated with new, faster solution !! As I was implementing the frontend to render the movies dataset, I realised that many of the movie records, or hits, had images that werent resolving. I debugged the Index and discovered that the dataset was populated with data from the IMDB api, but from 5 years ago, meaning many image source's that were coming from IMDB were no longer hosted on their public api. For my initial solution, I created a function inside the hit component that utilizes the 'url-exist' module to verify whether the image url was valid, and if it wasnt I re-query the IDMB api to get fresh assets for movie posters and actor images. But with the component having to make several api calls upon render, the speed of the image updating to a working url was inconsistent. I then decided to refactor and instead, call onto the algolia api and update the records directly from the index. That will give me the ability to make a one-time update to the entire data set and remove the axio calls from the frontend, making it faster and reducing functionality from the frontend. I leveraged the 'algoliasearch' library to use functions such as initIndex(), browseObjects(), partialUpdateObjects() to update the records. I also simultaneously utilized the 'fs' module to write all the records to a backup json file. I did not run this solution within this directory/environment, but I have included the file for the solution so you can see how exactly I went about updating all the records in the Index. Although this entire solution was not something listed as a requirement for this asignment, I felt that the movie dataset was a good collection to make a search UI for and wanted to find a resolve for its problem rather than abandon it. And most importantly, looking for a solution to this roadblock gave me the oppurtunity to use the algolia api and further learn the library on top of the vast variety of widgets and their configurations from angolia's instantSearch library


## Question 1 - Answer

- Hello George,

  A record is simply an object that is stored in an Index, which is a collection of records. Since its an object it can hold as many attributes as needed. Indexing is the process of restructuring your dataset/Index to best optimize search speed and capabilities. Luckily with the assistance of algolia, you won't need to program the actual algorithym that finds the results based on the user input. But algolia has a set of configuration settings that you are recommended to customize in your favor to farther improve search results given to the user. The 2 most prominent settings are 'Searchable attributes' and 'Ranking and Sorting' which are both stored under 'relevance essentials'. You can configure any attribute from your records to be a searchable attribute to the instant search technology. The best properties to use for this configuration would be names, titles, years, or any other type of identifier for the type of product in your Index. For 'Ranking and Sorting', the best metrics to use would be attributes like price, views, score, sales or any other metric that measures the quality of the record in comparison to other records in the Index. You can also set whether the sorted results ascend or descend in the results. Meaning if you set 'year' to descending and have it as one of the prinary rankers, the indexing will return results from most recent to oldest, and vice versa if you are to set it to 'descending'. 

## Question 2 - Answer

- Hello Matt, 

  Although you aren't able to delete indicies as soon as you load onto your dashboard, a vast majority of the functionality available to you can also be done through api. Since you want to clear and delete indicies while iterating, automating that operation in the code with the help of the api will be the best possible route for you. Algolia has strong SEO capabilities, so searching something like 'algolia delete indices' will lead you straight to the documentations.

## Question 3 - Answer

- Hello Leo,

  Integrating algolia to your website should be easy and require little development. The step by step walkthrough and code-along in the documentations make it stress free for a developer to implement algolia to thier web or mobile app. The process of incorporating is simple, import the dataset that your site uses to algolia then configure simple settings that improves algolia's search strength. You'll then want to install some of algolias libraries to connect to your remote index and render widgets just as ypu would render a child component. Algolia has a deticated showcase page for all of their widgets with a detailed guide on how to configure and use all of them. Unless you want to greatly configure each widget to be fully custom in your favor, the most development work you'd be looking to do would be styling the widgets to best compliment your already existing UI. 
