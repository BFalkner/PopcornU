/* (Session) */
var PlayingView = Backbone.View.extend({
    initialize: function() {
        _.bindAll(this);
        this.session = this.options.session;
        this.template = Handlebars.compile($("#playing-template").html());
    },

    render: function() {
        var data = {
            progress: _.map(this.session.get("movie").get("challenges"), this._challengeData),
            points: this.session.points()
        };
        this.$el.html(this.template(data));
        return this;
    },

    _challengeData: function(challenge) {
        var isAnswered = this.session.isAnswered(challenge);
        var isActive = this.session.isActive(challenge);

        return {
            class: "progressItem" + (isAnswered ? "-answered" : "") + (isActive ? "-active" : ""),
            title: challenge.get("title")
        };
    }
});
