//= require jquery
//= require underscore-min
//= require handlebars.min
//= require backbone
//= require stativus
//= require_directory ./models
//= require_directory ./collections
//= require_directory ./views

$(function() {
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

  var session = new Session({
    movie: movie,
    account: account
  });

  PlayingSC.initStates("waiting");
  new PlayingView({session: session})
    .setElement("#app")
    .render();
});
