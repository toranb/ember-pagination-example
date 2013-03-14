PersonApp = Ember.Application.create();

PersonApp.PersonController = Ember.ArrayController.extend(Ember.PaginationMixin, {
    itemsPerPage: 2
});

PersonApp.PaginationView = Ember.View.extend({
    templateName: 'pagination',
    tagName: 'li',
    spanClasses: 'paginator pageNumber',

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

//the below is just basic data setup for the example (nothing pagination specific)
PersonApp.Person = DS.Model.extend({
    username: DS.attr('string')
}).reopenClass({
    find: function() {
        var one = PersonApp.Person.createRecord({id:1,username:'dave one'});
        var two = PersonApp.Person.createRecord({id:2,username:'dave two'});
        var three = PersonApp.Person.createRecord({id:3,username:'dave three'});
        var four = PersonApp.Person.createRecord({id:4,username:'dave four'});
        return [one,two,three,four];
    } 
});

PersonApp.Store = DS.Store.extend({
    revision: 11,
    adapter: DS.Adapter.create({
        createRecord: function(store, type, object) {
            console.log(object.toJSON());
        }
    })
});
