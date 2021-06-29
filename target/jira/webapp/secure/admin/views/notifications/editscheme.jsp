
<%@ taglib uri="webwork" prefix="ww" %>
<%@ taglib uri="webwork" prefix="ui" %>
<%@ taglib uri="sitemesh-page" prefix="page" %>

<html>
<head>
	<title><ww:text name="'admin.schemes.notifications.edit.notification.scheme'"/></title>
    <meta name="admin.active.section" content="admin_issues_menu/misc_schemes_section"/>
    <meta name="admin.active.tab" content="notification_schemes"/>
</head>

<body>

<page:applyDecorator name="jiraform">
    <page:param name="action">EditNotificationScheme.jspa</page:param>
    <page:param name="submitId">update_submit</page:param>
    <page:param name="submitName"><ww:text name="'common.forms.update'"/></page:param>
    <page:param name="cancelURI">ViewNotificationSchemes.jspa</page:param>
    <page:param name="title"><ww:text name="'admin.schemes.notifications.edit.notification.scheme'"/>: <ww:property value="scheme/string('name')" /></page:param>
    <page:param name="width">100%</page:param>

    <ui:textfield label="text('common.words.name')" name="'name'" size="'30'" />
    <ui:textarea label="text('common.words.description')" name="'description'" cols="'30'" rows="'3'" />

    <ui:component name="'schemeId'" template="hidden.jsp" />
</page:applyDecorator>

</body>
</html>
