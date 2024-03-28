import React, {useCallback, useMemo} from 'react';
import {Pressable, Text, View, StyleSheet, Modal, TouchableNativeFeedback} from "react-native";
import {selectTheme} from "../../redux/slices/settingSlice";
import {getColors} from "../../consts";
import {useAppSelector} from "../../hooks";

interface IModalProps {
    isModalVisible: boolean;
    onRequestClose: () => void;
    onOverlayPress: () => void;
    extraHeader?: React.ReactNode;
    menuItems: IModalMenuItem[];
}

const ModalMenu :React.FC<IModalProps> = ({isModalVisible, extraHeader, menuItems, onRequestClose, onOverlayPress}) => {
    const theme = useAppSelector(selectTheme);
    const colors = useMemo(() => getColors(theme), [theme]);
    const renderMenuItems = useCallback((menuItem: IModalMenuItem) => <ModalMenuItem key={menuItem.id} {...menuItem}/>, [menuItems]);

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={onRequestClose}>
                <Pressable
                    style={styles.modalOverlay}
                    onPress={onOverlayPress}>
                    <View style={styles.modalContainer}>
                        <View style={[styles.modalView, {backgroundColor: colors.backgroundWhite}]}>
                            <View style={styles.extraHeader}>
                                {extraHeader}
                            </View>
                            <View>
                                {menuItems.map(renderMenuItems)}
                            </View>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};


export interface IModalMenuItem {
    id: string,
    text: string | React.ReactNode;
    onPress: () => void;
    icon: React.ReactNode;
}

const ModalMenuItem: React.FC<IModalMenuItem> = ({text, onPress, icon}) => {
    const theme = useAppSelector(selectTheme);
    const colors = useMemo(() => getColors(theme), [theme]);

    return (
        <View style={[styles.roundParent]}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.backgroundGrey, true)} style={{borderRadius: 10}} onPress={onPress}>
                <View style={styles.menuItemWrapper}>
                    <View style={styles.iconWrapper}>
                        {icon}
                    </View>
                    <View style={[styles.menuItemText, {borderBottomColor: colors.backgroundGrey}]}>
                        <Text >{text}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        alignItems: 'center',
    },
    modalView: {
        borderRadius: 20,
        paddingVertical: 15,
        marginBottom: -15,
        paddingBottom: 50,
        width: '100%',
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    roundParent: {
        borderRadius: 20,
        overflow: 'hidden',
        padding: 10,
    },

    menuItemText:{
        padding: 10,
        borderBottomWidth: 2,
        flex: 1
    },

    menuItemWrapper: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconWrapper: {
        marginRight: 20,
    },

    extraHeader: {
        paddingLeft: 20,
        marginBottom: 30,
        width: '100%',
    }
});

export default React.memo(ModalMenu);