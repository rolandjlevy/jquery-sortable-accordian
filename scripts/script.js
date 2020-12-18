$(function() {
  // Comment
  $("#accordion").accordion({
    header: "> div > h3",
    event: "click",
    active: false,
    collapsible: true
  }).sortable({
    items: "> div",
    handle: "h3",
    revert: false,
    stop: function(e, ui) {
      var sectionList = $(this).sortable("toArray", { attribute: "data-section-id" });
      var sectionId = ui.item.context.dataset.sectionId;
      var index = ui.item.index();
      updateData({sectionId, sectionList});
      ui.item.children("h3").triggerHandler("focusout");
      $(this).accordion("refresh");
    }
  });

  $(".sortable").sortable({
    items: "> li",
    handle: ".draggable",
    revert: false,
    revertDuration: 50,
    placeholder: "ui-sortable-placeholder",
    sort: function(event, ui){ ui.item.addClass("selected"); },
    stop: function(event, ui){ ui.item.removeClass("selected"); },
    update: function(e, ui) {
      var questionList = $(this).sortable("toArray", { attribute: "data-item-id" });
      var sectionId = e.target.dataset.listId;
      var questionId = ui.item.context.dataset.itemId;
      var index = ui.item.index();
      updateData({sectionId, questionId, questionList});
    }
  });

  function updateData(obj) {
    var data = JSON.stringify(obj, null, 2);
    $('.data').text(data);
  }

  $("#sortable-right").sortable({
    items: "> li",
    handle: ".draggable",
    revert: false,
    revertDuration: 50,
    helper: "clone",
    placeholder: "ui-sortable-placeholder",
    connectWith: ".connectedSortable"
  });

});