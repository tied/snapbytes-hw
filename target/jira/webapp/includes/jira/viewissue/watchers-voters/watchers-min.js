define("jira/viewissue/watchers-voters/watchers",["require"],function(e){"use strict";function i(){return g||(g=new a({el:h("#inline-dialog-watchers").get(0)})),g}function s(e){return e.isReadOnly?n:e.canBrowseUsers?r:t}var n=e("jira/viewissue/watchers-voters/views/watchers-read-only-view"),t=e("jira/viewissue/watchers-voters/views/watchers-no-browse-view"),r=e("jira/viewissue/watchers-voters/views/watchers-view"),o=e("jira/viewissue/watchers-voters/entities/watchers-user-collection"),a=e("jira/viewissue/watchers-voters/views/watchers-inline-dialog-view"),c=e("jira/util/events"),l=e("jira/util/events/types"),w=e("jira/util/events/reasons"),u=e("jira/issue"),d=e("aui/inline-dialog"),v=e("jira/util/key-code"),h=e("jquery"),g=null;h(document).on("click","#view-watcher-list",function(e){e.preventDefault();var n=i(),t=h("#watching-toggle").next(".icon"),r=new o(u.getIssueKey());t.addClass("loading"),new(s(r))({collection:r}).render().done(function(e){t.removeClass("loading"),n.contents(e),n.show()}),r.on("errorOccurred",function(){n.hide()})}),h(document).on("keydown",function(e){g&&e.keyCode===v.ESCAPE&&d.current!==g.el&&g.isVisible()&&(d.current&&d.current.hide(),g.hide())}),h(document).on("click",function(e){if(g){0===h(e.target).closest("#inline-dialog-watchers, #watchers-suggestions").length&&g.isVisible()&&g.hide()}}),c.bind(l.NEW_CONTENT_ADDED,function(e,s,n){n===w.panelRefreshed&&s.is("#peoplemodule")&&i().setElement(s.find("#inline-dialog-watchers").get(0))})});