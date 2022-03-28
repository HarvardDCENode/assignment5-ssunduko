## REST API Example
This code represents the REST API for our video sharing application. It does not have the HTML/Jade routes in it - it's just the REST API.

You can test the API using Postman to try each route. You can see the schema in `models/videoModel.js` and the routes in `routes/api/api.videos.js`  The POST/create route assumes a file upload via PostData, though
if your application doesn't do file uploads, simple JSON data in the body of the POST request is sufficient.  

It's also important to test your API using Javascript in a real browser environment - it confirms that you're handling 'preflight' and CORS issues correctly. The `index.html` file and `js/api.js` files in `/public/` provide a way to do this. You may adapt this code to your own application.

Be sure to `npm install`, and then start this application with `npm run start-dev`
