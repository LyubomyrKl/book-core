// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Modal from 'react-native-modal';
//
// const BottomPopup = ({ isVisible, onClose, options }) => {
//     return (
//         <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
//             <View style={styles.modalContainer}>
//                 {options.map((option, index) => (
//                     <TouchableOpacity key={index} onPress={option.onPress} style={styles.option}>
//                         <Text>{option.title}</Text>
//                     </TouchableOpacity>
//                 ))}
//             </View>
//         </Modal>
//     );
// };
//
// const styles = StyleSheet.create({
//     modal: {
//         justifyContent: 'flex-end',
//         margin: 0,
//     },
//     modalContainer: {
//         backgroundColor: 'white',
//         borderTopLeftRadius: 10,
//         borderTopRightRadius: 10,
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//     },
//     option: {
//         paddingVertical: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: '#E0E0E0',
//     },
// });
//
// export default BottomPopup;