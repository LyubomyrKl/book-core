import { ToastAndroid } from 'react-native';

export default function RenderToast(message: string) {
    ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 300);
}