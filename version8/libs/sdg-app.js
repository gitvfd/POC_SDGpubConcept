let parentLocation;
try {
  parentLocation = window.parent.location.href;
} catch (e) {
  parentLocation = 'cannot-get-parent-location-because-of-CORS';
}
const isEmbeddedInIFrame = document.location.href !== parentLocation;

const CLOUD_VIZ_REQUEST_DATA = 'CLOUD_VIZ_REQUEST_DATA';
const SDG_APP_RECEIVE_DATA = 'SDG_APP_RECEIVE_DATA';
const SDG_APP_RECEIVE_SELECTED_ITEMS = 'SDG_APP_RECEIVE_SELECTED_ITEMS';
const CLOUD_VIZ_DISPLAY_PUBLICATION = 'CLOUD_VIZ_DISPLAY_PUBLICATION';
const CLOUD_VIZ_BOOKMARK_PUBLICATION = 'CLOUD_VIZ_BOOKMARK_PUBLICATION';

function sdgAppGetData(indicDataUrl, onReceiveDataCallback) {
  const handleReceiveData = function handleReceiveData(e) {
    if (e.data.type === SDG_APP_RECEIVE_DATA) {
      d3.tsv(indicDataUrl)
      .then(function(indicData) {
        onReceiveDataCallback([e.data.concept, e.data.data, indicData]);
      })
    }
    window.removeEventListener('message', handleReceiveData);
  };
  window.addEventListener('message', handleReceiveData);
  window.parent.postMessage({ type: CLOUD_VIZ_REQUEST_DATA }, '*');
}

function sdgAppDisplayPublication(doi) {
  if (isEmbeddedInIFrame) {
    window.parent.postMessage({ type: CLOUD_VIZ_DISPLAY_PUBLICATION, doi: doi }, '*');
  }
}

function sdgAppBookmarkPublication(doi) {
  if (isEmbeddedInIFrame) {
    window.parent.postMessage({ type: CLOUD_VIZ_BOOKMARK_PUBLICATION, doi: doi }, '*');
  }
}

if (isEmbeddedInIFrame) {
  window.addEventListener('message', function(e) {
    if (e.data.type === SDG_APP_RECEIVE_SELECTED_ITEMS) {
      selectItems(e.data.mainItem, e.data.otherItems);
    }
  });
}