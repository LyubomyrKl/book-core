import {Alert, PermissionsAndroid} from 'react-native';

export const getStoragePermission = async () => {
    let permissions = await PermissionsAndroid.requestMultiple(
        [
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_PRIVILEGED_PHONE_STATE,
            PermissionsAndroid.PERMISSIONS.WRITE_SETTINGS,
            PermissionsAndroid.PERMISSIONS.SYSTEM_ALERT_WINDOW,
        ],
        {
            title: 'BookCore Storage Permission',
            message: 'BookCore needs to access your storage'
        }
    );

    if (permissions['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') {
        return;
    } else {
        Alert.alert(
            'Permission required',
            'Allow BookCore to access your storage',
            [{ text: 'OK', onPress: async () => await getStoragePermission() }],
            { cancelable: false }
        );
    }
};

export const checkStoragePermissions = async () => {
    return await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    );
};