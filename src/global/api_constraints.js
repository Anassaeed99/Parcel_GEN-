// let Url = 'https://matts.pk/pg/api/';

// let Url = 'http://192.168.0.110:83/api/';
//let Url = 'http://173.239.11.20:8080/tst/api/';

// let Url = 'http://192.168.100.173/api/';

//let Url = 'http://192.168.0.110/api/';
//let Url = 'http://192.168.0.109/api/';
// let Url = 'http://192.168.0.117/api/';
let Url = 'http://74.208.95.24/PG/api/';
const api_constraints = {
  getParcel_Data: Url + 'Tracking/TrackData',
  deleteParcel_Data: Url + 'Tracking/DeleteTrackingNumber',
  Update_Caption: Url + 'Tracking/UpdateCaption',
  Update_Package: Url + 'Tracking/TrackDataUpdates',
  TrackLocation: Url + 'Tracking/TrackLocator',
  verifyAddress: Url + 'Tracking/TrackAddressValidation',
  saveAddress: Url + 'Tracking/TrackAddressSave',
  TrackGetCities: Url + 'Tracking/TrackGetCities',
  TrackGetStates: Url + 'Tracking/TrackGetStates',
  TrackGetCountry: Url + 'Tracking/TrackGetCountry',
  TrackGetRate: Url + 'Tracking/TrackGetRate',
};

export default api_constraints;
