import { Dimensions, StyleSheet } from 'react-native';

import { COLORS, SIZES, SHADOWS, FONT } from '@/constants';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: SIZES.large,
      fontFamily: FONT.bold
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    cardContainer: {
      paddingBottom: 24,
    },
    card: {
      borderRadius: 16,
      elevation: 3,
    },
    bold: {
      fontWeight: 'bold',
      marginBottom: 8,
    },
    pollutantRow: {
      marginBottom: 8,
    },
    pollutantName: {
      fontWeight: '600',
    },
    pollutantDesc: {
      fontSize: 12,
      color: '#888',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    modalText: {
      fontSize: 16,
      alignSelf: 'center',
      textAlign: 'center',
      // marginVertical: 10,
    },
    buttons: {
      gap: 6,
      alignItems: 'center',
    },
    buttonText: {
      color: '#007BFF',
      fontSize: 16,
    },
  });

export default styles;