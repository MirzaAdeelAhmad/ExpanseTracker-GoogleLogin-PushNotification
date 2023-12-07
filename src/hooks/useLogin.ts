import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

function useLogin() {
  const navigation = useNavigation();
  const [userInformation, setuserInformation] = useState(null);
  return {navigation, userInformation, setuserInformation};
}
export default useLogin;
