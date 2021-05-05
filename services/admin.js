const path = require('path');
const fs = require('fs');
const User = require(path.join(__dirname, '../models/User'));
const bcrypt = require('bcrypt');
const generalTools = require('../tools/general-tools');
const multer = require('multer');



const users = (req, res) => {
  res.render('admin/users');

}
const userArticlePage = (req, res) => {
  console.log("hasan kachal -------------------");
  res.render('admin/userArticle');

}
// ? ---------------------------------< get All User >---------------------------- 
const getAllUser = (req, res) => {

  User.find({
    role: {
      $ne: "admin"
    }
  }).skip(parseInt(req.body.page) * parseInt(req.body.limit) - parseInt(req.body.limit)).limit(parseInt(req.body.limit)).sort({
    'createAt': -1
  }).exec((err, user) => {
    if (err) {
      if (err) return res.status(500).json({
        msg: "Server Error :))"
      });
    }
    if (!user) {
      if (err) return res.status(404).json({
        msg: "User not found"
      });

    };

    res.json(user)


  })








}

// ? ---------------------------------< Update User >---------------------------- 
const UpdateUser = (req, res) => {
  console.log(req.body);

  User.findOneAndUpdate({
    username: req.params.username.trim()
  }, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username.trim(),
    sex: req.body.sex,
    email: req.body.email,
    phone_number: req.body.phone_number,
    lastUpdate: new Date(),
  }, {
    new: true
  }, (err, userUpdate) => {
    if (err) return res.status(500).json({
      msg: "Server Error :)"
    });
    res.send("OK");
  })
}
// ? ---------------------------------< Update Pass >---------------------------- 
const UpdatePass = (req, res) => {

  console.log(req.params.id);
  User.findOne({
    _id: req.params.id
  }, {}, {
    new: true
  }, (err, user) => {
    if (err) return res.status(500).json({
      msg: "Server Error :)"
    });

    if (!user) {
      return res.status(404).json({
        msg: "Not Found :("
      });
    };
    console.log(user);
    User.findOneAndUpdate({
      _id: user._id
    }, {
      $set: {
        password: user.username
      }
    }, (err, employee) => {
      console.log(employee);
      console.log(err);
      if (err) return res.status(500).json({
        msg: "Server Error :)",
        err: err.msg
      });
      res.send("OK :)")
    })



  })
}

// ? ---------------------------------< delete User >---------------------------- 
const deletUser = (req, res) => {
  console.log(1000);
  User.findOneAndDelete({
    _id: req.params.id
  }, (err, user) => {
    console.log(err);
    if (err) return res.status(500).json({
      msg: "Server Error :)",
      err: err.msg
    });
    console.log(user);
    res.send("ok");
  })

}

// ? ---------------------------------< Update Avatar >---------------------------- 
const UpdateUserAvatar = (req, res) => {

  const upload = generalTools.uploadAvatar.single('avatar');
  console.log(1);


  upload(req, res, function (err) {


    if (err instanceof multer.MulterError) {
      res.status(500).send('Server Error :/')

    } else if (err) {

      res.status(400).send("Bad Request!")

    } else {
      User.findByIdAndUpdate(
        req.session.user._id, {
          avatar: `/images/avatars/${req.file.filename}`
        }, {
          new: true
        }, (err, user) => {
          if (err) {
            console.log("============>   ", 4);
            res.status(500).json({
              msg: 'Server Error!'
            })
          } else {
            console.log(user);
            if (req.session.user.avatar && req.session.user.avatar !== '/images/avatars/default.png') {

              fs.unlink(path.join(__dirname, '../public', req.session.user.avatar), err => {
                if (err) {
                  console.log(400);
                  res.status(500).json({
                    msg: 'Server Error!'
                  })
                } else {
                  req.session.user = user;

                  res.redirect('/dashboard');
                }
              })


            } else {

              req.session.user = user;

              res.redirect('/dashboard');
            }
          }
        })
    }
  })
}


// ? ---------------------------------< Update backgrond_avatar >---------------------------- 
const uploadBackgrondAvatar = (req, res) => {

  const upload = generalTools.uploadBackgrondAvatar.single('background_cover');
  console.log(1);


  upload(req, res, function (err) {
    console.log(err);

    if (err instanceof multer.MulterError) {
      res.status(500).send('Server Error :/')

    } else if (err) {

      res.status(400).send("Bad Request!")

    } else {
      console.log(1);
      User.findByIdAndUpdate(
        req.session.user._id, {
          background_cover: `/images/background_cover/${req.file.filename}`
        }, {
          new: true
        }, (err, user) => {
          if (err) {

            res.status(500).json({
              msg: 'Server Error!'
            })
          } else {

            if (req.session.user.background_cover && user.background_cover !== '/images/background_cover/default.jpg') {
              req.session.user = user;

              res.redirect('/dashboard');
            } else {
              fs.unlink(path.join(__dirname, '../public', req.session.user.background_cover), err => {
                if (err) {
                  console.log(400);
                  res.status(500).json({
                    msg: 'Server Error!'
                  })
                } else {
                  req.session.user = user;

                  res.redirect('/dashboard');
                }
              })

            }
          }
        })
    }
  })
}



module.exports = {
  userArticlePage,
  users,
  getAllUser,
  deletUser,
  // UpdateUser,
  UpdatePass,
  // UpdateUserAvatar,
  // uploadBackgrondAvatar,
}