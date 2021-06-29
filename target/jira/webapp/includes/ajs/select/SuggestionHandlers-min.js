define("jira/ajs/select/suggestions/suggest-helper",["jira/ajs/list/group-descriptor","jira/ajs/list/item-descriptor","jira/ajs/select/fetchers/mixed-descriptor-fetcher","jira/ajs/select/fetchers/ajax-descriptor-fetcher","jira/ajs/select/fetchers/func-descriptor-fetcher","jira/ajs/select/fetchers/static-descriptor-fetcher","underscore"],function(e,t,s,r,i,n,a){"use strict";return{createDescriptorFetcher:function(e,t){return e.ajaxOptions&&e.ajaxOptions.url?t&&"mixed"===e.content?new s(e,t):new r(e.ajaxOptions):e.suggestions?new i(e):t?new n(e,t):void 0},extractItems:function(t){return a.flatten(a.map(t,function(t){return t instanceof e?t.items():[t]}))},mirrorQuery:function(s,r,i){var n=i?s.toUpperCase():s;return new e({label:"user inputted option",showLabel:!1,replace:!0}).addItem(new t({value:n,label:n,labelSuffix:" ("+r+")",title:n,allowDuplicate:!1,noExactMatch:!0}))},isSelected:function(e,t){return a.any(t,function(t){return e.value()===t.value()})},removeDuplicates:function(t,s){return s=s||[],a.filter(t,a.bind(function(t){return t instanceof e?(t.items(this.removeDuplicates(t.items(),s)),!0):a.include(s,t.value())?void 0:(t.value()&&s.push(t.value()),!0)},this))},removeSelected:function(s,r){return a.filter(s,a.bind(function(s){return!(s instanceof t&&this.isSelected(s,r))&&(s instanceof e&&s.items(this.removeSelected(s.items(),r)),!0)},this))}}}),define("jira/ajs/select/suggestions/default-suggest-handler",["jira/jquery/deferred","jira/lib/class","jira/ajs/select/suggestions/suggest-helper","underscore"],function(e,t,s,r){"use strict";return t.extend({init:function(e){this.options=e,this.descriptorFetcher=s.createDescriptorFetcher(e)},validateMirroring:function(e){return this.options.userEnteredOptionsMsg&&e.length>0},formatSuggestions:function(e,t){return this.validateMirroring(t)&&e.push(s.mirrorQuery(t,this.options.userEnteredOptionsMsg,this.options.uppercaseUserEnteredOnSelect)),e},execute:function(t,s){var i=new e,n=this.descriptorFetcher.execute(t,s).done(r.bind(function(e){e&&(e=this.formatSuggestions(e,t)),i.resolve(e,t)},this));return i.fail(function(){n.reject()}),i}})}),define("jira/ajs/select/suggestions/select-suggest-handler",["jira/ajs/select/suggestions/default-suggest-handler","jira/ajs/select/suggestions/suggest-helper"],function(e,t){"use strict";return e.extend({init:function(e,s){this.descriptorFetcher=t.createDescriptorFetcher(e,s),this.options=e,this.model=s},formatSuggestions:function(e,s){var r=this._super(e,s),i=this.model.getDisplayableSelectedDescriptors();return this.options.removeDuplicates&&(r=t.removeDuplicates(e)),t.removeSelected(r,i)}})}),define("jira/ajs/select/suggestions/assignee-suggest-handler",["jira/util/formatter","jira/ajs/select/suggestions/select-suggest-handler"],function(e,t){"use strict";return t.extend({formatSuggestions:function(t,s){var r=this._super(t,s);return 0===s.length&&r[0].footerText(e.I18n.getText("user.picker.ajax.short.desc")),r}})}),define("jira/ajs/select/suggestions/checkbox-multi-select-suggest-handler",["jira/util/formatter","jira/ajs/select/suggestions/select-suggest-handler","jira/ajs/select/suggestions/suggest-helper","jira/ajs/list/group-descriptor"],function(e,t,s,r){"use strict";return t.extend({createClearAll:function(){return"<li class='check-list-group-actions'><a class='clear-all' href='#'>"+e.I18n.getText("jira.ajax.autocomplete.clear.all")+"</a></li>"},formatSuggestions:function(e,t){var i=s.removeDuplicates(this.model.getDisplayableSelectedDescriptors()),n=new r({styleClass:"selected-group",items:i,actionBarHtml:i.length>1?this.createClearAll():null});if(e.splice(0,0,n),t.length>0){e=s.removeDuplicates(e);var a=s.extractItems(e).sort(function(e,t){return e=e.label().toLowerCase(),t=t.label().toLowerCase(),e.localeCompare(t)});e=[new r({items:a})]}return e}})}),define("jira/ajs/select/suggestions/user-list-suggest-handler",["jira/ajs/select/suggestions/select-suggest-handler"],function(e){"use strict";return e.extend({emailExpression:/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,validateMirroring:function(e){return this.options.freeEmailInput&&e.length>0&&this.emailExpression.test(e)}})}),define("jira/ajs/select/suggestions/only-new-items-suggest-handler",["jira/ajs/select/suggestions/select-suggest-handler","underscore"],function(e,t){"use strict";return e.extend({validateMirroring:function(e){if(this._super(e)){var s=e.toLowerCase(),r=this.model.getDisplayableSelectedDescriptors().concat(this.model.getDisplayableUnSelectedDescriptors());return!t.some(r,function(e){var t=e.label();return t&&t.toLowerCase()===s})}return!1}})}),define("jira/ajs/select/fetchers/static-descriptor-fetcher",["jira/jquery/deferred","jira/lib/class"],function(e,t){"use strict";return t.extend({init:function(e,t){this.model=t,this.model.$element.data("static-suggestions",!0)},execute:function(t){var s=new e;return s.resolve(this.model.getUnSelectedDescriptors(),t),s}})}),define("jira/ajs/select/fetchers/ajax-descriptor-fetcher",["jira/util/logger","jira/jquery/deferred","jira/lib/class","jira/ajs/ajax/smart-ajax","underscore"],function(e,t,s,r,i){"use strict";return s.extend({init:function(e){this.options=i.extend({keyInputPeriod:75,minQueryLength:1,data:{},dataType:"json"},e)},makeRequest:function(t,s,n){s.complete=i.bind(function(){this.outstandingRequest=null,e.trace("jira.suggestionhandler.done")},this),s.success=i.bind(function(e){s.query?t.resolve(s.formatResponse(e,n)):(this.lastResponse=s.formatResponse(e,n),t.resolve(this.lastResponse))},this);var a=s.error;s.error=function(e,s,i,n){n.aborted?"timeout"===n.statusText&&(a?a.apply(this,arguments):alert(r.buildSimpleErrorContent(n,{alert:!0})),t.resolve()):(a?a.apply(this,arguments):alert(r.buildSimpleErrorContent(n,{alert:!0})),t.resolve())},this.outstandingRequest=r.makeRequest(s)},incubateRequest:function(e,t,s,r){return clearTimeout(this.queuedRequest),r&&this.outstandingRequest&&(this.outstandingRequest.abort(),this.outstandingRequest=null),!t.query&&this.lastResponse?e.resolve(this.lastResponse):this.outstandingRequest?this.queuedRequest=setTimeout(i.bind(function(){this.incubateRequest(e,t,s,!0)},this),t.keyInputPeriod):("function"==typeof t.data?t.data=t.data(s):t.data.query=s,"function"==typeof t.url&&(t.url=t.url()),s.length>=parseInt(t.minQueryLength,10)||r?this.makeRequest(e,t,s):e.resolve()),e},execute:function(e,s){var r=new t;return r.fail(i.bind(function(){clearTimeout(this.queuedRequest),this.outstandingRequest&&this.outstandingRequest.abort()},this)),this.incubateRequest(r,i.extend({},this.options),e,s),r}})}),define("jira/ajs/select/fetchers/mixed-descriptor-fetcher",["jira/jquery/deferred","jira/lib/class","jira/ajs/select/fetchers/ajax-descriptor-fetcher","underscore"],function(e,t,s,r){"use strict";return t.extend({init:function(e,t){this.ajaxFetcher=new s(e.ajaxOptions),this.options=e,this.model=t},execute:function(t,s){var i=new e,n=this.options.ajaxOptions.minQueryLength;if(n="number"==typeof n&&isFinite(n)?n:1,t.length>=n){var a=this.ajaxFetcher.execute(t,s).done(r.bind(function(e){var s;s=this.options.suggestionAtTop?[].concat(this.model.getAllDescriptors(),e):[].concat(e,this.model.getAllDescriptors()),i.resolve(s,t)},this));i.fail(function(){a.reject()})}else i.resolve(this.model.getUnSelectedDescriptors(),t);return i}})}),define("jira/ajs/select/fetchers/func-descriptor-fetcher",["jira/jquery/deferred","jira/lib/class"],function(e,t){"use strict";return t.extend({init:function(e){this.options=e},execute:function(t){var s=new e;return s.resolve(this.options.suggestions(t),t),s}})}),AJS.namespace("AJS.SuggestHelper",null,require("jira/ajs/select/suggestions/suggest-helper")),AJS.namespace("AJS.DefaultSuggestHandler",null,require("jira/ajs/select/suggestions/default-suggest-handler")),AJS.namespace("AJS.SelectSuggestHandler",null,require("jira/ajs/select/suggestions/select-suggest-handler")),AJS.namespace("AJS.OnlyNewItemsSuggestHandler",null,require("jira/ajs/select/suggestions/only-new-items-suggest-handler")),AJS.namespace("AJS.CheckboxMultiSelectSuggestHandler",null,require("jira/ajs/select/suggestions/checkbox-multi-select-suggest-handler")),AJS.namespace("JIRA.AssigneeSuggestHandler",null,require("jira/ajs/select/suggestions/assignee-suggest-handler")),AJS.namespace("AJS.UserListSuggestHandler",null,require("jira/ajs/select/suggestions/user-list-suggest-handler")),AJS.namespace("AJS.StaticDescriptorFetcher",null,require("jira/ajs/select/fetchers/static-descriptor-fetcher")),AJS.namespace("AJS.AjaxDescriptorFetcher",null,require("jira/ajs/select/fetchers/ajax-descriptor-fetcher")),AJS.namespace("AJS.MixedDescriptorFetcher",null,require("jira/ajs/select/fetchers/mixed-descriptor-fetcher")),AJS.namespace("AJS.FuncDescriptorFetcher",null,require("jira/ajs/select/fetchers/func-descriptor-fetcher"));