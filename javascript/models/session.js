/*
* movie
* account
* challenges
*/
var Session = Backbone.Model.extend({
    defaults: {
        "challenges": []
    },

    points: function() {
        return _.chain(this.get("challenges"))
            .select(function(challenge) { return challenge.get("response").answer.isCorrect; })
            .reduce(function(challenge, accum) { return challenge.get("points") + accum; }, 0)
            .value();
    }
});
