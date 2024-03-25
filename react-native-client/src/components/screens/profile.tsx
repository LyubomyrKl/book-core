import React, {useCallback, useContext, useMemo, useState} from 'react';
import {View, Text, FlatList, TouchableNativeFeedback} from "react-native";
import {AppContext} from "../../app/app-context";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getColors} from "../../consts";
import Container from "../molecules/container";
import AppButton from "../atoms/button";
import Svg, {Circle, ClipPath, Defs, G, Path} from "react-native-svg";
import SelectItem from "../atoms/select-item";



const Profile = ({}) => {
    const {theme, setTheme} = useContext(AppContext);
    const [language, setLanguage] = useState('EN');
    const colors = useMemo(() => getColors(theme), [theme]);


    const RequirementsItem = useCallback(({title, description}: ItemProps) => {
        return (
            <View style={styles.requirementsItem}>
                <Text style={[styles.requirementsItemTitle, {color: colors.textGrey}]}>• {title}:</Text>
                <Text style={{color: colors.textGrey}}> {description}</Text>
            </View>
        )
    }, [])



    return (
        <View style={[styles.profileContainer, {backgroundColor:colors.backgroundWhite}]}>
            <Container>
                <View style={{paddingBottom: 40, paddingTop: 20}}>
                    <AppButton isDisabled title={'Login'} />
                </View>
                <Text style={[styles.sectionTitle, {color: colors.textBlack}]}>
                    Setting
                </Text>


                <Text style={[styles.sectionSubtitle, {color: colors.textBlack}]}>
                    Theme
                </Text>
                <View style={styles.selectBox}>
                    <SelectItem styles={{width: '49%'}} onPress={() => setTheme('light')} isActive={theme === 'light'}>
                        <Ionicons name={theme === 'light' ?  'sunny-outline' : 'sunny-sharp'} size={20} color={colors.textGrey}/>
                    </SelectItem>

                    <SelectItem styles={{width: '49%'}} onPress={() => setTheme('dark')} isActive={theme !== 'light'}>
                        <Ionicons name={theme !== 'light' ? 'moon-sharp' : 'moon-outline'} size={20} color={theme !== 'light' ? colors.darkShade : colors.textGrey}/>
                    </SelectItem>
                </View>


                <Text style={[styles.sectionSubtitle, {color: colors.textBlack}]}>Languages</Text>
                <View style={styles.selectBox}>
                    {languageButtons.map(({lang, svg}) => {
                        return (
                            <SelectItem key={lang} onPress={() => setLanguage(lang)} isActive={language === lang}>
                                <Text style={{paddingLeft: 20, color: (language === lang && theme !== 'light') ?  colors.darkShade : colors.textGrey}}>{lang}</Text>
                                {svg}
                            </SelectItem>
                        )
                    })}
                </View>


                <Text style={[styles.sectionSubtitle, {color: colors.textBlack}]}>Requirements</Text>
                <FlatList
                    data={requirements}
                    renderItem={({item}) => <RequirementsItem title={item.title} description={item.description}/>}
                    keyExtractor={item => item.title}
                />

            </Container>
        </View>
    );
};


const styles = {
    profileContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 40,
    },

    selectBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%',
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 28,
        paddingBottom: 30,
    },

    sectionSubtitle: {
        fontSize: 16,
        paddingBottom: 10,
    },

    requirementsItem: {
        flexDirection: 'row',
        paddingLeft: 10,
        marginBottom: 5
    },

    requirementsItemTitle: {
        fontWeight: 700,
        fontSize: 16,
    }
}

interface ItemProps {
    title: string;
    description: string;
}

const requirements: ItemProps[] = [
    {
        title: "File System Access",
        description: "Essential for opening local ebook files."
    },
    {
        title: "Storage Access",
        description: "Needed to access the device's storage for ebooks."
    },
    {
        title: "Wifi",
        description: "Enables the app to provide summaries of ebooks."
    },
    {
        title: "Display",
        description: "Optimizes reading experience and adjusts settings."
    },
    {
        title: "Write Access",
        description: "allows users to annotate or bookmark pages."
    }
];


const languageButtons = [
    {
        lang: 'UA',
        svg: <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
            <G fillRule="evenodd" strokeWidth="1pt">
                <Path fill="gold" d="M0 0h640v480H0z"/>
                <Path fill="#0057b8" d="M0 0h640v240H0z"/>
            </G>
        </Svg>
    },
    {
        lang: 'EN',
        svg: <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
            <Path fill="#012169" d="M0 0h640v480H0z"/>
            <Path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"/>
            <Path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"/>
            <Path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z"/>
            <Path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z"/>
        </Svg>
    },
    {
        lang: 'GE',
        svg: <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
            <Path fill="#fc0" d="M0 320h640v160H0z"/>
            <Path fill="#000001" d="M0 0h640v160H0z"/>
            <Path fill="red" d="M0 160h640v160H0z"/>
        </Svg>
    },
    {
        lang: 'JP',
        svg: <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
            <Defs>
                <ClipPath id="jp-a">
                    <Path fillOpacity=".7" d="M-88 32h640v480H-88z"/>
                </ClipPath>
            </Defs>
            <G fillRule="evenodd" strokeWidth="1pt" clipPath="url(#jp-a)" transform="translate(88 -32)">
                <Path fill="#fff" d="M-128 32h720v480h-720z"/>
                <Circle cx="523.1" cy="344.1" r="194.9" fill="#bc002d" transform="translate(-168.4 8.6)scale(.76554)"/>
            </G>
        </Svg>
    }
]

export default Profile;