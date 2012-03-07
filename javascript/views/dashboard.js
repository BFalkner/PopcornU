/* (Session) */
var DashboardView = Backbone.View.extend({
    el: "#dashboard",

    initialize: function() {
        this.session = this.options.session;
        this.template = Handlebars.compile($("#dashboard-template").html());
        this.render();
    },

    render: function() {
        this.$el.html(this.template(this.session));
        return this;
    }
});
