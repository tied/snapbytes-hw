package com.example.plugins.snapbytes;

import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.changehistory.ChangeHistoryManager;
import com.atlassian.jira.plugin.webfragment.contextproviders.AbstractJiraContextProvider;
import com.atlassian.jira.plugin.webfragment.model.JiraHelper;
import com.atlassian.jira.user.ApplicationUser;

import java.util.HashMap;
import java.util.Map;

public class ShowLastComment extends AbstractJiraContextProvider {

    private final ChangeHistoryManager changeHistoryManager;

    public ShowLastComment(ChangeHistoryManager changeHistoryManager) {
        this.changeHistoryManager = changeHistoryManager;
    }

    @Override
    public Map<String, Object> getContextMap(final ApplicationUser applicationUser, final JiraHelper jiraHelper) {
        final Map<String, Object> contextMap = new HashMap<>();
        final Issue currentIssue = getCurrentIssue(jiraHelper);
        final String showLastComment = "LAST COMMENT";

        contextMap.put("showLastComment", showLastComment);

        return contextMap;
    }

    private Issue getCurrentIssue(final JiraHelper jiraHelper) {

        return (Issue) jiraHelper.getContextParams().get("issue");
    }

}
