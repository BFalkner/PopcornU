/* (Session) */
var PlayingView = Backbone.View.extend({
  el: "#app",

  initialize: function() {
    _.bindAll(this);
    this.session = this.options.session;
    this.template = Handlebars.compile($("#playing-template").html());
    this.session.get("challenges").on("all", _.bind(this.render, this));
  },

  render: function() {
    var data = {
      title: this.session.get("movie").get("title"),
      progress: this.session.get("challenges").map(this._challengeData),
      points: this.session.points()
    };
    this.$el.html(this.template(data));
    return this;
  },

  _challengeData: function(challenge) {
    var isAnswered = challenge.get("isAnswered");
    var isActive = challenge.get("isActive");

    return {
      class: "progressItem"
        + (isAnswered ? "-answered" : "")
        + (isActive ? "-active" : ""),
      name: challenge.get("name")
    };
  },

  /* Events */

  events: {
    "click #playing-link-home": "home",
    "click #playing-link-play": "play",
    "click #playing-link-pause": "pause",
    "click .playing-progressItem": "challenge"
  },

  home: function(e) {
    Statechart.sendEvent("home");
    e.preventDefault();
  },
  play: function() {
    Statechart.sendEvent("play");
    e.preventDefault();
  },
  pause: function() {
    Statechart.sendEvent("pause");
    e.preventDefault();
  },
  challenge: function(e) {
    var name = $(e.target).data("challenge");
    var challenge = this.session.get("challenges")
      .find(function(c) { return c.get("name") === name; });
    Statechart.sendEvent("hasChallenge", challenge);
    e.preventDefault();
  }
});
