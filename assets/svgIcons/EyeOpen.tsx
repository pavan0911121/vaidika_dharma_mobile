import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Svg, { Circle, Line, Path } from 'react-native-svg';
interface Props{
    width:string;
    height:string
}
const EyeOpen:React.FC<Props> = ({
    width,
    height

}) => {
 
    return (
       <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></Path><Circle cx="12" cy="12" r="3"></Circle></Svg>
    )
}

export default EyeOpen

const styles = StyleSheet.create({})