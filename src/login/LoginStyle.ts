import {StyleSheet} from 'react-native';

export const loginStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#1f80ff',
    fontWeight: '700',
    marginBottom: 100,
  },
  loginWithView: {
    width: '70%',
    height: 50,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 100,
    borderRadius: 100,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loginWithText: {
    color: 'black',
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: 15,
  },
  boxShadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
});
