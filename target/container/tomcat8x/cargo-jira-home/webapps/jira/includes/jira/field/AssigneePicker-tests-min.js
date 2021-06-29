var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};AJS.test.require("jira.webresources:jira-global",function(){"use strict";var e=require("jquery"),t=require("jira/field/assignee-picker"),s=require("underscore");module("JIRA.AssigneePicker",{setup:function(){var t=e("#qunit-fixture");this.pickerSelect=e('<select id="assignee" name="assignee" class="single-user-picker js-assignee-picker aui-ss-select" data-show-dropdown-button="true" data-user-type="assignee" data-container-class="long-field" multiple="multiple" style="display: none;"><optgroup id="assignee-group-suggested" label="Suggestions" data-weight="0">  <option value="admin" data-field-text="admin" data-field-label="admin - admin@localhost (admin)" data-icon="/jira/secure/useravatar?size=xsmall&amp;avatarId=10122">admin</option>  <option value="" data-field-text="Unassigned" data-field-label="Unassigned" data-icon="/jira/secure/useravatar?size=xsmall&amp;avatarId=10123">Unassigned</option>  <option value="-1" data-field-text="Automatic" data-field-label="Automatic" data-icon="/jira/secure/useravatar?size=xsmall&amp;avatarId=10123">Automatic</option></optgroup></select>').appendTo(t);var l=sinon.useFakeXMLHttpRequest(),r=[];l.onCreate=function(e){r.push(e)};var o=0;this.testHelper={responseBuilder:function(e){for(var t=[],s=0;s<e;s++)t.push({name:"user"+o,displayName:"User "+o,emailAddress:"user"+o+"@local",avatarUrls:{"16x16":""}}),o++;return JSON.stringify(t)},scroll:function(e,t){e[0].scrollTop=t*e[0].scrollHeight/100,e.trigger("scroll")},respondWith:function(e){s.last(r).respond(200,{"Content-Type":"application/json"},this.responseBuilder(e))},urlFromLastRequest:function(){var e=s.last(r);return"object"===(void 0===e?"undefined":_typeof(e))?e.url:""},parseQueryString:function(e){return s.object(e.split("&").map(function(e){return e.split("=")}))},paramsFromLastRequest:function(){return this.parseQueryString(this.urlFromLastRequest().split("?")[1])}}},tearDown:function(){this.server.restore()}}),test("Selecting invalid Automatic assignee",function(){var e=new t({element:this.pickerSelect,editValue:"-1"});ok(!e.$container.hasClass("aui-ss-editing"),"input should not be in edit mode"),equal(e.$field.val(),"Automatic",'"Automatic" assignee should be displayed as string label')}),test("It should fetch the assignee list when the picker is opened",function(){var e=new t({element:this.pickerSelect});sinon.spy(e.suggestionsHandler.descriptorFetcher,"execute"),e._handleCharacterInput.call(e,!0),ok(e.suggestionsHandler.descriptorFetcher.execute.calledOnce,"AJAX called when the picker is opened"),equal(this.testHelper.paramsFromLastRequest().startAt,0),this.testHelper.respondWith(50),equal(e.listController.getAllItems().length,53,"Display 53  (3 suggestions + 50 new items)")}),test("It should NOT fetch the next results when user HASN'T scrolled down to the bottom yet",function(){var e=new t({element:this.pickerSelect});sinon.spy(e,"scrolledToBottomHandler"),sinon.spy(e.suggestionsHandler.descriptorFetcher,"execute"),e._handleCharacterInput.call(e,!0),ok(e.suggestionsHandler.descriptorFetcher.execute.calledOnce,"AJAX called when the picker is opened"),this.testHelper.respondWith(50),equal(e.listController.getAllItems().length,53,"Display 53  (3 suggestions + 50 new items)"),this.testHelper.scroll(e.dropdownController.$layer,50),stop(),s.defer(function(){ok(e.scrolledToBottomHandler.notCalled,"Scroll dropdown 50% and scrolledToBottomHandler is NOT triggered"),ok(e.suggestionsHandler.descriptorFetcher.execute.calledOnce,"AJAX NOT called"),equal(e.listController.getAllItems().length,53,"Still displaying 53 items"),start()})}),test("It should fetch the next results when user scrolls down to the bottom",function(){var e=new t({element:this.pickerSelect});sinon.spy(e,"scrolledToBottomHandler"),sinon.spy(e.suggestionsHandler.descriptorFetcher,"execute"),e._handleCharacterInput.call(e,!0),ok(e.suggestionsHandler.descriptorFetcher.execute.calledOnce,"AJAX called when the picker is opened"),this.testHelper.respondWith(50),equal(e.listController.getAllItems().length,53,"Display 53  (3 suggestions + 50 new items)"),this.testHelper.scroll(e.dropdownController.$layer,100),stop(),s.defer(function(){ok(e.scrolledToBottomHandler.calledOnce,"Scroll dropdown 100% and scrolledToBottomHandler is triggered"),ok(e.suggestionsHandler.descriptorFetcher.execute.calledTwice,"AJAX called to load next items"),this.testHelper.respondWith(50),equal(e.listController.getAllItems().length,103,"Display 103  (last 53 items + 50 new items)"),this.testHelper.scroll(e.dropdownController.$layer,100),s.defer(function(){ok(e.scrolledToBottomHandler.calledTwice,"Scroll dropdown 100% and scrolledToBottomHandler is triggered"),ok(e.suggestionsHandler.descriptorFetcher.execute.calledThrice,"AJAX called to load next items"),this.testHelper.respondWith(50),equal(e.listController.getAllItems().length,153,"Display 153 items (last 103 items + 50 new items)"),start()}.bind(this))}.bind(this))}),test("It should NOT send request to server when all results displayed",function(){var e=new t({element:this.pickerSelect});sinon.spy(e,"scrolledToBottomHandler"),sinon.spy(e.suggestionsHandler.descriptorFetcher,"execute"),e._handleCharacterInput.call(e,!0),ok(e.suggestionsHandler.descriptorFetcher.execute.calledOnce,"AJAX called when the picker is opened"),this.testHelper.respondWith(50),equal(e.listController.getAllItems().length,53,"Display 53 items (3 suggestions + 50 new items)"),this.testHelper.scroll(e.dropdownController.$layer,100),stop(),s.defer(function(){ok(e.scrolledToBottomHandler.calledOnce,"Scroll dropdown 100% and scrolledToBottomHandler is triggered"),ok(e.suggestionsHandler.descriptorFetcher.execute.calledTwice,"AJAX called to load next items"),equal(this.testHelper.paramsFromLastRequest().startAt,51,"The next query should ask for user list offset by already given + 1"),this.testHelper.respondWith(0),equal(e.listController.getAllItems().length,53,"Display 53 items (last 53 items + 0 new items)"),this.testHelper.scroll(e.dropdownController.$layer,10),this.testHelper.scroll(e.dropdownController.$layer,100),s.defer(function(){ok(e.scrolledToBottomHandler.calledTwice,"Scroll dropdown 100% and scrolledToBottomHandler is triggered"),ok(e.suggestionsHandler.descriptorFetcher.execute.calledTwice,"AJAX NOT called"),equal(e.listController.getAllItems().length,53,"Still displaying 53 items"),start()})}.bind(this))}),test("It should NOT send request to server when user keeps clicking on the field",function(){var e=new t({element:this.pickerSelect}),l=e.$container.find("#assignee-field");sinon.spy(e.suggestionsHandler.descriptorFetcher,"execute"),stop(),s.delay(function(){l.click(),this.testHelper.respondWith(50),ok(e.suggestionsHandler.descriptorFetcher.execute.calledOnce,"Click on assignee field for the 1st time, request was sent to retrieve data"),l.click(),ok(e.suggestionsHandler.descriptorFetcher.execute.calledOnce,"Click on assignee field for the 2nd time, NO request was sent"),l.click(),ok(e.suggestionsHandler.descriptorFetcher.execute.calledOnce,"Click on assignee field for the 3rd time, NO request was sent"),start()}.bind(this),100)})});