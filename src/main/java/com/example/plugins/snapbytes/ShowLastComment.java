package com.example.plugins.snapbytes;

import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.changehistory.ChangeHistory;
import com.atlassian.jira.issue.changehistory.DefaultChangeHistoryManager;
import com.atlassian.jira.plugin.webfragment.contextproviders.AbstractJiraContextProvider;
import com.atlassian.jira.plugin.webfragment.model.JiraHelper;
import com.atlassian.jira.user.ApplicationUser;
import lombok.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
public class ShowLastComment extends AbstractJiraContextProvider {

    private final DefaultChangeHistoryManager changeHistoryManager;

    @Override
    public Map<String, Object> getContextMap(final ApplicationUser user, final JiraHelper jiraHelper) {
        final Issue currentIssue = getCurrentIssue(jiraHelper);
        final List<ChangeHistory> changeHistory = getChangeHistory(currentIssue);
        final ChangeHistory lastChange = getLastChange(changeHistory);
        final String showLastComment = lastChange.getComment();

        final Map<String, Object> contextMap = new HashMap<>();

        contextMap.put("showLastComment", showLastComment);

        return contextMap;
    }

    private Issue getCurrentIssue(final JiraHelper jiraHelper) {

        return (Issue) jiraHelper.getContextParams().get("issue");
    }

    private List<ChangeHistory> getChangeHistory(final Issue issue) {

        return changeHistoryManager.getChangeHistories(issue);
    }

    private ChangeHistory getLastChange(final List<ChangeHistory> changeHistory) {

        return changeHistory.get(changeHistory.size() - 1);
    }

}
