AJS.test.require(["jira.webresources:jira-global", "com.atlassian.auiplugin:dialog2"], function () {
    'use strict';

    var jQuery = require('jquery');
    var analytics = require('jira/analytics');

    module("Link issue dialog web-resources tests", {
        setup: function setup() {
            this.wrmRequire = sinon.stub();

            this.analytics = jQuery.extend({}, analytics);
            this.stubbedSendMethod = sinon.stub(this.analytics, 'send');

            this.stubbedDialog2Method = sinon.spy(AJS, 'dialog2');

            this.context = AJS.test.mockableModuleContext();
            this.context.mock('wrm/require', this.wrmRequire);
            this.context.mock('jira/analytics', this.analytics);

            this.linkIssueFactory = this.context.require('jira/dialog/link-issue-dialog-factory');
            this.wrcName = this.linkIssueFactory.webResourcesContextName();
            this.linkDialog = this.linkIssueFactory.createLinkIssueDialog("link-issue");
        },
        teardown: function teardown() {
            this.linkDialog.hide();
            jQuery('#link-issue-error-dialog').remove();
            sinon.restore(this.stubbedDialog2Method);
        }
    });

    test("Warning is not displayed when web-resources load successfully", function () {
        this.wrmRequire.withArgs('wrc!' + this.wrcName).returns(new jQuery.Deferred().resolve().promise());

        this.linkDialog.show();

        ok(this.stubbedSendMethod.notCalled, "analytics event was not sent");
        ok(this.stubbedDialog2Method.notCalled, "warning message was not displayed");
    });

    test("Warning is displayed at loading web-resources failure", function () {
        this.wrmRequire.withArgs('wrc!' + this.wrcName).returns(new jQuery.Deferred().reject('WRM error').promise());

        this.linkDialog.show();

        ok(this.stubbedSendMethod.calledOnce, "analytics event was sent");
        ok(this.stubbedDialog2Method.calledOnce, "warning message was displayed");
    });
});