import {Alert, PermissionsAndroid} from 'react-native';

export const getStoragePermission = async () => {
    let permissions = await PermissionsAndroid.requestMultiple(
        [
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
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

//
// {
//     permission: "android.permission.READ_EXTERNAL_STORAGE",
//         description: "Essential for opening local ebook files."
// },
// {
//     permission: "android.permission.WRITE_EXTERNAL_STORAGE",
//         description: "Needed to access the device's storage for ebooks."
// },
// {
//     permission: "android.permission.READ_PRIVILEGED_PHONE_STATE",
//         description: "Enables the app to provide summaries of ebooks."
// },
// {
//     permission: "android.permission.WRITE_SETTINGS",
//         description: "If your app allows users to annotate or bookmark pages, you'll need appropriate permissions to access and modify files."
// },
// {
//     permission: "android.permission.SYSTEM_ALERT_WINDOW",
//         description: "Optimizes reading experience and adjusts settings."
// }