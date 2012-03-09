var DashboardView = Backbone.View.extend({
  initialize: function() {
    this.template = Handlebars.compile($("#dashboard-template").html());
  },

  render: function() {
    this.$el.html(this.template({}));
    return this;
  },

  events: {
    "click": "play"
  },

  play: function(e) {
    Statechart.sendEvent("play");
    e.preventDefault();
  }
});
