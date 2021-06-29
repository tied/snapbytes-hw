AJS.test.require(["jira.webresources:edit-project-details"],function(){function e(){var e='<div id="container"><form><div><select class="project-type-select select" name="projectTypeKey" id="projectTypeKey">';return o.each(c,function(t){e+='<option value="'+t+'">'+t+"</option>"}),e+="</select></div></form></div>"}function t(e){e.mock("jira/project/edit/project-type-field",require("jira/project/edit/project-type-field")),e.mock("jira/project/edit/project-category-field",require("jira/project/edit/project-category-field"));var t=require("jira/ajs/contentretriever/content-retriever");e.mock("jira/ajs/contentretriever/content-retriever",t)}var r,i=require("jquery"),o=require("underscore");module("JIRA.Project.EditProjectDetails",{setup:function(){this.$container=i(e()),this.$form=this.$container.find("form"),i("#qunit-fixture").append(this.$container);var o=AJS.test.mockableModuleContext();this.mockMetrics={start:sinon.spy(),end:sinon.spy()},o.mock("internal/browser-metrics",this.mockMetrics),t(o),r=o.require("jira/project/edit-project-details")}}),test("Browser metrics are triggered for loading the editProjectDetails",function(){ok(!this.mockMetrics.start.called,"Metrics start should not have been called");var e=new r({el:this.$form});ok(this.mockMetrics.start.calledOnce,"Metrics start should now have been called"),deepEqual(this.mockMetrics.start.args[0],[{key:e.LOADED_METRICS_KEY,isInitial:!0}],"Metric arguments for start are correct"),ok(this.mockMetrics.end.calledOnce,"Metrics end should now have been called"),deepEqual(this.mockMetrics.end.args[0],[{key:e.LOADED_METRICS_KEY}],"Metric arguments for end are correct")}),test("If in dialog browser metrics are not triggered",function(){this.$container.addClass("jira-dialog"),new r({el:this.$form}),ok(!this.mockMetrics.start.called,"Metrics start should not have been called in a dialog"),ok(!this.mockMetrics.end.called,"Metrics end should not have been called in a dialog")});var c=["business","software","service_desk"]});