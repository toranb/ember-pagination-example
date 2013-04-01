PersonApp = Ember.Application.create();

PersonApp.PersonController = Ember.ArrayController.extend(Ember.PaginationMixin, {
    itemsPerPage: 2
});

PersonApp.PaginationView = Ember.View.extend({
    templateName: 'pagination',
    tagName: 'li',

    page: function() {
        return Ember.Object.create({id: this.get('content.page_id')});
    }.property()
});

PersonApp.Router.map(function(match) {
    this.resource("person", { path: "/" }, function() {
        this.route("page", { path: "/page/:page_id" });
    });
});

PersonApp.PersonPageRoute = Ember.Route.extend({
    model: function(params) {
        return Ember.Object.create({id: params.page_id});
    },
    setupController: function(controller, model) {
        this.controllerFor('person').set('selectedPage', model.get('id'));
    }
});

PersonApp.PersonRoute = Ember.Route.extend({
    model: function(params) {
        this.controllerFor('person').set('selectedPage', 1);
        return PersonApp.Person.find();
    }
});

PersonApp.Person = DS.Model.extend({
    username: DS.attr('string')
});

PersonApp.Store = DS.Store.extend({
    revision: 12,
    adapter: 'DS.FixtureAdapter'
});

PersonApp.Person.FIXTURES = [
    {id:1,username:'dave one'},
    {id:2,username:'dave two'},
    {id:3,username:'dave three'},
    {id:4,username:'dave four'},
    {id:5,username:'dave five'},
    {id:6,username:'dave six'},
    {id:7,username:'dave seven'}
];
