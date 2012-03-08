var ChallengeView = Backbone.View.extend({
  initialize: function(params) {
    this.challenge = params.challenge;
    this.template = Handlebars.compile($("#challenge-template").html());
  },

  render: function() {
    var data = {
      question: this.challenge.get("question"),
      answers: this.challenge.get("answers")
    }
    this.$el.html(this.template(data));
    return this;
  },

  events: {
    "click .challenge-answer-item": "answer"
  },

  answer: function(e) {
    Statechart.sendEvent("answered", null);
  }
});
