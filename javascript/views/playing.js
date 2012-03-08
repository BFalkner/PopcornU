var PlayingSC = Stativus.Statechart.create();

PlayingSC.addState("waiting", {
  hasChallenge: function(challenge) {
    this.setData("challenge", challenge);
    this.goToState("challenge");
  },

  home: function() {
  },

  play: function() {

  },

  pause: function() {

  },
});

PlayingSC.addState("challenge", {
  enterState: function() {
    var challenge = this.getData("challenge");
    var view = new ChallengeView(challenge);
    view.setElement("#playing-challenge");
    view.render();
    this.setData("view", view);
  },

  exitState: function() {
    var view = this.getData("view");
    view.$el.empty();
    this.setData("view");
  }
});

/* (Session) */
var PlayingView = Backbone.View.extend({
  initialize: function() {
    _.bindAll(this);
    this.session = this.options.session;
    this.template = Handlebars.compile($("#playing-template").html());
  },

  render: function() {
    var data = {
      title: this.session.get("movie").get("title"),
      progress: this.session.get("movie").get("challenges").map(this._challengeData),
      points: this.session.points()
    };
    this.$el.html(this.template(data));
    return this;
  },

  _challengeData: function(challenge) {
    var isAnswered = this.session.isAnswered(challenge);
    var isActive = this.session.isActive(challenge);

    return {
      class: "progressItem"
        + (isAnswered ? "-answered" : "")
        + (isActive ? "-active" : "")
    };
  },

  /* Events */

  events: {
    "click #playing-link-home": "home",
    "click #playing-link-play": "play",
    "click #playing-link-pause": "pause",
    "click #challenge": "challenge"
  },

  home: function() { PlayingSC.sendEvent("home"); },
  play: function() { PlayingSC.sendEvent("play"); },
  pause: function() { PlayingSC.sendEvent("pause"); },
  challenge: function(e) {
    var challenge = this.session.get("movie").get("challenges").first();
    PlayingSC.sendEvent("hasChallenge", challenge);
    e.preventDefault();
  }
});
