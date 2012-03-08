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
