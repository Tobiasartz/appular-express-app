/**
 * @appular demo
 */

 define([
    'jquery',
    'underscore',
    'backbone',
    'template!./template.html',
    './collection',
    './views/tip/view'
], function ($, _, Backbone, template, Venues, Tip) {
    var View = Backbone.View.extend({
            template: template,
            events: {},
            triggers: {
                'render': 'updateVenues'
            },
            collection: new Venues(),
            options: {
                lls: {
                    'San Francisco, CA': '37.7,-122.4',
                    'Phoenix, AZ': '33.4,-112.0',
                    'Boston, MA': '42.3,-71.0',
                    'Austin, TX': '30.2,-97.7'
                }
            },
            initialize: function() {
                this.listenTo(this.app, 'change:keyword change:location', this.updateVenues);
                this.listenTo(this.collection, 'sync', this.renderVenues);
            },
            render: function() {
                this.$el.html(this.template());

                this.trigger('render');

                return this;
            },
            updateVenues: function () {
                this.collection.ll = this.options.lls[this.app.get('location')];
                this.collection.keyword = this.app.get('keyword');

                this.collection.fetch({
                    reset: true
                });
            },
            renderVenues: function () {
                var tips = [];

                _.each(this.collection.first(3), function (tip) {
                    tips.push(new Tip({
                        model: tip
                    }).render().$el);
                });

                $('#tips-venues').empty().append(tips);
            }
        });

    return View;
});