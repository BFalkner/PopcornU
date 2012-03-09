var AppData = {},
    Statechart = Stativus.Statechart.create();

Statechart.addState("base", {
  initialSubstate: "playing",

  enterState: function() {
    var movie = new Movie({
        title: "Spy Kids: All the Time in the World <span>(89 min.)</span>",
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
          }),
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
          }),
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
          }),
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
          }),
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
  parentState: "base",

  _view: null,

  willEnterState: function(statechart) {
    this._view = new DashboardView();

    slide(
      _.bind(function() {
        this._view.setElement("#app");
        this._view.render();
      }, this),
      function() { statechart.restart(); });
    return true;
  },

  exitState: function() {
    this._view.undelegateEvents();
    this._view = null;
  },

  play: function() {
    this.goToState("playing");
  }
});

Statechart.addState("playing", {
  parentState: "base",
  initialSubstate: "waiting",

  _view: null,

  willEnterState: function(statechart) {
    this._view = new PlayingView({session: AppData.session});

    slide(
      _.bind(function() {
        this._view.setElement("#app");
        this._view.render();
      }, this),
      function() { statechart.restart(); });
    return true;
  },

  exitState: function() {
    this._view.undelegateEvents();
    this._view = null;
  },

  home: function() {
    this.goToState("dashboard");
  },

  play: function() {

  },

  pause: function() {

  }
});

function slide(render, complete) {
  $("#app").attr("id", "oldApp");
  var oldApp = $("#oldApp");
  var newApp = $('<div id="app"></div>').css("left", "100%");
  oldApp.after(newApp);
  render();
  newApp.one("webkitTransitionEnd", function() {
    oldApp.remove();
    complete();
  });
  setTimeout(function() {
    oldApp.css({left: "-100%"});
    newApp.css({left: "0"});
  });
}
