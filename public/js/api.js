(function(){

   const baseURL = 'http://localhost:8080';

   function testAPIs(){
       let testId = '';

       // list
       callAPI('GET', '/api/videos', null, null)
           .then((list)=>{
               console.log('\n\n***************************\nlist results:');
               console.log(list);
               testId = list[0]._id;

               let data = new FormData();
               let reviews = { rating: '3', review: 'This is another review'};

               data.append('title', 'My API Test Title');
               data.append('description','This is an AJAX API test');
               data.append('averageRating', '3');
               data.append('reviews', JSON.stringify(reviews));

               //create
               callAPI('POST', '/api/videos', null, data)
                   .then((video)=>{
                       videoId = video._id;
                       savedVideo = video;  // keep a handle to the created video object
                       // console.log('\n\n***************************\ncreate results:');
                       console.log(video);

                       //read
                       callAPI('GET','/api/videos/'+videoId, null, null)
                           .then((video)=>{
                               console.log('\n\n***************************\nfind results:');
                               console.log(video);

                               savedVideo.title = video.title;
                               savedVideo.description="This is an update";

                               //update
                               callAPI('PUT','/api/videos/'+videoId, null, savedVideo)
                                   .then((video)=>{
                                       console.log('\n\n***************************\nupdate results:');
                                       console.log(video);

                                       //delete
                                       callAPI('DELETE', '/api/videos/'+videoId, null, null)
                                           .then((video)=>{
                                               console.log('\n\n***************************\ndelete video:');
                                               console.log(video);
                                           })
                                   });
                           });
                   });
           })
           .catch((err)=>{
               console.error(err);
           });
}

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

  // Calls our test function when we click the button
  //  after validating that there's a file selected.
  document.querySelector('#testme').addEventListener("click", ()=>{
      testAPIs();
  });
})();
