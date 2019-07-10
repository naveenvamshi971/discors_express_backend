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
        "likes":item.likes,
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

//
let getTopic = async (topic_id) => {
  const respObject = []
  let isLiked=false
    let topic = await models.topics.findAll({where:{id:topic_id}})
    const item=topic[0];
    // console.log("%555555555555",item.id)
    // console.log("%555555555556",item.userid)
    // console.log("%555555555557",item.name)
    // return null;  
    let commentObj=[];
    // console.log("*****Item******",item);
    let comments = await models.comments.findAll({where:{topicId:topic_id}})
    
    for(comment_index in comments){
    const comment_item = comments[comment_index];
      let user = await models.users.findAll({where:{id:comment_item.userId}})
      const user_item = user[0];
      
      let commentItemObj = {
        "id":comment_item.id,
        "username": user_item.username,
        "url":user_item.profileImage,
        "content":comment_item.content,
        "createdAt":comment_item.createdAt
      }
      commentObj.push(commentItemObj)
    }
    // console.log("islikes11",isLiked)

    let likes= await models.likes.findAll({where:{topicId:topic_id}})
    // console.log("likes",likes)
    // console.log("islikes1",isLiked)
    const likeItem=likes[0];
    if(likes!=0){
      isLiked=true;
      // console.log("islikes2",isLiked)

    }
    else{
      isLiked=false;
      // console.log("islikes3",isLiked)
    }
    // console.log("user id is", item.userId, item.userid)
    let user = await models.users.findAll({where:{id:item.userid}})
    // console.log("^^^^^^^^^^^",user[0].profileImage);
    let itemObj = {
      "id":item.id,
      "username":user[0].username,
      "url":user[0].profileImage,
      "name": item.name,
      "content":item.content,
      "category":item.category,
      "likes":item.likes,
      "createdAt":item.createdAt,
      "isLiked":isLiked,
      "replyCount":commentObj.length,
      "viewCount":item.viewCount,
      "userCount":1,
      "comments":commentObj
    }
    respObject.push(itemObj)
    return new Promise((resolve, reject) =>{
      resolve(itemObj)
    })
}
//

router.get('/', function(request, response) {
   getTopics().then(respObject => {
     response.json({topic:respObject})
   })
})

router.get('/:topic_id', function(request, response) {  
  models.topics.increment("viewCount",
   {
     where: { id: request.params.topic_id }
   }
 )
  getTopic(request.params.topic_id).then(respObject => {
    response.json({topic:respObject})
  })
  .catch(err => response.status(400).json({ err: `Topic [${request.params.topic_id}] doesn\'t exist.`}))
});

router.post("/",function(request,response){ 
  // console.log("#333333",request.body); 
  models.topics.create({
      name:request.body.title,
      category:request.body.category,
      content:request.body.content,
      userId:2,
      viewCount:0,
      likes:0
  }).then(function() {
    // response.redirect("http://localhost:3001/");
    response.send("Successful");

  }); 
});

router.post("/:topic_id/comments",function(request,response){ 
  // console.log("))))))))))))))))",request.body.comment,request.params);
    models.comments.create({
        content:request.body.comment.content,
        topicId:request.params.topic_id,
        userId:2    
    }).then(function() {
      // response.redirect("http://localhost:3001/");
      response.send("Successful");
    }); 
  });

  router.patch("/:topic_id/comments/:comment_id", function(request, response) {
    // console.log(request.body.user.image);
    models.comments
      .update(
        {
            content:request.body.comment.content
        },
        { where: { topicId:request.params.topic_id,id:request.params.comment_id} }
      )
      .then(function() {
        response.redirect("http://localhost:3001/");
        // response.send("Successful");
      });
  });

  router.patch("/:topic_id", function(request, response) {
    // console.log(request.body.user.image);
    models.topics
      .update(
        {
            name:request.body.topic.title,
            category:request.body.topic.category,
            content:request.body.topic.content
        },
        { where: {id:request.params.topic_id} }
      )
      .then(function() {
        response.send("Successful");
      });
  });

  router.delete("/:topic_id/comments/:comment_id", function(request, response) {
    // console.log(request.params.comment_id)
    models.comments
      .destroy({
        where: {id:request.params.comment_id}
      })
      .then(function(user_d) {
        // console.log(request.params.comment_id)
        // if (user_d)
        //  response.json(user_d, "Topic is deleted is successfully");
        // else response.json(user_d);
        response.send("Successful");

      });
  });

  router.delete("/:topic_id", function(request, response) {
    // console.log(request.params.comment_id)
    models.topics
      .destroy({
        where: {id:request.params.topic_id}
      })
      .then(function(user_d) {
        // console.log(request.params.comment_id)
        // if (user_d)
        //  response.json(user_d, "Topic is deleted is successfully");
        // else response.json(user_d);
        response.send("Successful");

      });
  });

  router.post("/",function(request,response){ 
    models.topics.create({
        name:request.body.topic.title,
        category:request.body.topic.category,
        content:request.body.topic.content
    }).then(function() {
      response.send("Successful");
    }); 
  });

  router.post("/:topic_id/likes",function(request,response){ 
    models.likes.create({
        topicId:request.params.topic_id,
        userId:4
    }).then(function() {
      response.send("Successful liked");
      // models.topics.update({
      //   likes:topics.likes+1
      // })
    }); 
  });

  router.delete("/:topic_id/likes", function(request, response) {
    models.likes
      .destroy({
        where: {topicId:request.params.topic_id}
      })
      .then(function(user_d) {
          response.send("Successful unliked");
        //   models.topics.update({
        //   likes:topics.likes-1
        // })
      });
  });  

module.exports = router;