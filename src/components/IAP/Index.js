import React, {Component} from 'react';
import {Text, View, Dimensions, FlatList, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ConstantsVar from '../../global/ConstantsVar';
import {LinearGradientText} from 'react-native-linear-gradient-text';

import NavBar from '../../containers/NavBar';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
const wp = ConstantsVar.isPortrait()
  ? widthPercentageToDP
  : heightPercentageToDP;

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <NavBar detail={{sub: true, nav: this.props.navigation}} />

        <LinearGradient
          colors={['#0BB5E5', '#20C8F8']}
          style={{
            margin: 20,
            height: '19%',
            width: '90%',
            borderRadius: 20,
            alignSelf: 'center',
          }}>
          <View style={{margin: '5%'}}>
            <View>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Subscribe
              </Text>
              <Image
                source={require('../../utils/assets/rt.png')}
                resizeMode="contain"
                style={{
                  height: wp('50%'),
                  width: wp('50%'),
                  marginLeft: wp('35%'),
                  bottom: '35%',
                }}
              />
            </View>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                // top: '20%',
                bottom: '70%',
              }}>
              Newspaper of
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                bottom: '67%',
              }}>
              your choice
            </Text>
          </View>
        </LinearGradient>
        <View style={{height: '70%'}}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              alignSelf: 'center',
              backgroundColor: 'white',
              width: '90%',
              // height: wp('20%'),
              // borderWidth: 2,
              borderRadius: 30,
            }}>
            <View style={{top: 20}}>
              <Image
                source={require('../../utils/assets/airplane.png')}
                resizeMode="contain"
                style={{height: 80, alignSelf: 'center'}}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#7161BE',
                  fontWeight: '800',
                  color: '#20C8F8',
                }}>
                Basic
              </Text>
              <View
                style={{flexDirection: 'row', alignSelf: 'center', top: 20}}>
                {/* <LinearGradient colors={['#0BB5E5', '#20C8F8']}> */}
                <Text
                  style={{
                    alignSelf: 'center',
                    margin: 10,
                    fontSize: wp(15),
                    fontWeight: 'bold',
                    color: '#20C8F8',
                  }}>
                  4$
                </Text>
                {/* </LinearGradient> */}
                <Text
                  style={{
                    alignSelf: 'center',
                    margin: 10,
                    top: 10,
                    fontWeight: '400',
                    fontSize: wp(4),
                  }}>
                  for 1 week
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  width: wp('70%'),
                  alignSelf: 'center',
                  borderColor: '#EBE7FB',
                  top: 19,
                  // backgroundColor: '#EBE7FB',
                }}></View>
              <View style={{alignSelf: 'center', margin: 40}}>
                <Text style={{marginBottom: 10, alignSelf: 'center'}}>
                  Free Support 24/7
                </Text>
                <Text style={{marginBottom: 10, alignSelf: 'center'}}>
                  Personalize Recommendation
                </Text>
                <Text style={{alignSelf: 'center', marginBottom: 10}}>
                  Ad free experience
                </Text>
                <Text style={{marginBottom: 10, alignSelf: 'center'}}>
                  Topics of interest selected by you
                </Text>
                <Text style={{alignSelf: 'center'}}>Databases Download</Text>
              </View>
              <View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    shadowColor: 'gray',
                    shadowOffset: {
                      width: 5,
                      height: 5,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 8,
                  }}>
                  <LinearGradient
                    colors={['#0BB5E5', '#20C8F8']}
                    style={{
                      width: wp('50%'),
                      height: wp('10%'),
                      alignSelf: 'center',
                      borderRadius: wp(2),
                      // marginTop: wp('1%'),
                      bottom: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: wp('3.5%'),
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                      }}>
                      Buy Now
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{alignSelf: 'center'}}>
              <Image
                source={require('../../utils/assets/rocket.png')}
                resizeMode="contain"
                style={{height: 80, alignSelf: 'center'}}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#7161BE',
                  fontWeight: '800',
                  color: '#20C8F8',
                  top: 10,
                }}>
                Standard{' '}
              </Text>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Text
                  style={{
                    alignSelf: 'center',
                    margin: 10,
                    fontSize: wp(15),
                    fontWeight: 'bold',
                    color: '#20C8F8',
                  }}>
                  99$
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    margin: 10,
                    top: 9,
                    fontWeight: '400',
                    fontSize: wp(4),
                  }}>
                  for 1 month
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  width: wp('70%'),
                  alignSelf: 'center',
                  borderColor: '#EBE7FB',
                  top: 5,
                  // backgroundColor: '#EBE7FB',
                }}></View>
              <View style={{alignSelf: 'center', margin: 40, left: 20}}>
                <Text style={{marginBottom: 10, alignSelf: 'center'}}>
                  Free Support 24/7{' '}
                </Text>
                <Text style={{marginBottom: 10}}>
                  Personalize Recommendation
                </Text>
                <Text style={{alignSelf: 'center', marginBottom: 10}}>
                  Ad free experience
                </Text>
                <Text style={{marginBottom: 10}}>
                  Topics of interest selected by you
                </Text>
                <Text style={{alignSelf: 'center'}}>Databases Download</Text>
              </View>
              <View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    shadowColor: 'gray',
                    shadowOffset: {
                      width: 5,
                      height: 5,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 8,
                  }}>
                  <LinearGradient
                    colors={['#0BB5E5', '#20C8F8']}
                    style={{
                      width: wp('50%'),
                      height: wp('10%'),
                      alignSelf: 'center',
                      borderRadius: wp(2),
                      // marginTop: wp('1%'),
                      bottom: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: wp('3.5%'),
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                      }}>
                      Buy Now
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{}}>
              <Image
                source={require('../../utils/assets/ship.png')}
                resizeMode="contain"
                style={{height: 100, alignSelf: 'center'}}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#7161BE',
                  fontWeight: '800',
                  color: '#20C8F8',
                }}>
                Enterprise
              </Text>
              <View style={{flexDirection: 'row', alignSelf: 'center', top: 5}}>
                <Text
                  style={{
                    alignSelf: 'center',
                    margin: 10,
                    fontSize: wp(15),
                    fontWeight: 'bold',
                    color: '#20C8F8',
                  }}>
                  899$
                </Text>
                {/* </LinearGradient> */}
                <Text
                  style={{
                    alignSelf: 'center',
                    margin: 10,
                    top: 8,
                    fontWeight: '400',
                    fontSize: wp(4),
                  }}>
                  for year
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  width: wp('60%'),
                  alignSelf: 'center',
                  borderColor: '#EBE7FB',
                  top: 18,
                  // backgroundColor: '#EBE7FB',
                }}></View>
              <View style={{alignSelf: 'center', margin: 40}}>
                <Text style={{marginBottom: 10, alignSelf: 'center'}}>
                  Free Support 24/7
                </Text>
                <Text style={{marginBottom: 10, alignSelf: 'center'}}>
                  Personalize Recommendation
                </Text>
                <Text style={{marginBottom: 10, alignSelf: 'center'}}>
                  Ad free experience
                </Text>
                {/* <Text style={{alignSelf: 'center', marginBottom: 10}}>
                  Topics of interest selected by you
                </Text> */}
                <Text style={{marginBottom: 10, alignSelf: 'center'}}>
                  Maintenance Email{' '}
                </Text>
                <Text style={{marginBottom: 10, alignSelf: 'center'}}>
                  Unlimited Traffic{' '}
                </Text>
                <Text style={{marginBottom: 10, alignSelf: 'center'}}>
                  Databases Download
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    shadowColor: 'gray',
                    shadowOffset: {
                      width: 5,
                      height: 5,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 8,
                  }}>
                  <LinearGradient
                    colors={['#0BB5E5', '#20C8F8']}
                    style={{
                      width: wp('50%'),
                      height: wp('10%'),
                      alignSelf: 'center',
                      borderRadius: wp(2),
                      // marginTop: wp('1%'),
                      bottom: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: wp('3.5%'),
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                      }}>
                      Buy Now
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            {/* <View style={{height: '20%'}}></View> */}
          </ScrollView>
        </View>
      </>
    );
  }
}
