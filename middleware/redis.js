const redis = require("redis");
const express = require("express");
const router = express.Router();
const EventEmitter = require("events");

module.exports = class {
  constructor() {
    this._setRedis();
  }

  quit(callback) {
    this.client.quit(callback);
  }

  _setRedis() {
    this._setRedisClient();

    this.client.on("connect", this._connectHandler);
    //connection error
    this.client.on("error", this._errorHandler);
    //connection close
    this.client.on("end", this._endHandler);
  }

  _errorHandler(err) {
    console.error("Redis connection Error!! >>", err);
  }

  _endHandler() {
    console.error("Redis connection close!!");
  }

  _connectHandler() {
    console.log("Redis connection!");
  }

  _subHandler(channel, count) {}

  set(key, value, callback) {
    this.client.set(key, JSON.stringify(value), callback);
  }

  get(key, callback) {
    this.client.get(key, callback);
  }

  del(key, callback) {
    this.client.del(key, callback);
  }

  publish(channel, message) {
    this.client.publish(channel, message);
  }

  subscribe(channel) {
    this.client.subscribe(channel, (message) => {
      global.eventEmitter.emit("receivePub", message);
    });
  }

  unsubscribe(channel) {
    this.client.unsubscribe(channel);
  }

  _setRedisClient() {
    this.client = redis.createClient({ host: "localhost", port: 6379 });
    this.eventEmitter = global.eventEmitter;
    try {
      this.client.connect();
    } catch (err) {
      console.log(err);
    }
  }
};
