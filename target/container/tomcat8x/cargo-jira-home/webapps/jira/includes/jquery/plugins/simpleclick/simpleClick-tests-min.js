AJS.test.require(["com.atlassian.jira.jira-issue-nav-plugin:common"],function(){var n=require("jquery");module("SimpleClick",{setup:function(){this.$container=n('<div class="container"><a href="blah">Blah</a></div>'),this.$anchor=this.$container.find("a")},clickEvent:function(){return n.Event("click")},shiftClickEvent:function(){return n.Event("click",{shiftKey:!0})},metaClickEvent:function(){return n.Event("click",{metaKey:!0})}}),test("Event bound on the anchor is triggered by a normal click",function(){var n=sinon.spy();this.$anchor.on("simpleClick",n),this.$anchor.trigger(this.clickEvent()),equal(n.callCount,1,"simpleClick handler is called once")}),test("Event bound on the anchor is not triggered by a meta click",function(){var n=sinon.spy();this.$anchor.on("simpleClick",n),this.$anchor.trigger(this.metaClickEvent()),equal(n.callCount,0,"simpleClick handler is not called")}),test("Event bound on the anchor is not triggered by a shift click",function(){var n=sinon.spy();this.$anchor.on("simpleClick",n),this.$anchor.trigger(this.shiftClickEvent()),equal(n.callCount,0,"simpleClick handler is not called")}),test("preventDefault() in a simpleClick event handler acts on the original click event",function(){this.$anchor.on("simpleClick",function(n){n.preventDefault()});var n=this.clickEvent();this.$anchor.trigger(n),equal(n.isDefaultPrevented(),!0,"Click event's default is prevented")}),test("Event delegation still works",function(){var n=sinon.spy();this.$container.on("simpleClick","a",n),this.$anchor.trigger(this.clickEvent()),equal(n.callCount,1,"Delegated handler on the container is called once")}),test("Removing the handler works",function(){var n=sinon.spy();this.$anchor.on("simpleClick",n),this.$anchor.off("simpleClick"),this.$anchor.trigger(this.clickEvent()),equal(n.callCount,0,"Event handler is not called after being removed")})});