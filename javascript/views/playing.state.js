Statechart.addState("waiting", {
  parentState: "playing",

  enterState: function() {
    this.getData("view").render();
  },

  hasChallenge: function(challenge) {
    AppData.challenge = challenge;
    this.goToState("challenge");
  }
});

Statechart.addState("challenge", {
  parentState: "playing",

  _view: null,

  willEnterState: function(statechart) {
    AppData.challenge.set("isActive", true);
    this._view = new ChallengeView({challenge: AppData.challenge});
    this._view.setElement("#playing-challenge");
    this._view.$el.hide();
    this._view.render();

    this._view.$el.fadeIn(function() { statechart.restart(); });
    return true;
  },

  willExitState: function(statechart) {
    this._view.undelegateEvents();
    this._view.$el.fadeOut(function() { statechart.restart(); });
    return true;
  },

  exitState: function() {
    AppData.challenge = null;
    this._view.$el.empty();
    this._view = null;
  },

  answered: function(answer) {
    AppData.challenge.answer(answer, true);
    this.goToState("waiting");
  }
});
