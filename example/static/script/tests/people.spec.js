require('static/script/vendor/pagination.js');
require('static/script/app/person.js');

describe ("Pagination Tests", function(){

  var sut, models, first, second, third;

  beforeEach(function(){
    first = Ember.Object.create({id: 1, username: 'first'});
    second = Ember.Object.create({id: 2, username: 'second'});
    third = Ember.Object.create({id: 3, username: 'third'});
    sut = PersonApp.PersonController.create();
    sut.set("content", [first, second, third]);
  });

  it ("paginated content will return 2 items when itemsPerPage set to 2", function(){
    sut.set('itemsPerPage', 2);
    sut.set('selectedPage', 1);
    var content = sut.get('paginatedContent');
    expect(content.get('length')).toEqual(2);
  });

  it ("paginated content will return 3 items when itemsPerPage set to 3", function(){
    sut.set('itemsPerPage', 3);
    sut.set('selectedPage', 1);
    var content = sut.get('paginatedContent');
    expect(content.get('length')).toEqual(3);
  });

  it ("the first paginated model on the first page is at the zero index", function(){
    sut.set('itemsPerPage', 2);
    sut.set('selectedPage', 1);
    var content = sut.get('paginatedContent');
    expect(content.objectAt(0).get('id')).toEqual(1);
  });

  it ("the second paginated model on the first page is at the one index", function(){
    sut.set('itemsPerPage', 2);
    sut.set('selectedPage', 1);
    var content = sut.get('paginatedContent');
    expect(content.objectAt(1).get('id')).toEqual(2);
  });

  it ("the first paginated model on the second page is at the zero index", function(){
    sut.set('itemsPerPage', 2);
    sut.set('selectedPage', 2);
    var content = sut.get('paginatedContent');
    expect(content.objectAt(0).get('id')).toEqual(3);
  });

  it ("the third paginated model on the first page is legit when itemsPerPage set to 3", function(){
    sut.set('itemsPerPage', 3);
    sut.set('selectedPage', 1);
    var content = sut.get('paginatedContent');
    expect(content.objectAt(2).get('id')).toEqual(3);
  });

  it ("the paginated content is updated when a fourth model is added dynamically", function() {
    sut.set('itemsPerPage', 2);
    sut.set('selectedPage', 2);
    var initial = sut.get('paginatedContent');
    expect(initial.get('length')).toEqual(1);
    var fourth = Ember.Object.create({id: 4, username: 'new_guy'});
    sut.get('content').pushObject(fourth);
    var content = sut.get('paginatedContent');
    expect(content.get('length')).toEqual(2);
  });

  it ("the available pages is based on the page configuration", function(){
    sut.set('itemsPerPage', 1);
    sut.set('selectedPage', 1);
    var available = sut.get('availablePages');
    expect(available).toEqual(3);
  });

  it ("the available pages property is one when itemsPerPage is 3", function(){
    sut.set('itemsPerPage', 3);
    sut.set('selectedPage', 1);
    var available = sut.get('availablePages');
    expect(available).toEqual(1);
  });

  it ("the available pages is also based on the number of models in the array", function(){
    sut.set('itemsPerPage', 2);
    sut.set('selectedPage', 1);
    var available = sut.get('availablePages');
    expect(available).toEqual(2);
  });

  it ("the available pages property is updated when a fifth model is added dynamically", function() {
    sut.set('itemsPerPage', 2);
    sut.set('selectedPage', 1);
    var initial = sut.get('availablePages');
    expect(initial).toEqual(2);
    var fourth = Ember.Object.create({id: 4, username: 'new_guy'});
    var fifth = Ember.Object.create({id: 5, username: 'last_one'});
    sut.get('content').pushObject(fourth);
    sut.get('content').pushObject(fifth);
    var available = sut.get('availablePages');
    expect(available).toEqual(3);
  });

  it ("the previous page property returns page with id 1 when the selectedPage is 2", function(){
    sut.set('itemsPerPage', 2);
    sut.set('selectedPage', 2);
    var prev = sut.get('prevPage');
    expect(prev.get('id')).toEqual(1);
  });

  it ("the previous page property returns page with id 1 when the selectedPage is 1", function(){
    sut.set('itemsPerPage', 2);
    sut.set('selectedPage', 1);
    var prev = sut.get('prevPage');
    expect(prev.get('id')).toEqual(1);
  });

  it ("the previous page property is updated when new a new page is selected", function(){
    sut.set('itemsPerPage', 1);
    sut.set('selectedPage', 3);
    var initial = sut.get('prevPage');
    expect(initial.get('id')).toEqual(2);
    sut.set('selectedPage', 2);
    var prev = sut.get('prevPage');
    expect(prev.get('id')).toEqual(1);
  });

  it ("the next page property returns page with id 2 when the selectedPage is 1", function(){
    sut.set('itemsPerPage', 2);
    sut.set('selectedPage', 1);
    var next = sut.get('nextPage');
    expect(next.get('id')).toEqual(2);
  });

  it ("the next page property returns page with id 2 when the selectedPage is 2", function(){
    sut.set('itemsPerPage', 2);
    sut.set('selectedPage', 2);
    var next = sut.get('nextPage');
    expect(next.get('id')).toEqual(2);
  });

  it ("the next page property is updated when new a new page is added", function(){
    sut.set('itemsPerPage', 1);
    sut.set('selectedPage', 3);
    var initial = sut.get('nextPage');
    expect(initial.get('id')).toEqual(3);
    var fourth = Ember.Object.create({id: 4, username: 'new_guy'});
    sut.get('content').pushObject(fourth);
    var next = sut.get('nextPage');
    expect(next.get('id')).toEqual(4);
  });

  it ("the next page property is updated when new a new page is selected", function(){
    sut.set('itemsPerPage', 1);
    sut.set('selectedPage', 1);
    var initial = sut.get('nextPage');
    expect(initial.get('id')).toEqual(2);
    sut.set('selectedPage', 2);
    var next = sut.get('nextPage');
    expect(next.get('id')).toEqual(3);
  });

  it ("the current page defaults to 1", function(){
    expect(sut.get('currentPage')).toEqual(1);
  });

  it ("the current page uses the selected page value", function(){
    sut.set('selectedPage', 2);
    expect(sut.get('currentPage')).toEqual(2);
  });

  it ("the current page will parseInt the selectedPage value", function(){
    sut.set('selectedPage', '010');
    expect(sut.get('currentPage')).toEqual(10);
  });

  it ("will return 3 pages when itemsPerPage is set to 1", function() {
    sut.set('itemsPerPage', 1);
    sut.set('selectedPage', 1);
    var pages = sut.get('pages');
    expect(pages.get('length')).toEqual(3);
    expect(pages.objectAt(0)).toEqual({'page_id':'1'});
    expect(pages.objectAt(1)).toEqual({'page_id':'2'});
    expect(pages.objectAt(2)).toEqual({'page_id':'3'});
  });

  it ("will return 2 pages when itemsPerPage is set to 2", function() {
    sut.set('itemsPerPage', 2);
    sut.set('selectedPage', 1);
    var pages = sut.get('pages');
    expect(pages.get('length')).toEqual(2);
    expect(pages.objectAt(0)).toEqual({'page_id':'1'});
    expect(pages.objectAt(1)).toEqual({'page_id':'2'});
  });

  it ("will add another page when a fourth item is added dynamically", function() {
    sut.set('itemsPerPage', 1);
    sut.set('selectedPage', 1);
    var initial = sut.get('pages');
    expect(initial.get('length')).toEqual(3);
    var fourth = Ember.Object.create({id: 4, username: 'new_guy'});
    sut.get('content').pushObject(fourth);
    var pages = sut.get('pages');
    expect(pages.get('length')).toEqual(4);
  });

});
