var AppData = {},
    Statechart = Stativus.Statechart.create();

Statechart.addState("base", {
  initialSubstate: "playing",

  enterState: function() {
    var movie = new Movie({
        title: "Aladdin",
        challenges: new Backbone.Collection([
          new Challenge({
            movie: movie,
            name: "sample",
            question: "This is a question.",
            trigger_time: 30,
            points: 3,
            answers: [
              {text: "Here's an answer.", isCorrect: false},
              {text: "This one is right.", isCorrect: true},
              {text: "This one is not.", isCorrect: false}]
          })])
      });

    var account = new Account({
        sessions: [new Session({
          movie: movie,
          account: account
        })]
      });

    AppData.session = new Session({
      movie: movie,
      account: account
    });
  }
});

Statechart.addState("dashboard", {
  parentState: "base"
});

Statechart.addState("playing", {
  parentState: "base",
  initialSubstate: "waiting",

  _view: null,

  enterState: function() {
    this._view = new PlayingView({session: AppData.session})
      .setElement("#app")
      .render();
  }
})
