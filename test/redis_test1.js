const { expect } = require("chai");

const redis = require("../middleware/redis");

let redisClient;

describe("redis collections Test", () => {
  before("create redis client", () => {
    redisClient = new redis();
  });

  const data = { key: "jun", val: "good" };

  it("String::set Test", (done) => {
    redisClient.set(data.key, data.val, (err, res) => {
      if (err) {
        console.error(err);
        return done(err);
      }
      expect(res).to.equal("OK");
      done();
    });
  });

  it("String::get Test", (done) => {
    redisClient.get(data.key, (err, value) => {
      if (err) {
        console.error(err);
        return done(err);
      }
      expect(value).to.equal(data.val);
      done();
    });
  });

  it("String::del Test", (done) => {
    redisClient.del(data.key, (err, affectedCnt) => {
      if (err) {
        console.error(err);
        return done(err);
      }
      expect(affectedCnt).to.equal(1);
      done();
    });
  });

  after("redis connection close", (done) => {
    redisClient.quit(done);
  });
});
