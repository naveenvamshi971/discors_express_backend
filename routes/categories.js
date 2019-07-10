var express = require('express');
var router = express.Router();
var models = require("../models")

let getTopics = async () => {
  const respObject = []
    let topics = await models.topics.findAll()
    for(topic_index in topics){
      const item = topics[topic_index];
      let urlObj=[];
      
      let comments = await models.comments.findAll({ where: { topicId:item.id} })
      // var i=0;
      // for(comment_index in comments.slice(0,5)){
      //   const comment_item = comments[comment_index];
      //   console.log(">>>>>>>>>>>",comment_index);
      //   let users = await models.users.findAll({ where: { id:comment_item.userId} })
      //   console.log("<<<<<<<<<",users );
      //     let imageObj={
      //       "url":users[0].profileImage
      //     }
      //     urlObj.push(imageObj);
      // }
      let likes = await models.likes.findAll({where:{topicId:item.id}})
      likeNo=likes.length
      for(like_index in likes){
        const likeItem=likes[like_index]
        let users = await models.users.findAll({where:{id:likeItem.userId}})
            let imageObj={
              "url":users[0].profileImage
            }
            urlObj.push(imageObj);
            // console.log("imageObj",imageObj);
      }
        
      let itemObj = {
        "id":item.id,
        "name": item.name,
        "category":item.category,
        "viewCount":item.viewCount,
        // "likes":item.likes,
        "likes":0,
        "comments": comments.length,
        "createdAt":item.createdAt,
        "likes":item.likes,
        "likedUserIcon":urlObj
      }
      respObject.push(itemObj)
    }
    return new Promise((resolve, reject) =>{
      resolve(respObject)
    })
}

let getTopicCategory = async (cat) => {
  const respObject = []
    let topics = await models.topics.findAll(
     { where:{category:cat}}
    )
    for(topic_index in topics){
      const item = topics[topic_index];
      let urlObj=[];
      
      let comments = await models.comments.findAll({ where: { topicId:item.id} })
      // var i=0;
      // for(comment_index in comments.slice(0,5)){
      //   const comment_item = comments[comment_index];
      //   console.log(">>>>>>>>>>>",comment_index);
      //   let users = await models.users.findAll({ where: { id:comment_item.userId} })
      //   console.log("<<<<<<<<<",users );
      //     let imageObj={
      //       "url":users[0].profileImage
      //     }
      //     urlObj.push(imageObj);
      // }
      let likes = await models.likes.findAll({where:{topicId:item.id}})
      likeNo=likes.length
      for(like_index in likes){
        const likeItem=likes[like_index]
        let users = await models.users.findAll({where:{id:likeItem.userId}})
            let imageObj={
              "url":users[0].profileImage
            }
            urlObj.push(imageObj);
            // console.log("imageObj",imageObj);
      }
        
      let itemObj = {
        "id":item.id,
        "name": item.name,
        "category":item.category,
        "viewCount":item.viewCount,
        // "likes":item.likes,
        "likes":0,
        "comments": comments.length,
        "createdAt":item.createdAt,
        "likes":item.likes,
        "likedUserIcon":urlObj
      }
      respObject.push(itemObj)
    }
    return new Promise((resolve, reject) =>{
      resolve(respObject)
    })
}



router.get('/:category_name/topics', function(request, response) {

  if(request.params.category_name=="all"){
    getTopics().then(respObject => {
      response.json({topic:respObject})
    })
  }
  else{

  // models.topics.findAll({
  //     where:{category:request.params.category_name}
  // })
  getTopicCategory(request.params.category_name)
  .then((topic)=>response.json({topic})
  )
  .catch(err => response.status(400).json({ err: `Category [${request.params.category_name}] doesn\'t exist.`}))
}
});


module.exports = router; 