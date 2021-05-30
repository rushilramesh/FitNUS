import React, {useState, useEffect} from 'react'
import { View,  Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { getUser } from '../Api/userApi'


export default function({navigation}){ 
    const [user, setUser] = useState(null)

    const fetchUser = async () => {
        try {
            const profile = await getUser()
            setUser(profile)
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(() => {
        fetchUser()
    }, [])
    
    return (
        <View>
            <Text styles={styles.text}>My Profile</Text>
            <Text>{user.name}</Text>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    text: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})