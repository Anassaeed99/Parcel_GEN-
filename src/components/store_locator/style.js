import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ConstantsVar from '../../global/ConstantsVar';
import color from '../../themes/Colors';
import DeviceInfo from 'react-native-device-info';
const isTablet = DeviceInfo.isTablet();

const wp = ConstantsVar.isPortrait()
  ? widthPercentageToDP
  : heightPercentageToDP;

export default StyleSheet.create({
  View1: {
    height: isTablet ? wp(8) : wp(10),
    width: isTablet ? wp(8) : wp(10),
    backgroundColor: color.pgColor,
    alignSelf: 'flex-end',
    marginRight: wp(3),
    borderBottomLeftRadius: wp(2),
    borderBottomRightRadius: wp(2),
    alignItems: 'center',
    bottom: '9%',
    left: '1%',
    right: '1%',
    justifyContent: 'center',
  },
  View2: {
    padding: wp(2),
  },
  View3: {
    flexDirection: 'row',
    top: 15,
    margin: 5,
  },
  View4: {
    position: 'absolute',
    right: 0,
    alignSelf: 'flex-end',
  },
  View5: {
    width: '90%',
    // backgroundColor: 'red',
    bottom: 20,
    right: 5,
  },
  View6: {
    width: '98%',
    // height: 50,
    backgroundColor: '#fafafa',
    bottom: wp(10),
    top: 2,
    margin: 10,
    alignSelf: 'center',
    // justifyContent: 'space-between',
    // right: 10,
    shadowColor: '#ababab',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderRadius: 5,
    flexDirection: 'row',
    elevation: 8,
  },
  View7: {
    height: '100%',
    width: '25%',
    paddingTop: wp(2),
    paddingBottom: wp(2),
  },
  View8: {
    height: '100%',
    width: '40%',
    paddingTop: wp(2),
    paddingBottom: wp(2),
  },
  View9: {
    height: '100%',
    width: '35%',
    paddingTop: wp(2),
    paddingBottom: wp(2),
    // backgroundColor: 'red',
  },
  View10: {
    height: wp(15),
    width: '100%',
    // marginTop: wp(7),
    // backgroundColor: 'pink',
    // bottom: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  View11: {
    backgroundColor: color.pgColor,
    height: wp(10),
    width: '45%',
    borderRadius: wp(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Btn1: {
    width: wp(45),
    height: wp('10%'),
    borderRadius: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(2),
  },

  Btn2: {
    shadowColor: 'gray',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
  },

  View12: {
    width: '95%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: wp(2),
    marginBottom: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'gray',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    borderRadius: wp(2),
    flexDirection: 'row',
    paddingTop: isTablet ? wp(1.5) : wp(2.5),
    paddingBottom: isTablet ? wp(1.5) : wp(2.5),
    elevation: 8,
  },
  view13: {},
  view14: {
    flexDirection: 'row',
    marginTop: 10,
    padding: wp(2),
  },
  text1: {
    fontSize: isTablet ? wp(3.5) : wp(4),
    fontWeight: 'bold',
  },
  text2: {
    fontSize: wp(4),
    color: '#5A5C5E',
  },
  text3: {
    fontSize: isTablet ? wp(3) : wp(3.5),
    color: '#5A5C5E',
  },
  text4: {
    fontSize: isTablet ? wp(3) : wp(3.5),
    color: 'green',
    fontWeight: 'bold',
  },
  text4_4: {
    fontSize: isTablet ? wp(3) : wp(3.5),
    color: 'green',
    fontWeight: 'bold',
  },
  text5: {
    fontSize: isTablet ? wp(3) : wp(3.5),
    color: '#5A5C5E',
    marginBottom: 30,
  },
  text6: {
    fontSize: isTablet ? wp(3) : wp(3.5),
    color: 'black',
    marginLeft: wp(1),
  },
  text7: {
    fontSize: isTablet ? wp(3) : wp(3.5),
    color: '#5A5C5E',
    fontWeight: 'bold',
    marginTop: wp(2),
  },
  text8: {
    fontSize: isTablet ? wp(2.5) : wp(3.5),
    color: '#5A5C5E',
  },
  text9: {
    fontSize: isTablet ? wp(2.5) : wp(3.5),
    color: 'white',
    marginLeft: wp(2),
    fontWeight: 'bold',
  },
  text10: {
    fontSize: isTablet ? wp(3.5) : wp(4.5),
    color: '#5A5C5E',
    marginRight: wp(2),
  },
  text11: {
    fontSize: isTablet ? wp(3.5) : wp(4.5),
    color: '#5A5C5E',
    marginLeft: wp(2),
  },
  text12: {
    fontSize: isTablet ? wp(3) : wp(3.5),
    textAlign: 'center',
    // bottom: wp(10),
    fontWeight: 'bold',
    color: 'gray',
  },
});
