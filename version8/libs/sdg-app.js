var parentLocation;
try {
  parentLocation = window.parent.location.href;
} catch (e) {
  parentLocation = 'cannot-get-parent-location-because-of-CORS';
}
var isEmbeddedInIFrame = document.location.href !== parentLocation;

const CLOUD_VIZ_REQUEST_DATA = 'CLOUD_VIZ_REQUEST_DATA';
const SDG_APP_RECEIVE_DATA = 'SDG_APP_RECEIVE_DATA';
const SDG_APP_RECEIVE_SELECTED_ITEMS = 'SDG_APP_RECEIVE_SELECTED_ITEMS';
const SDG_APP_ZOOM_PAN_MAIN_SELECTED_ITEM = 'SDG_APP_ZOOM_PAN_MAIN_SELECTED_ITEM';
const CLOUD_VIZ_REDIRECT = 'CLOUD_VIZ_REDIRECT';
const CLOUD_VIZ_ANIM_DONE = 'CLOUD_VIZ_ANIM_DONE';

function sdgAppGetData(indicDataUrl, onReceiveDataCallback) {
  const handleReceiveData = function handleReceiveData(e) {
    if (e.data.type === SDG_APP_RECEIVE_DATA) {
      d3.tsv(indicDataUrl)
        .then(function(indicData) {
          onReceiveDataCallback([e.data.concept, e.data.data, indicData]);
        });
    }
    window.removeEventListener('message', handleReceiveData);
  };
  window.addEventListener('message', handleReceiveData);
  window.parent.postMessage({ type: CLOUD_VIZ_REQUEST_DATA }, '*');
}

function sdgAppRedirect(pageType, sdgOrConcept) {
  if (isEmbeddedInIFrame) {
    window.parent.postMessage({ type: CLOUD_VIZ_REDIRECT, pageType: pageType, sdgOrConcept: sdgOrConcept  }, '*');
  }
}

if (isEmbeddedInIFrame) {
  window.addEventListener('message', function(e) {
    if (e.data.type === SDG_APP_RECEIVE_SELECTED_ITEMS) {
      selectItems(e.data.mainItem, e.data.otherItems);
    }
  });
}

if (isEmbeddedInIFrame) {
  window.addEventListener('message', function(e) {
    if (e.data.type === SDG_APP_ZOOM_PAN_MAIN_SELECTED_ITEM) {
      zoomAndPanSelectedMainItemToCenter();
    }
  });
}

function sdgAppSignalAnimDone() {
  if (isEmbeddedInIFrame) {
    window.parent.postMessage({ type: CLOUD_VIZ_ANIM_DONE }, '*');
  }
}