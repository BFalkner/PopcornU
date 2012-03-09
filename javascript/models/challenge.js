/*
* movie
* title
* question
* trigger_time
* points
* answers - list (text, isCorrect)
* response - (answer, timestamp)
*/
var Challenge = Backbone.Model.extend({
  defaults: {
    isActive: false,
    isAnswered: false
  },

  initialize: function(params) {
    if (params.answers instanceof Array)
      this.set("answers", new Backbone.Collection(params.answers));
  },

  answer: function(answer, silent) {
    this.set({
      response: {
        answer: answer,
        timestamp: Date.now()
      },
      isAnswered: true,
      isActive: false,
      isCorrent: answer.isCorrent
    }, _.defaults({silent: silent}, {silent: false}));
  }
});
