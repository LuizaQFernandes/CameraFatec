import React, {useState, useEffect, useRef} from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import {Camera} from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import {Ionicons} from '@expo/vector-icons'

export default function Foto(){
    const cameraRef = useRef(null);
    const [temPermissao, setTemPermissao] = useState(null);
    const [temPermissaoGaleria, setTemPermissaoGaleria] = useState(null);
    const [tipoCamera, setTipoCamera] = useState(Camera.Constants.Type.back)
    const [tipoFlash, setTipoFlash] = useState(Camera.Constants.FlashMode.off)


    useEffect(() => {
        (async() => {
            const {status} = await Camera.requestCameraPermissionsAsync()
            setTemPermissao(status == 'granted')
        })();
    },[])

    if(temPermissao === null){
        return (
            <SafeAreaView style={styles.container}>
                <Text>Dispositivo sem a camera {`${temPermissao}`}</Text>
            </SafeAreaView>
        )
    }
    if(temPermissao === false){
    return(
        <SafeAreaView style={styles.container}>
                <Text>Dispositivo sem acesso a camera {`${temPermissao}`}</Text>
            </SafeAreaView>
    )
    }
    return(
        <SafeAreaView style={styles.container}>
            <Camera style={{flex:1}}
                type={tipoCamera}
                flashMode={tipoFlash}
                ratio={"16:9"}
                ref={cameraRef}>

            </Camera>
            <TouchableOpacity onPress={() => setTipoCamera(tipoCamera === Camera.Constants.Type.back 
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
            )}> 
                <Ionicons name={'md-camera-reverse'} size={40} color="#9e9e9e"/>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{flex: 1,justifyContent: 'center'}
})