var ChallengeView = Backbone.View.extend({
  initialize: function(params) {
    this.challenge = params.challenge;
    this.template = Handlebars.compile($("#challenge-template").html());
  },

  render: function() {
    this.$el.html(this.template(this.challenge));
    return this;
  }
});
