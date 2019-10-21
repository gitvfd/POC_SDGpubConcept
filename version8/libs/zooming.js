function addZoomingFeature () {
  nodes_raw.forEach(function(d) {
      d.x_fixed = d.x;
      d.y_fixed = d.y;
  });

  zoom = d3.zoom()
    .scaleExtent([min_zoom, max_zoom])
    .interpolate(function(a, b) {
        zoom_duration = Math.max(1000, d3.interpolateZoom(a, b).duration)
        return d3.interpolateArray(a, b)
    })
    .on("zoom", zoomChart);

  initial_transform = d3.zoomIdentity.translate(0, 0).scale(start_zoom);

  mouse_zoom_rect
    .call(zoom)
    .on("dblclick.zoom", null)
    .call(zoom.transform, initial_transform);
}

function zoomChart() {
  transform = d3.event.transform;

  nodes_raw.forEach(function(d) {
      var newPoint = transform.apply([d.x_fixed, d.y_fixed]);
      d.x = newPoint[0];
      d.y = newPoint[1];
      d.r = d.r_fixed * transform.k;
  });

  drawNetwork();
  drawSelected();
  if (current_click) {
      drawDottedHoverCircle(current_click);
      if (selectedOtherItems !== null) {
        drawSelectedItems();
      }      
  }    
}

function zoomAndPanSelectedMainItemToCenter() {
  if (!current_click || !transform) {
    return;
  }
  var screenCenterX = (window.innerWidth / 2) / selected_main_item_zoom;
  var screenCenterY = (window.innerHeight / 2) / selected_main_item_zoom;

  var new_zoom = d3.zoomIdentity
    .scale(selected_main_item_zoom)
    .translate(-current_click.x_fixed + screenCenterX, -current_click.y_fixed + screenCenterY);

  mouse_zoom_rect
    .transition()
    .duration(750)
    .call(zoom.transform, new_zoom);
}
