/**
 * @appular filter
 */

 define([
    'jquery',
    'underscore',
    'backbone',
    'template!./template.html',
    'plugins/select/view'
], function ($, _, Backbone, template, Select) {
    var View = Backbone.View.extend({
            template: template,
            events: {
                'keyup #keyword': 'keywordChanged'
            },
            initialize: function() {
                _.bindAll(this, 'setLocation');
            },
            render: function() {
                this.$el.html(this.template({
                    value: this.app.get('keyword')
                }));

                this.plugins.select = new Select({
                    el: '#location',
                    options: [
                        'San Francisco, CA',
                        'Phoenix, AZ',
                        'Boston, MA',
                        'Austin, TX'
                    ],
                    value: this.app.get('location')
                }).render();

                this.listenTo(this.plugins.select, 'change:value', this.setLocation);

                this.$keyword = $('#keyword');

                return this;
            },
            keywordChanged: _.debounce(function () {
                if (this.$keyword.val()) {
                    this.app.set('keyword', this.$keyword.val());
                }
            }, 500),
            setLocation: function (option, value) {
                this.app.set('location', value);
            }
        });

    return View;
});