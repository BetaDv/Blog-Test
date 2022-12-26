// EXTRA REQUIREMENTS
const log = require("../../../tools/console");

// SITE DATA
const serverData = require("../../../config/serverData.json");
let siteData = {
  name: serverData.name + " | Profile",
  description: serverData.description,
};
let errorData = {};
let profileData = {
  user: "",
  id: "",
  creationDate: "",
  pfp: "image link here or base64",
  description: "",
};

module.exports = (app) => {
  // IM LAZY
  const db = app.db;

  const markdownContent = () => {
    const hljs = require("highlight.js");
    const marked = require("markdown-it")({
      html: true,
      breaks: true,
      xhtmlOut: true,
      linkify: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return (
              '<pre class="hljs"><code>' +
              hljs.highlight(str, { language: lang, ignoreIllegals: true })
                .value +
              "</code></pre>"
            );
          } catch (__) {}
        }

        return (
          '<pre class="hljs"><code>' +
          md.utils.escapeHtml(str) +
          "</code></pre>"
        );
      },
    });
    marked.linkify.set({ fuzzyEmail: false });
    const createDOMPurify = require("dompurify");
    const { JSDOM } = require("jsdom");

    const window = new JSDOM("").window;
    const purify = createDOMPurify(window);
    let md = {
      marked,
      purify,
    };
    return md;
  };
  const errorPage = (res) => {
    // DATA SENT
    siteData.name = serverData.name + " | Profile not found";
    siteData.errorCode = 404;

    errorData.code = 404;
    errorData.short = "Profile not found";
    errorData.message = "The profile you're trying to reach does not exist.";

    // SEND DATA

    return res.status(errorData.code).render("other/errors", {
      serverData,
      siteData,
      errorData,
      purify: markdownContent().purify,
      marked: markdownContent().marked,
    });
  };
  const checkProfile = (id, res) => {
    if (id === undefined) return errorPage(res);

    const usersRef = db.collection("users");

    const userId = id;
    const userRef = usersRef.doc(userId);
    userRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          // log.verbose('User hasn't been found in the database!');
          console.log(doc);
          return errorPage(res);
        } else {
          const user = doc.data();

          // DATA SENT
          siteData.name = serverData.name;

          profileData.user = user.user;
          profileData.creationDate = user.creationDate;
          profileData.description = user.description;
          profileData.pfp = user.pfp;

          // LOAD PAGE
          return res.status(200).render("profile", {
            serverData,
            siteData,
            profileData,
            purify: markdownContent().purify,
            marked: markdownContent().marked,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return errorPage(res);
      });
  };

  return {
    route: "/profile/:id",
    requestType: "get",
    execute: async (req, res) => {
      profileData.id = req.params.id.toLowerCase();

      // CHECK IF PROFILE EXISTS OR NOT then RENDER ACCORDINGLY
      checkProfile(profileData.id, res);
    },
  };
};
