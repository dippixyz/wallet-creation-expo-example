import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

const Dippi = require('@dippixyz/sdk');

function DippiSignin() {
    
    const DippiClient = new Dippi({
        appToken: process.env.API_TOKEN,
        appId: process.env.APP_ID,
        url: 'https://api.dippi.xyz',
        urlReturn: Linking.createURL("")
    });

    initClientDippi = async () => {
        const { accessToken } = await DippiClient.auth.login();
        DippiClient.setAuthToken(accessToken);
        const {url} = await DippiClient.auth.getUrl()
        return url;

    };

    const [result, setResult] = useState(null);

    _openAuthSessionAsync = async () => {
        const url = await initClientDippi();
        
        try {
            let result = await WebBrowser.openAuthSessionAsync(
                url,
            );
            const walletAddress = result.url.split('/')[4];
            const userId = result.url.split('/')[5];

            const user = await DippiClient.user.getProfile(userId);
            setResult(user);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <View>
                <Text>Redirect Example</Text>
                <Button
                    onPress={this._openAuthSessionAsync}
                    title="Continue with Dippi"
                />
                <Text>Result: { JSON.stringify(result)}</Text>
                
            </View>
        </>
    );


}

export default DippiSignin;
