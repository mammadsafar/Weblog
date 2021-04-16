const path = require('path');
const fs = require('fs');
const User = require(path.join(__dirname, '../models/User'));
const Article = require(path.join(__dirname, '../models/article'));
const bcrypt = require('bcrypt');
const generalTools = require('../tools/general-tools');
const multer = require('multer');




const allArticle = (req, res) => {
    console.log("article/newArticle -----------");
    res.render('article/allArticle');

}


// ? ---------------------------------< my Articles Pass >---------------------------- 
const myArticles = (req, res) => {

  res.render("article/myarticles")

}
// ? ---------------------------------< getMyArticle >---------------------------- 
const getAllArticle = (req, res) => {

  User.findOne({
      _id: req.session.user._id
  }, {
      username: 1
  }, (err, user) => {

      if (err) return res.status(500).json({
          msg: "Server Error :))"
      });

      Article.find({}).skip(parseInt(req.body.page) * parseInt(req.body.limit )- parseInt(req.body.limit)).limit(parseInt(req.body.limit)).populate('owner').sort('lastUpdate').exec((err, articles) => {
          console.log(err);
          if (err) return res.status(500).json({
              msg: "Server Error :)("
          });

          if (!articles) {
              return res.status(404).json({
                  msg: "Not Found :("
              });
          };

          console.log(articles);
          res.json({
              articles
          })


      })

  })
}


// ? ---------------------------------< article profile >---------------------------- 
const articleprofile = (req, res) => {

    const upload = generalTools.uploadArticleProfile.single('avatar');



    upload(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            return res.status(500).send('Server Error :/')

        } else if (err) {

            return res.status(400).send("Bad Request!")

        } else {

            let path = req.file.destination.split("public");
            `${path[1]}/${req.file.filename}`
            Article.findOneAndUpdate({
                _id: req.session.article._id
            }, {
                profile: `${path[1]}/${req.file.filename}`,
            }, (err, article) => {

                if (err) {

                    return res.status(500).json({
                        msg: "Server Error :("
                    });
                }

                res.render('article/myarticles')


            });



            // if (req.session.article.profile === "/images/articles/profiles/default.jpg") {

            //     let path = req.file.destination.split("public");
            //     console.log(path[1]);
            //     console.log(req.file.filename);
            //     req.session.article = `${path[1]}/${req.file.filename}`;
            //     console.log(req.session.article);

            //     // res.redirect('/dashboard');
            // } else {

            //     fs.unlink(path.join(__dirname, '../public', req.session.article.profile), err => {
            //         if (err) {

            //             return res.status(500).json({
            //                 msg: 'Server Error!'
            //             })
            //         } else {
            //             let path = req.file.destination.split("public");
            //             req.session.article.profile = `${path[1]}/${req.file.filename}`;

            //             // res.redirect('/dashboard');
            //         }
            //     })
            // }
        }
    })
}


// ? ---------------------------------< article Images >---------------------------- 
const articleImage = (req, res) => {

    const upload = generalTools.uploadArticleImages.single('upload');



    upload(req, res, function (err) {


        if (err instanceof multer.MulterError) {
            return res.status(500).send('Server Error :/')

        } else if (err) {

            return res.status(400).send("Bad Request!")

        } else {
            let path = req.file.destination.split("public");
            res.json({
                uploaded: 1,
                url: `${path[1]}/${req.file.filename}`
            })
        }
    })
}

// todo ---------------------------------< add New Article >---------------------------- 
const addNewArticle = (req, res) => {

    console.log("not ok");

    let data = req.body.text

    let Location = path.join(__dirname, '../public/articles/text');

    let ArticleName = `${req.session.user.username}-${Date.now()}-article.html`;


    fs.writeFile(`${Location}/${ArticleName}`, ` ${ data }`, function (err) {
        if (err) {
            return res.status(400).send("Server Error :(");
        }

        const newArticle = new Article({
            title: req.body.title,
            owner: req.session.user._id,
            text: `/articles/text/${ArticleName}`,
            summery: req.body.summery.substring(0, 80)

        });

        console.log(newArticle);
        req.session.article = newArticle;

        newArticle.save({}, (err, doc) => {
            console.log("save article");
            if (err) {
                console.log("ok baby");
                console.log(err);
                if (err.code === 11000) {
                    return res.status(400).send("Duplicate item!")
                }
                return res.status(400).send("Server Error :(");
            }
        })
        console.log("ok");
        req.session.article = newArticle;
        console.log(req.session.article);
        res.redirect('../login')




    })






}

// ? ---------------------------------< Add Text Article >---------------------------- 
const addText = (req, res) => {



    let data = req.body.text

    let Location = path.join(__dirname, '../public/articles/text');

    let ArticleName = `${req.session.user.username}-${Date.now()}-article.html`;


    fs.writeFile(`${Location}/${ArticleName}`, ` ${ data }`, function (err) {
        if (err) {
            return res.status(400).send("Server Error :(");
        }

        Article.findOneAndUpdate({
            _id: req.session.article._id
        }, {
            text: `/articles/text/${ArticleName}`,
            summery: req.body.summery.substring(0, 80)
        }, (err, article) => {

            if (err) {

                return res.status(500).json({
                    msg: "Server Error :("
                });
            }
            if (!article) {
                return res.status(400).json({
                    msg: "Article already not Exist :("
                });
            }
            if (article.text !== "") {
                fs.unlink(path.join(__dirname, '../public', article.text), err => {
                    if (err) {
                        res.status(500).json({
                            msg: 'Server Error!'
                        })
                    }
                })
            }
            res.send("ok");


        });

    })


}





// ? ---------------------------------< delet User >---------------------------- 
const deletUser = (req, res) => {

    User.findOneAndDelete({
        username: req.params.username.trim()
    }, (err, user) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });

        res.send("ok");
    })

}




module.exports = {
  allArticle,
  getAllArticle,
    // articleImage,
    // addNewArticle,
    // addText,
    // myArticles,
    // getMyArticle,
}