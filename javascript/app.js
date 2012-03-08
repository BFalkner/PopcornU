//= require jquery
//= require underscore-min
//= require handlebars.min
//= require backbone
//= require stativus
//= require statechart
//= require_directory ./models
//= require_directory ./collections
//= require_directory ./views

$(function() {
  Statechart.initStates("base");
});
