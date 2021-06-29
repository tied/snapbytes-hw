define("jira/components/color-picker/color-picker-controller",["jira/marionette-3.1","backbone","jira/components/color-picker/view/color-picker-view","jira/components/color-picker/sample-color/sample-colors-factory"],function(o,e,r,l){"use strict";return o.Object.extend({initialize:function(o){var n=this,i=o.value,c=o.id,t=o.name,s=o.errorMessage;this.model=new e.Model({color:null,colorDefined:!1,errorMessage:s,id:c,name:t}),this.sampleColorsCollection=l(),i&&this.model.set({color:i,colorDefined:!0}),this.view=new r({model:this.model,sampleColors:this.sampleColorsCollection}),this.view.on("colorChanged",function(o){n.onColorChange(n.model,o)}),this.view.render()},onColorChange:function(o,e){e?o.set({color:e,colorDefined:!0}):o.set({color:null,colorDefined:!1})},renderIntoElement:function(o){o.append(this.view.$el)}})});