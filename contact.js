(function(){

  // === Namespaces ===

  window.Contact = {
    Models: {},
    Views: {},
    Collections : {},
    Router: {}
  };

  // === Views ===

  Contact.Views.task = Backbone.View.extend({
    tagName: 'li',

    initialize: function(){
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
    },

    template: _.template('<%= name %> | <%= status %> <button class="edit">Edit</button> <button class="delete">Delete</button>'),

    events: {
      'click .edit': 'edit',
      'click .delete': 'delete'
    },

    render: function(){
      this.$el.html( this.template(this.model.toJSON()) );
      return this;
    },

    delete: function(){
      this.model.destroy();
    },

    remove: function(){
      this.$el.remove();
    },

    edit: function(){
      newName = prompt(this.model.get('name'));
      this.model.set('name', newName);
    }

  });

  Contact.Views.tasks = Backbone.View.extend({
    tagName: 'ul',

    render: function() {
      this.collection.each(function(task){
        this.addOne(task);
      }, this);

      return this;
    },

    addOne: function(task) {
      taskView = new Contact.Views.task({ model: task });
      this.$el.append(taskView.render().el);
    }
  });

  // === Models ===

  Contact.Models.task = Backbone.Model.extend({
    defaults: {
      name: '',
      status: 'not-complete' 
    }
  }); 

  // === Collections ===

  Contact.Collections.tasks = Backbone.Collection.extend({
    model: Contact.Models.task
  });

  // === Helpers ===

  var appendTasksToBody = function(){
    $(document.body).append(tasksView.render().el);
  };

  // === Runtime === 

  tasks = new Contact.Collections.tasks([
    { name: 'task'},
    { name: 'task'},
    { name: 'task'}
  ]);

  tasksView = new Contact.Views.tasks({ collection: tasks });

  $(appendTasksToBody);

})();