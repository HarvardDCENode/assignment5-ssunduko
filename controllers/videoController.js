const Video = require('../models/videoModel');

/**
 * This is a Video Service implementing Data Access Object Pattern CRUD operations
 */
class VideoService {

    /**
     * This is a Video create method
     * @param obj
     * @returns {Promise<Document<any, {}>>}
     */
      static create(obj){
          const video = new Video(obj);
          return video.save();
      }

    /**
     * This is a Video update method by id
     * @param id
     * @param data
     * @returns {*}
     */
      static update(id, data){
          return Video.findById(id)
              .then((video)=>{
                  video.set(data);
                  video.save();
                  return video;
              });
      }

    /**
     * This is a Video read method by id
     * @param id
     * @returns {*}
     */
      static read(id){
          return Video.findById(id)
              .then((video)=>{
                  return video;
              });
      }

    /**
     * This is a Video find method
     * @returns {*}
     */
      static list(){
          return Video.find({})
              .then((videos)=>{
                  return videos;
              });
      }

    /**
     * This is a delete Video method by id
     * @param id
     * @returns {*}
     */
      static delete(id){
          return Video.deleteOne({_id: id})
              .then((obj)=>{
                  return obj;
              });
      }
}
module.exports.VideoService = VideoService;
