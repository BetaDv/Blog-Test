// EXTRA REQUIREMENTS
const log = require("../../tools/console");

// SITE DATA
const sd = require("../../config/siteData.json");
let siteData = { name: sd.name + " | Home", description: sd.description };
let errorData = {};
let postData = { user: "", date: "", title: "", body: "", id: "" };



module.exports = (app) => {

    // IM LAZY
    const db = app.db;

    const checkPost = (id) => {
        if(id === undefined) return "post not found";
        
        const postsRef = db.collection('posts');
        
        const postId = id;
const postRef = postsRef.doc(postId);
postRef.get()
  .then(doc => {
    if (!doc.exists) {
      log.verbose('No such document!');
      return "post not found";
    } else {
      const post = doc.data();
        
        postData.user = post.user;
        postData.date = post.date;
        postData.body = post.body;
        postData.title = post.title;

      return post;
    }
  })
  .catch(err => {
    console.log(err)
    return "post not found";
  });
    }

    return {
        route: "/post/:id",
		requestType: "get",
		execute: async (req, res) => {
            postData.id = req.params.id || "0";
            let postExists;
            
            // CHECK IF POST EXISTS OR NOT
            const testPost = checkPost(postData.id);    
            if(testPost !== "post not found") postExists = true;
 if (!postExists) {
        // DATA SENT
        siteData.name = sd.name + " | Post not Found";
        siteData.errorCode = 404;

        errorData.code = 404;
        errorData.short = "Post not Found"
        errorData.message = "The post you requested does not exist on the server."

        // SEND DATA
        res.status(errorData.code)
        return res.render("other/errors", { siteData, errorData })
            }

            // LOAD PAGE
			res.status(200).render("post", { siteData, postData })

        }
	}
}
