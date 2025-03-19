import axios from 'axios';
import { Alert, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { GETPROFILE, SendDeviceToken, SignUpUser } from './Apifunctions';
import { useAuth } from '../AuthContext/AuthContext';
export const updateDeviceToken = async (deviceToken) => {
  const { userProfileData, setUserProfileData } = useAuth();
  const deviceType = Platform.OS === 'ios' ? 'I' : 'A';
  const deviceMakeModel = DeviceInfo.getModel();
  const deviceOsVersion = DeviceInfo.getSystemVersion();
  const installedAppVersion = DeviceInfo.getVersion();
  const date = new Date();
  const getTimeOffset = () => {
    const date = new Date();
    const offsetInMinutes = date.getTimezoneOffset();
    const invertedOffset = -offsetInMinutes; // Invert the sign to make it positive
    const hoursOffset = Math.floor(invertedOffset / 60);
    const minutesOffset = invertedOffset % 60;
    const sign = hoursOffset < 0 ? '-' : '+';
    const formattedOffset = `${sign}${Math.abs(hoursOffset).toString().padStart(2, '0')}:${Math.abs(minutesOffset).toString().padStart(2, '0')}`;
    return formattedOffset;
  };
  
  const timeOffsetInMinutes = date.getTimezoneOffset();


  const payload = {
    device_type: deviceType,
    device_token: deviceToken,
    device_make_model: deviceMakeModel,
    device_os_version: deviceOsVersion,
    installed_app_version: installedAppVersion,
    time_offset:timeOffsetInMinutes
  };
  // const CallGetPRofile = async () => {
  //   let data = {}
  //   try {
  //     const response = await GETPROFILE(data)
  //     if (response.isSuccessful) {
  //       let Data = response.body && response.body
  //       setUserProfileData({
  //         ...userProfileData, Data,
  //         name: undefined
  //       });
  //       // console.log(Data,"getmyprofileresponce")
  //     } else {
  //     }
  //   } catch (error) {
  //   }
  // }

  try {

    const response = await SendDeviceToken(payload);
   
    // CallGetPRofile()
  } catch (error) {
    throw error;
  }
};
