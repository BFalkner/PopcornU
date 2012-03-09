/*
* movie
* account
* challenges
*/
var Session = Backbone.Model.extend({
  initialize: function() {
    this.set("challenges", new Backbone.Collection(this
      .get("movie")
      .get("challenges")
      .map(function(challenge) { return challenge.clone(); })));
  },

  points: function() {
    return this.get("challenges")
      .select(function(challenge) { return challenge.get("isAnswered") && challenge.get("isCorrect"); })
      .reduce(function(challenge, accum) { return challenge.get("points") + accum; }, 0);
  }
});
