import React, {useState, useEffect} from 'react'
import { View,  Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { getUser } from '../Api/userApi'


const Profile = ({navigation}) => { 
    const [user, setUser] = useState(null)

    const fetchUser = async () => {
        try {
            const profile = await getUser()
            setUser(profile)
            console.log(user)
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
            <Text></Text>
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