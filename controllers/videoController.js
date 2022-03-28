const Video = require('../models/videoModel');

class VideoService {

  static create(obj){
      const video = new Video(obj);
      return video.save();
  }

  static update(id, data){
      return Video.findById(id)
          .then((video)=>{
              video.set(data);
              video.save();
              return video;
          });
  }

  static read(id){
      return Video.findById(id)
          .then((video)=>{
              return video;
          });
  }

  static list(){
      return Video.find({})
          .then((videos)=>{
              return videos;
          });
  }

  static delete(id){
      return Video.deleteOne({_id: id})
          .then((obj)=>{
              return obj;
          });
  }
}
module.exports.VideoService = VideoService;
