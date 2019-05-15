let parentLocation;
try {
  parentLocation = window.parent.location.href;
} catch (e) {
  parentLocation = 'cannot-get-parent-location-because-of-CORS';
}
const isEmbeddedInIFrame = document.location.href !== parentLocation;

const CLOUD_VIZ_REQUEST_DATA = 'CLOUD_VIZ_REQUEST_DATA';
const SDG_APP_RECEIVE_DATA = 'SDG_APP_RECEIVE_DATA';
const CLOUD_VIZ_DISPLAY_PUBLICATION = 'CLOUD_VIZ_DISPLAY_PUBLICATION';
const CLOUD_VIZ_BOOKMARK_PUBLICATION = 'CLOUD_VIZ_BOOKMARK_PUBLICATION';
const CLOUD_VIZ_REQUEST_BOOKMARKED_DOIS = 'CLOUD_VIZ_REQUEST_BOOKMARKED_DOIS';
const SDG_APP_RECEIVE_BOOKMARKED_DOIS = 'SDG_APP_RECEIVE_BOOKMARKED_DOIS';

function sdgAppGetData(indicDataUrl, onReceiveDataCallback) {
  const handleReceiveData = function handleReceiveData(e) {
    if (e.data.type === SDG_APP_RECEIVE_DATA) {
      d3.tsv(indicDataUrl, function(error, indicData) {
        if (error) throw error;
        onReceiveDataCallback(null, e.data.concept, e.data.data, indicData);
      });
      window.removeEventListener('message', handleReceiveData);
    }
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

function sdgAppGetBookmarkedDois(onReceiveBookmarkedDoisCallback) {
  if (isEmbeddedInIFrame) {
    const handleReceiveBookmarkedDois = function handleReceiveBookmarkedDois(e) {
      if (e.data.type === SDG_APP_RECEIVE_BOOKMARKED_DOIS) {
        onReceiveBookmarkedDoisCallback(e.data.dois);
        window.removeEventListener('message', handleReceiveBookmarkedDois);
      }
    };
    window.addEventListener('message', handleReceiveBookmarkedDois);
    window.parent.postMessage({ type: CLOUD_VIZ_REQUEST_BOOKMARKED_DOIS }, '*');
  } else {
    onReceiveBookmarkedDoisCallback([]);
  }
}
