!function(n){n(function(){var e=n("body");if(e.hasClass("error500")&&n(".technical-details-header").click(function(){n(".technical-details").toggleClass("js-hidden"),n(this).toggleClass("opened")}),e.hasClass("new-installation-old-license")){var i=n("#confirm-new-installation-form-area");if(n("#confirm-new-installation-radio-options").length){var a=n("#confirm-new-installation-radio-options"),o=a.find('input[type="radio"]'),l=a.data("option"),t={license:n("#confirm-new-installation-license-area"),evaluation:n("#confirm-new-installation-evaluation-area"),"remove-expired":n("#confirm-new-installation-remove-expired-area")};o.bind("change",function(){var e=n(this).val();i.html(t[e].html()).removeClass("hidden")}),o.filter('[value="'+(l||"license")+'"]').change().prop("checked",!0)}}})}(jQuery||Zepto);