define(['marionette'], function(Marionette){
    var Behaviors={};
    Marionette.Behaviors.behaviorsLookup = function() {
        return Behaviors;
    };

    Behaviors.Sortable=Marionette.Behavior.extend({ 
        onRender:function(){
            var  collection=this.view.collection,
                 items=this.view.children._views,
                 view;
            for(var v in items){
                view=items[v];
                view.$el.attr('data-backbone-cid',view.model.cid); // Привязываем элемент к модели по cid
            }
            this.$el.sortable({ // Делаем список сортируемым
                axis: this.options.axis||false,
                grid: this.options.grid||false,
                containment: this.options.containment||false,
                cursor: "move",
                handle:this.options.handle||false,
                revert: this.options.revert||false,
                update: function( event, ui ) {
                    var model=collection.get(ui.item.data('backbone-cid')); 
                    collection.remove(model,{silent:true});
                    collection.add(model,{at:ui.item.index(),silent:true});
                }
            });
            
        }
    });
return  Behaviors.Sortable;
});