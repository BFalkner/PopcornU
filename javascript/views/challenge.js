var ChallengeView = Backbone.View.extend({
  initialize: function(params) {
    this.challenge = params.challenge;
    this.template = Handlebars.compile($("#challenge-template").html());
  },

  render: function() {
    var data = {
      question: this.challenge.get("question"),
      answers: this.challenge.get("answers").toJSON()
    }
    this.$el.html(this.template(data));
    return this;
  },

  events: {
    "click .challenge-answer-item": "answer"
  },

  answer: function(e) {
    var name = $(e.target).data("challenge");
    var answer = this.challenge.get("answers")
      .find(function(a) { return a.name == name; })
    Statechart.sendEvent("answered", answer);
    e.stopPropagation();
  }
});
