/*
* movie
* account
* challenges
*/
var Session = Backbone.Model.extend({
  defaults: {
    "answered_challenges": new Backbone.Collection()
  },

  points: function() {
    return this.get("answered_challenges")
      .select(function(challenge) { return challenge.get("response").get("answers").isCorrect; })
      .reduce(function(challenge, accum) { return challenge.get("points") + accum; }, 0);
  },

  isAnswered: function(challenge) {
    return _.chain(this.get("answered_challenges"))
      .map(function(c) { return c.get("title"); })
      .include(challenge.get("title"))
      .value();
  },

  isActive: function(challenge) {
    return this.get("active_challenge")
      ? this.get("active_challenge").get("title") === challenge.get("title")
      : false;
  }
});
