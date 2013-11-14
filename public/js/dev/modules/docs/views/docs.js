define([
    'jquery',
    'underscore',
    'backbone',
    'json!../json/docs.json',
    'text!../templates/docs.html',
    'text!../templates/doc.html',
    'text!../templates/function.html',
    'text!../templates/event.html'
], function ($, _, Backbone, docs, template, docTemplate, functionTemplate, eventTemplate) {
    var View = Backbone.View.extend({
            events: {},
            initialize: function() {
            },
            render: function() {
                this.$el.html(_.template(template, {
                    docs: docs,
                    templates: {
                        doc: docTemplate,
                        e: eventTemplate,
                        func: functionTemplate
                    },
                    jsRepoUrl: 'https://github.com/adamwdraper/appular-express-app/blob/master/public'
                }));

                return this;
            }
        });

    return View;
});