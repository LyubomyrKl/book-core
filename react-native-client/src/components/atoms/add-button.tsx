import React, {FC} from 'react';
import {Button} from "react-native";


interface AddButtonProps {
    clickHandler: () => void;

}

const AddButton: FC<AddButtonProps> = ({clickHandler}) => {

    return (
        <Button
            onPress={clickHandler}
            title="Learn Mordsdsre"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />
    );
};

export default AddButton;