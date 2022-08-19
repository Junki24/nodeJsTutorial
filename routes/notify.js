const express = require("express");
const router = express.Router();
const redis = require("../middleware/redis");

const subscriber = new redis();
const publisher = new redis();

//redis-test
const data = { key: "redis_test", val: "redis_answer" };

router.get("/setTest", function (req, res, next) {
  subscriber.set(data.key, data.val, (err, res) => {
    if (err) {
      console.error(err);
      return done(err);
    }
    console.log(res);
  });
});

router.get("/getTest", function (req, res, next) {
  subscriber.get(data.key, (err, value) => {
    if (err) {
      console.error(err);
      return done(err);
    }
    console.log(value);
  });
});

router.get("/delTest", function (req, res, next) {
  subscriber.del(data.key, (err) => {
    if (err) {
      console.error(err);
      return done(err);
    }
  });
});

//redis subscribe subject
router.get("/sub/:channel", function (req, res, next) {
  subscriber.subscribe(req.params.channel);
  res.send(req.params.channel);
});

//redis unsubscribe subject
router.get("/unsub/:channel", function (req, res, next) {
  subscriber.unsubscribe(req.params.channel);
  res.end();
});

//redis publish message to channel
router.get("/pub/:channel/:message", function (req, res, next) {
  publisher.publish(req.params.channel, req.params.message);
  res.end();
});

module.exports = router;
