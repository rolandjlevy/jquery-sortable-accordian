$(function() {
  
  $("#accordion").accordion({
    header: "> div > h3",
    event: "click",
    active: false,
    collapsible: true
  })
  .sortable({
    axis: "y",
    items: "> div",
    handle: "h3",
    stop: function(e, ui) {
      ui.item.children("h3").triggerHandler("focusout");
      $(this).accordion("refresh");
      var sectionList = $(this).sortable("toArray", {attribute: "data-section-id"});
      var sectionId = ui.item[0].dataset.sectionId;
      console.log({sectionList, sectionId});
    }
  });

  $(".sortable").sortable({
    axis: "y",
    items: "> li",
    handle: ".draggable",
    placeholder: "ui-sortable-placeholder",
    sort: function(event, ui){ ui.item.addClass("shadow"); },
    stop: function(event, ui){ ui.item.removeClass("shadow"); },
    update: function(e, ui) {
      var itemList = $(this).sortable("toArray", {attribute: "data-item-id"});
      var listId = e.target.dataset.listId;
      var itemId = ui.item[0].dataset.itemId;
      console.log({itemList, listId, itemId});
    }
  });
  $(".sortable").disableSelection();

});