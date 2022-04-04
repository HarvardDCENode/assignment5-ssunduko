(function(){

   const baseURL = 'http://localhost:8080';

    /**
     * This is a method for testing Video REST API
     */
   function testAPIs(){
       let testId = '';

       //Test get all Videos endpoint
       callAPI('GET', '/api/videos', null, null)
           .then((list)=>{
               testId = list[0]._id;

               let data = new FormData();

               //Create dummy Rating data
               let reviews = { rating: '5', review: 'This is yet another review'};

               //Create dummy Video data
               data.append('title', 'My API Test Title');
               data.append('description','This is an AJAX API test');
               data.append('averageRating', '3');
               data.append('reviews', JSON.stringify(reviews));

               //Test create Video endpoint
               callAPI('POST', '/api/videos', null, data)
                   .then((video)=>{
                       videoId = video._id;
                       savedVideo = video;

                       //Test read Video endpoint
                       callAPI('GET','/api/videos/'+videoId, null, null)
                           .then((video)=>{

                               //Update dummy Video data
                               savedVideo.title = video.title;
                               savedVideo.description="This is more updates";

                               //Test update Video endpoint
                               callAPI('PUT','/api/videos/'+videoId, null, savedVideo)
                                   .then((video)=>{

                                       //Test delete Video endpoint
                                       callAPI('DELETE', '/api/videos/'+videoId, null, null)
                                           .then((video)=>{
                                           })
                                   });
                           });
                   });
           })
           .catch((err)=>{
               console.error(err);
           });
   }

    /**
     * Call Test API
     * @param method
     * @param uri
     * @param params
     * @param body
     * @returns {Promise<string|any>}
     */
   async function callAPI(method, uri, params, body){
       jsonMimeType = {
           'Content-type':'application/json'
       }
       try{
           var response = await fetch(baseURL + uri, {
               method: method, // GET, POST, PUT, DELETE, etc.
               ...(method==='POST' ? {body: body} : {}),
               ...(method==='PUT' ?  {headers: jsonMimeType, body:JSON.stringify(body)} : {})
           });
           return response.json(); // parses response to JSON
       }catch(err){
           console.error(err);
           return "{'status':'error'}";
       }
  }

  // Calls our test function
  document.querySelector('#clickapi').addEventListener("click", ()=>{
      testAPIs();
  });
})();
