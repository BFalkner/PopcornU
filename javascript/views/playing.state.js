Statechart.addState("waiting", {
  parentState: "playing",

  hasChallenge: function(challenge) {
    AppData.challenge = challenge;
    this.goToState("challenge");
  },

  home: function() {
  },

  play: function() {

  },

  pause: function() {

  }
});

Statechart.addState("challenge", {
  parentState: "playing",

  _view: null,

  enterState: function() {
    this._view = new ChallengeView({challenge: AppData.challenge});
    this._view.setElement("#playing-challenge");
    this._view.render();
  },

  exitState: function() {
    this._view.$el.empty();
    this._view = null;
  }
});
