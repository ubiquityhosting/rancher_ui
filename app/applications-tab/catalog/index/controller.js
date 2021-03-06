import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  catalogController: Ember.inject.controller('applications-tab.catalog'),
  category: Ember.computed.alias('catalogController.category'),
  selectedCatalog: Ember.computed.alias('catalogController.catalogid'),

  search: '',
  actions: {
    launch: function(model) {
      this.get('application').setProperties({
        launchCatalog: true,
        originalModel: model,
        environmentResource: null,
      });
    }
  },

  categories: Ember.computed.alias('model.categories'),

  catalogIds: Ember.computed.alias('model.catalogIds'),

  arrangedContent: function() {
    var search = this.get('search').toUpperCase();
    var result = [];

    if (!search) {
      return this.get('model.catalog');
    }

    this.get('model.catalog').forEach((item) => {
      if (item.name.toUpperCase().indexOf(search) >= 0 || item.description.toUpperCase().indexOf(search) >= 0) {
        result.push(item);
      }
    });
    return result;
  }.property('model.catalog', 'search')
});
