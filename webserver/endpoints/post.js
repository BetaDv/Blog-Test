// EXTRA REQUIREMENTS
const log = require("../../tools/console");

// SITE DATA
const serverData = require("../../config/serverData.json");
let siteData = { name: serverData.name + " | Home", description: serverData.description };
let errorData = {};
let postData = { user: "", date: "", title: "", body: "", id: "" };


module.exports = (app) => {

    // IM LAZY
    const db = app.db;

    const markdownContent = () => {
      const hljs = require('highlight.js');
      const marked = require('markdown-it')({
  html: true,
  breaks: true,
  xhtmlOut: true,
  linkify: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});
marked.linkify.set({ fuzzyEmail: false });
      const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const purify = createDOMPurify(window);
      let md = {
        marked,
        purify
      }
    return md;
    }
const errorPage = (res) => {
        // DATA SENT
        siteData.name = serverData.name + " | Post not Found";
        siteData.errorCode = 404;

        errorData.code = 404;
        errorData.short = "Resource not Found"
        errorData.message = "The resource you requested does not exist on the server."

        // SEND DATA
        
        return res.status(errorData.code).render("other/errors", { serverData, siteData, errorData, purify: markdownContent().purify, marked: markdownContent().marked })
    }
    const checkPost = (id, res) => {
        if(id === undefined) return errorPage(res);
        
        const postsRef = db.collection('posts');
        
        const postId = id;
const postRef = postsRef.doc(postId);
postRef.get()
  .then(doc => {
    if (!doc.exists) {
      // log.verbose('Post hasn't been found in the database!');
      console.log(doc)
      return errorPage(res);
    } else {
      const post = doc.data();
        
        // DATA SENT
        siteData.name = serverData.name;
        siteData.errorCode = 404;

        postData.user = post.user;
        postData.date = post.date;
        postData.body = post.body;
        postData.title = post.title;

        // LOAD PAGE
			  return res.status(200).render("post", { serverData, siteData, postData, purify: markdownContent().purify, marked: markdownContent().marked });;
    }
  })
  .catch(err => {
    console.log(err)
    return errorPage(res);
  });
    }

    

    return {
        route: "/post/:id",
		requestType: "get",
		execute: async (req, res) => {
            postData.id = req.params.id;
            
            // CHECK IF POST EXISTS OR NOT   
            checkPost(postData.id, res);
        }
	}
}
