$(function() {
  
  $("#accordion").accordion({
    header: "> div > h3",
    event: "click",
    active: false,
    collapsible: true
  })
  .sortable({
    // axis: "y",
    items: "> div",
    handle: "h3",
    revert: true,
    stop: function(e, ui) {
      var sectionList = $(this).sortable("toArray", {attribute: "data-section-id"});
      var sectionId = ui.item[0].dataset.sectionId;
      updateData({sectionId, sectionList});
      ui.item.children("h3").triggerHandler("focusout");
      $(this).accordion("refresh");
    }
  });

  $(".sortable").sortable({
    // axis: "y",
    items: "> li",
    handle: ".draggable",
    revert: true,
    opacity: 1,
    placeholder: "ui-sortable-placeholder",
    sort: function(event, ui){ ui.item.addClass("selected"); },
    stop: function(event, ui){ ui.item.removeClass("selected"); },
    update: function(e, ui) {
      var itemList = $(this).sortable("toArray", {attribute: "data-item-id"});
      var sectionId = e.target.dataset.listId;
      var itemId = ui.item[0].dataset.itemId;
      updateData({sectionId, itemId, itemList});
    }
  });

  function updateData(obj) {
    var data = JSON.stringify(obj, null, 2);
    $('.data').text(data);
  }

});