import { StyleSheet } from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentWrapper: {
        flex: 1,
    },
    content: {
        rowGap: hp('1%'),
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('100%'),
        width: wp('100%'),
        flex: 1,
    },
    h1: {
        fontWeight: 'bold',
        fontSize: hp('3%'),
        marginTop: hp('2%'),
        textAlign: 'center',
    },
    h2: {
        fontSize: hp('2%'),
    },
    list: {
        alignItems: 'center',
        rowGap: hp('1%'),
    },
    btn: {
        marginTop: 'auto',
        backgroundColor: '#E63946',
        paddingVertical: hp('2%'),
        borderRadius: hp('2%'),
        width: wp('70%'),
        alignItems: 'center',
        marginBottom: hp('2%'),
        borderColor: '#fff',
        borderWidth: hp('0.5%'),
        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: hp('0.8%') },
        shadowOpacity: 0.3,
        shadowRadius: hp('1%'),
        // Elevation for Android (creates shadow-like effect)
        elevation: 5,
        // Gradient-like effect (optional, if you want to simulate lighting from top)
        backgroundImage: 'linear-gradient(145deg, #D62839, #E63946)',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: hp('2%'),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: wp('3%'),
    }
});

export default commonStyles;