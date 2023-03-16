/** @format */

import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Alert,
  SafeAreaView,
  Keyboard,
  AppState,
  FlatList,
  Linking,
  Platform,
  LogBox,
} from 'react-native';
import styles from './style';
LogBox.ignoreAllLogs(); //Ignore all log notifications
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Modal from 'react-native-modal';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import Server_function from '../../global/Server_functions';
import Loader from '../../containers/Loader';
import callGlobal_Func from '../../global/global_functions';
import call from 'react-native-phone-call';
import DeviceInfo from 'react-native-device-info';
const isTablet = DeviceInfo.isTablet();

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ConstantsVar from '../../global/ConstantsVar';

const wp = ConstantsVar.isPortrait()
  ? widthPercentageToDP
  : heightPercentageToDP;

import NavBar from '../../containers/NavBar';
import {ScrollView} from 'react-native-gesture-handler';

export default class StoreLocator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: '',
      loaderFlag: false,
      mapHeight: '40%',
      detailViewHeight: '21%',
      ShowFilterBtn: true,
      visibility: false,
      SelectedType: 'Show All',
      markers: [],
      Types: [
        {title: 'Show All', IsChecked: true},
        {title: 'Show Open Store Only', IsChecked: false},
        {title: 'Open On Sunday', IsChecked: false},
        {title: 'Open On Saturday', IsChecked: false},
      ],

      caption: '',
      description: '',
      phoneNumber: '',
      address: '',
      miles: '',
      services_List: [],
      shopHours_Array: [],
      airHours_Array: [],
      groundHours_Array: [],
      storeFlagVar: '',
      withoutFilterArray: '',
      currentLat: '',
      currentLong: '',
      desLat: '',
      desLong: '',
      selected: false,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({
        mapHeight: '100%',
        detailViewHeight: '10%',
        ShowFilterBtn: true,
        visibility: false,
        SelectedType: 'Show All',
        Types: [
          {title: 'Show All', IsChecked: true},
          {title: 'Show Open Store Only', IsChecked: false},
          {title: 'Open On Sunday', IsChecked: false},
          {title: 'Open On Saturday', IsChecked: false},
        ],
      });
      this.requestLocationPermission();
    });
  }

  requestLocationPermission = async () => {
    console.log('requestLocationPermission');
    if (Platform.OS === 'ios') {
      this.getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          this.getOneTimeLocation();
        } else {
          setLocationStatus('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  openDialScreen() {
    let number = '';
    if (Platform.OS === 'ios') {
      number = this.state.phoneNumber;
    } else {
      return null;
    }
    Linking.openURL(number);
  }

  getOneTimeLocation() {
    Geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);

        this.setState({
          currentLat: currentLatitude,
          currentLong: currentLongitude,
        });

        console.log('Get one time location..........');
        console.log(this.state.currentLat);
        console.log(this.state.currentLong);

        console.log('***************');
        console.log('store locator');
        console.log(
          `this.state.currentLat${JSON.stringify(this.state.currentLat)}`,
        );
        console.log(
          `this.state.currentLong ${JSON.stringify(this.state.currentLong)}`,
        );
        console.log('***************');
        console.log(
          this.get_Near_Store(currentLatitude, currentLongitude).toString(),
        );
        this.get_Near_Store(currentLatitude, currentLongitude);
      },
      error => Alert.alert('Please Enable Location'),
      {enableHighAccuracy: false, timeout: 30000, maximumAge: 1000},
    );
    console.log('getOneTimeLocation');
  }

  async get_Near_Store(lat, long) {
    this.setState({
      loaderFlag: true,
    });
    var a = await Server_function.get_Track_Data(lat, long);
    this.setState({
      loaderFlag: false,
    });
    if (a.ResponseStatus == 'Success') {
      console.log('************Get_Track_Data Store_locator*********');

      console.log(`ResponseStatus====== ${JSON.stringify(a.ResponseStatus)}`);

      var markers_Data = await callGlobal_Func.getStoreLocatorData(a);
      markers_Data.map(m => {
        console.log(`markers_Data ${JSON.stringify(m.Car)}`);
      });
      // console.log(`markers_Data ${markers_Data}`);

      console.log(a);
      this.setState({
        markers: markers_Data,
        withoutFilterArray: markers_Data,
      });

      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.');
      console.log(this.state.markers[0].latitude);
      console.log(this.state.markers[0].longitude);
      {
        this.state.markers.map(marker => {
          console.log(marker.latitude);
          console.log(marker.longitude);
        });
      }
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.');
      console.log(`markers_Data^^^${markers_Data}`);
      this.mapRef.fitToCoordinates(markers_Data, {
        edgePadding: {top: 40, right: 40, bottom: 40, left: 40},
        animated: true,
      });
    } else {
      alert('Data Not Found');
      console.log(
        `withoutFilterArray ${JSON.stringify(this.state.withoutFilterArray)}`,
      );
    }
  }

  onPressHideDetailView() {
    this.setState({
      ShowFilterBtn: true,
      selected: !this.state.selected,
    });
  }

  onPressShowDetailView(index) {
    this.setState({
      caption: this.state.markers[index].title,
      description: '',
      phoneNumber: this.state.markers[index].phoneNumber,
      address: this.state.markers[index].address,
      miles: this.state.markers[index].miles,
      services_List: this.state.markers[index].serviceList,
      shopHours_Array: this.state.markers[index].store_Shop_Hours,
      airHours_Array: this.state.markers[index].air_PickupHours,
      groundHours_Array: this.state.markers[index].ground_PickupHours,
      storeFlagVar: this.state.markers[index].storeWorkingFlag,
      desLat: this.state.markers[index].latitude,
      desLong: this.state.markers[index].longitude,
    });
    console.log(
      '..........................................................................',
    );
    console.log(this.state.desLat);
    console.log(this.state.desLong);
    console.log(
      '..........................................................................',
    );
    console.log('\n');
    console.log('Store_locator');
    console.log('onPressShowDetailView');
    console.log('............');
    console.log(`caption ${JSON.stringify(this.state.markers[index].title)}`);
    console.log(
      `phoneNumber ${JSON.stringify(this.state.markers[index].phoneNumber)}`,
    );
    console.log(`address ${JSON.stringify(this.state.markers[index].address)}`);
    console.log(`miles ${JSON.stringify(this.state.markers[index].miles)}`);
    console.log(
      `services_List ${JSON.stringify(this.state.markers[index].serviceList)}`,
    );
    console.log(
      `shopHours_Array ${JSON.stringify(
        this.state.markers[index].store_Shop_Hours,
      )}`,
    );
    console.log(
      `airHours_Array ${JSON.stringify(
        this.state.markers[index].air_PickupHours,
      )}`,
      console.log,
    );
    console.log('+++++++++++++++++++++++');
    console.log(
      `groundHours_Array ${JSON.stringify(
        this.state.markers[index].ground_PickupHours,
      )}`,
    );
    console.log(
      `storeFlagVar ${JSON.stringify(
        this.state.markers[index].storeWorkingFlag,
      )}`,
    );
    console.log(`desLat ${JSON.stringify(this.state.markers[index].latitude)}`);
    console.log(
      `desLong ${JSON.stringify(this.state.markers[index].longitude)}`,
    );
    this.setState({
      // mapHeight: '10%',
      // detailViewHeight: '70%',
      ShowFilterBtn: false,
      // selected:false
    });
  }

  handleCheckBoxChange = (index, item) => {
    var temp = [];
    if (index == 0) {
      this.mapRef.fitToCoordinates(this.state.withoutFilterArray, {
        edgePadding: {top: 40, right: 40, bottom: 40, left: 40},
        animated: true,
      });
      if (this.state.withoutFilterArray.length != 0) {
        this.setState({
          markers: this.state.withoutFilterArray,
        });
        console.log(`handleCheckBoxChange ${this.state.withoutFilterArray}`);
      }
      this.setState({
        Types: [
          {title: 'Show All', IsChecked: true},
          {title: 'Show Open Store Only', IsChecked: false},
          {title: 'Open On Sunday', IsChecked: false},
          {title: 'Open On Saturday', IsChecked: false},
        ],
      });
    } else if (index == 1) {
      for (let i = 0; i < this.state.withoutFilterArray.length; i++) {
        if (this.state.withoutFilterArray[i].storeWorkingFlag == 'Open') {
          temp.push(this.state.withoutFilterArray[i]);
        }
        console.log(
          `handleCheckBoxChange
           else if ${this.state.withoutFilterArray[i]}`,
        );
      }
      this.mapRef.fitToCoordinates(temp, {
        edgePadding: {top: 40, right: 40, bottom: 40, left: 40},
        animated: true,
      });
      this.setState({
        markers: temp,
      });
      this.setState({
        Types: [
          {title: 'Show All', IsChecked: false},
          {title: 'Show Open Store Only', IsChecked: true},
          {title: 'Open On Sunday', IsChecked: false},
          {title: 'Open On Saturday', IsChecked: false},
        ],
      });
    } else if (index == 2) {
      for (let i = 0; i < this.state.withoutFilterArray.length; i++) {
        if (this.state.withoutFilterArray[i].sunClosedVar == 'Open') {
          temp.push(this.state.withoutFilterArray[i]);
        }
        console.log('withoutFilterArray', this.state.withoutFilterArray);
      }
      this.mapRef.fitToCoordinates(temp, {
        edgePadding: {top: 40, right: 40, bottom: 40, left: 40},
        animated: true,
      });
      this.setState({
        markers: temp,
      });
      this.setState({
        Types: [
          {title: 'Show All', IsChecked: false},
          {title: 'Show Open Store Only', IsChecked: false},
          {title: 'Open On Sunday', IsChecked: true},
          {title: 'Open On Saturday', IsChecked: false},
        ],
      });
    } else if (index == 3) {
      for (let i = 0; i < this.state.withoutFilterArray.length; i++) {
        if (this.state.withoutFilterArray[i].satClosedVar == 'Open') {
          temp.push(this.state.withoutFilterArray[i]);
        }
      }
      this.mapRef.fitToCoordinates(temp, {
        edgePadding: {top: 40, right: 40, bottom: 40, left: 40},
        animated: true,
      });
      this.setState({
        markers: temp,
      });
      this.setState({
        Types: [
          {title: 'Show All', IsChecked: false},
          {title: 'Show Open Store Only', IsChecked: false},
          {title: 'Open On Sunday', IsChecked: false},
          {title: 'Open On Saturday', IsChecked: true},
        ],
      });
    }
    this.setState({
      SelectedType: item.title,
      visibility: false,
    });
  };

  onClickFilterBtn() {
    this.setState({
      visibility: true,
    });
  }

  // DrawMarker(marker, index) {
  //   console.log(this.state.markers);
  //   if (marker.Car == 'UPS') {
  //     console.log("<<<<<<<<< UPS MARKER >>>>>>>>>>>>")
  //     console.log(marker.latitude)
  //     console.log(marker.longitude)
  //     return (
  //       <MapView.Marker
  //         key={index}
  //         onPress={() => this.onPressShowDetailView(index)}
  //         coordinate={marker}
  //       >
  //         <Image
  //           source={require('../../utils/assets/pin.png')}
  //           style={{ width: wp(8), height: wp(8), tintColor: '#fc8f00' }}
  //         />
  //       </MapView.Marker>
  //     );
  //   } else if (marker.Car == 'FedEx') {
  //     console.log("<<<<<<<<< FedEx MARKER >>>>>>>>>>>>")
  //     console.log(marker.latitude)
  //     console.log(marker.longitude)
  //     return (
  //       <MapView.Marker
  //         key={index}
  //         onPress={() => this.onPressShowDetailView()}
  //         coordinate={marker}>
  //         <Image
  //           source={require('../../utils/assets/pin.png')}
  //           style={{ width: wp(8), height: wp(8), tintColor: '#4D148C' }}
  //         />
  //       </MapView.Marker>
  //     );
  //   }
  // }

  triggerCall(num) {
    // if (inputValue.length != 10) {
    //   alert('Please insert correct contact number');
    //   return;
    // }

    const args = {
      number: num,
      prompt: true,
    };
    // Make a call
    call(args).catch(console.error);
  }

  goToYosemite() {
    // openMap({latitude: 24.851935, longitude: 67.065901});
    // const yosemite = { latitude: 37.865101, longitude: -119.538330 };

    // createMapLink({ provider: 'apple', start: yosemite, end: '1600 Amphitheatre Pkwy, Mountain View, CA',zoom: 40 })
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    console.log(this.state.currentLat);
    console.log(this.state.currentLong);
    console.log(this.state.desLat);
    console.log(this.state.desLong);
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    Linking.openURL(
      'maps://app?saddr=' +
        this.state.currentLat +
        '+' +
        this.state.currentLong +
        '&daddr=' +
        this.state.desLat +
        '+' +
        this.state.desLong,
    );
  }

  render() {
    return (
      <>
        {this.state.loaderFlag ? <Loader /> : null}

        <NavBar detail={{flag: true, nav: this.props.navigation}} />

        {this.state.ShowFilterBtn ? (
          <TouchableOpacity
            style={styles.View12}
            activeOpacity={0.5}
            onPress={() => this.onClickFilterBtn()}>
            <Text style={styles.text10}>{this.state.SelectedType}</Text>
            <Image
              source={require('../../utils/assets/dropdown.png')}
              style={{
                width: isTablet ? wp(3) : wp(4),
                height: isTablet ? wp(3) : wp(4),
                alignSelf: 'flex-end',
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <View
          style={{
            flex: 1,
            // backgroundColor: 'red',
            // bottom: 20,
            //marginBottom: !this.state.selected ? '10%' : '0%'
          }}>
          {/* <MapView
            // provider={PROVIDER_GOOGLE}
            ref={ref => {
              this.mapRef = ref;
            }}
            onLayout={() =>
              this.mapRef.fitToCoordinates(this.state.markers, {
                edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
                animated: true,
              })
            }
            style={{
              height: !this.state.selected ? '40%' : '100%',
              width: '100%',
            }}>
            {this.state.markers.map((marker, index) => {
              this.DrawMarker(marker, index),
              console.log(`marker {{{{{{ ${JSON.stringify(marker)} }}}}}`);
              console.log(`marker ### ${JSON.stringify(marker.latitude)} ###`);
              console.log(`marker ### ${JSON.stringify(marker.longitude)} ###`);
            })}
          </MapView> */}

          <MapView
            ref={ref => {
              this.mapRef = ref;
            }}
            style={{
              height: !this.state.selected ? '40%' : '100%',
              width: '100%',
            }}
            onLayout={() =>
              this.mapRef.fitToCoordinates(this.state.markers, {
                edgePadding: {top: 40, right: 40, bottom: 40, left: 40},
                animated: true,
              })
            }>
            {this.state.markers.map((marker, index) => {
              return marker.Car == 'UPS' ? (
                <Marker
                  key={index}
                  onPress={() => this.onPressShowDetailView(index)}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}>
                  <Image
                    source={require('../../utils/assets/pin.png')}
                    style={{width: wp(8), height: wp(8), tintColor: '#fc8f00'}}
                  />
                </Marker>
              ) : (
                <Marker
                  key={index}
                  onPress={() => this.onPressShowDetailView()}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}>
                  <Image
                    source={require('../../utils/assets/pin.png')}
                    style={{width: wp(8), height: wp(8), tintColor: '##4D148C'}}
                  />
                </Marker>
              );
            })}
          </MapView>

          <TouchableOpacity
            style={styles.View1}
            activeOpacity={0.5}
            onPress={() => this.onPressHideDetailView()}>
            <Image
              source={require('../../utils/assets/dropdown.png')}
              style={{
                width: '50%',
                height: '50%',
                tintColor: 'white',
                transform: [{rotate: this.state.selected ? '180deg' : '0deg'}],
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {/* <ScrollView> */}

          <ScrollView
            style={{
              height: this.state.detailViewHeight,
              width: '100%',
              bottom: 11,
              // backgroundColor: 'red',
            }}>
            <View style={styles.View2}>
              <Text style={styles.text1} numberOfLines={1}>
                {this.state.caption}
              </Text>
              <View style={styles.View3}>
                <View style={styles.View5}>
                  <Text style={styles.text2} numberOfLines={1}>
                    FedEx Express Ship Center
                  </Text>
                  <Text style={styles.text3} numberOfLines={2}>
                    {this.state.address}
                  </Text>
                </View>

                <View style={styles.View4}>
                  <Text style={styles.text4}>{this.state.storeFlagVar}</Text>
                  <Text style={styles.text5}>{this.state.miles}</Text>
                </View>
              </View>

              <Text style={styles.text12}>Air</Text>
              <View style={styles.View6}>
                <View style={styles.View7}>
                  <Text style={styles.text6}></Text>
                </View>
                <View style={styles.View8}>
                  <Text style={styles.text6}>Shop Hours</Text>
                </View>
                <View style={styles.View9}>
                  <Text style={styles.text6}>Last Pickup</Text>
                </View>
              </View>
              <FlatList
                data={this.state.groundHours_Array}
                style={{paddingBottom: wp(1)}}
                renderItem={({item, key}) => (
                  <View style={styles.View6}>
                    <View style={styles.View7}>
                      <Text style={styles.text6}>{item.Day}</Text>
                    </View>
                    <View style={styles.View8}>
                      <Text style={styles.text6}>{item.ShopHouseTiming}</Text>
                    </View>
                    <View style={styles.View9}>
                      <Text style={styles.text6}>{item.LastHours}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
              <Text style={styles.text12}>Ground</Text>
              <View style={styles.View6}>
                <View style={styles.View7}>
                  <Text style={styles.text6}></Text>
                </View>
                <View style={styles.View8}>
                  <Text style={styles.text6}>Shop Hours</Text>
                </View>
                <View style={styles.View9}>
                  <Text style={styles.text6}>Last Pickup</Text>
                </View>
              </View>

              <FlatList
                style={
                  {
                    // paddingBottom: wp(3),
                  }
                }
                data={this.state.airHours_Array}
                renderItem={({item, key}) => (
                  <View style={styles.View6}>
                    <View style={styles.View7}>
                      <Text style={styles.text6}>{item.Day}</Text>
                    </View>
                    <View style={styles.View8}>
                      <Text style={styles.text6}>{item.ShopHouseTiming}</Text>
                    </View>
                    <View style={styles.View9}>
                      <Text style={styles.text6}>{item.LastHours}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
              <View style={{marginBottom: 10, left: 5}}>
                <Text style={styles.text7}>Service At this location</Text>
                <FlatList
                  data={this.state.services_List}
                  renderItem={({item, key}) => (
                    <Text style={styles.text8}>{item.descriptionField}</Text>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>

              <View style={styles.View10}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.Btn2}
                  onPress={() => this.openDialScreen()}>
                  <LinearGradient
                    colors={['#0BB5E5', '#20C8F8']}
                    style={styles.Btn1}>
                    <Image
                      source={require('../../utils/assets/telephone.png')}
                      style={{width: wp(4), height: wp(4)}}
                      resizeMode="contain"
                    />
                    <Text style={styles.text9}>
                      Call {this.state.phoneNumber}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.Btn2}
                  onPress={() => this.goToYosemite()}>
                  <LinearGradient
                    colors={['#0BB5E5', '#20C8F8']}
                    style={styles.Btn1}>
                    <Image
                      source={require('../../utils/assets/right-arrow.png')}
                      style={{width: wp(4), height: wp(4)}}
                      resizeMode="contain"
                    />
                    <Text style={styles.text9}>Get Direction</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          {/* </ScrollView> */}
        </View>

        {/* Bottom action sheet */}
        <Modal
          isVisible={this.state.visibility}
          animationOutTiming={1}
          animationInTiming={1}
          backdropOpacity={0.7}
          onBackdropPress={() => {
            this.setState({visibility: false});
          }}
          onBackButtonPress={() => {
            this.setState({visibility: false});
          }}
          onModalHide={() => {
            // this.loaderFlag_func();
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            margin: 0,
            bottom: 0,
          }}>
          <View
            style={{
              width: '100%',
              // height: wp(100),
              paddingBottom: wp(10),
              backgroundColor: '#F8F8F8',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              paddingTop: wp(2),
            }}>
            <FlatList
              style={styles.view13}
              // showsVerticalScrollIndicator={false}
              data={this.state.Types}
              renderItem={({item, index}) => (
                <View style={styles.view14}>
                  <CheckBox
                    style={{
                      width: wp('5'),
                      height: wp('5'),
                    }}
                    // isChecked={item.IsChecked}
                    onFillColor="#0BE593"
                    boxType="square"
                    onTintColor="#0BE593"
                    onCheckColor="white"
                    tintColor="#0BE593"
                    onClick={() => {
                      this.handleCheckBoxChange(index, item);
                    }}
                    value={item.IsChecked}
                    onValueChange={() => this.handleCheckBoxChange(index, item)}
                  />
                  <Text style={styles.text11}>{item.title}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Modal>
      </>
    );
  }
}
