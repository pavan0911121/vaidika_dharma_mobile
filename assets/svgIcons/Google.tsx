import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import Svg, { Circle, ClipPath, Defs, G, Line, Path, Rect } from 'react-native-svg';
interface Props {
    width: string;
    height: string;
    style?: ViewStyle;
}
const Google: React.FC<Props> = ({
    width,
    height,
    style
}) => {

    return (
        <View style={style}>
            <Svg width={width} height={height} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <G clip-path="url(#clip0_1_3383)">
                    <Path d="M25.7465 13.2995C25.7465 12.4158 25.6749 11.5273 25.522 10.6579H13.26V15.664H20.2819C19.9905 17.2785 19.0543 18.7068 17.6833 19.6144V22.8626H21.8726C24.3326 20.5984 25.7465 17.2546 25.7465 13.2995Z" fill="#4285F4" />
                    <Path d="M13.2599 26.0009C16.7661 26.0009 19.7229 24.8497 21.8773 22.8626L17.688 19.6144C16.5225 20.4073 15.0178 20.8563 13.2647 20.8563C9.87321 20.8563 6.99759 18.5682 5.96581 15.492H1.64282V18.8405C3.84969 23.2304 8.34464 26.0009 13.2599 26.0009V26.0009Z" fill="#34A853" />
                    <Path d="M5.96109 15.492C5.41654 13.8774 5.41654 12.1291 5.96109 10.5146V7.16608H1.64289C-0.200949 10.8394 -0.200949 15.1672 1.64289 18.8405L5.96109 15.492V15.492Z" fill="#FBBC04" />
                    <Path d="M13.2599 5.14546C15.1133 5.1168 16.9046 5.81421 18.2469 7.09439L21.9585 3.38283C19.6083 1.17596 16.489 -0.0373382 13.2599 0.000876055C8.34464 0.000876055 3.84969 2.77141 1.64282 7.16604L5.96103 10.5146C6.98804 7.43354 9.86843 5.14546 13.2599 5.14546V5.14546Z" fill="#EA4335" />
                </G>
                <Defs>
                    <ClipPath id="clip0_1_3383">
                        <Rect width="26" height="26" fill="white" />
                    </ClipPath>
                </Defs>
            </Svg>
        </View>

    )
}

export default Google

const styles = StyleSheet.create({})