const Video = require('../models/videoModel');

/**
 *
 */
class VideoService {

    /**
     *
     * @param obj
     * @returns {Promise<Document<any, {}>>}
     */
      static create(obj){
          const video = new Video(obj);
          return video.save();
      }

    /**
     *
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
     *
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
     *
     * @returns {*}
     */
      static list(){
          return Video.find({})
              .then((videos)=>{
                  return videos;
              });
      }

    /**
     *
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
