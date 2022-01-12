import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    flexContainer: {
        display: 'flex',
        marginTop: 4,
        paddingLeft: 5,
        paddingRight: 5,
    },
    flexTop: {
        display: 'flex',
        flexDirection: 'row',
    },
    flexTopText: {
        display: 'flex',
        paddingBottom: 14,
    },
    flexBottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    flexBottomText: {
        display: 'flex'
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    fullName: {
        fontWeight: 'bold',
    },
});

const exposeNumbers = (paramNumb) => {
    return (paramNumb >= 1000) 
        ? `${(paramNumb/1000).toFixed(1)}k`
        : paramNumb
}

const RepositoryItem = ({ item }) => {
    return (
        <View style={styles.flexContainer}>
            <View style={styles.flexTop}>
                <Image 
                    style={styles.tinyLogo}
                    source={{uri: item.ownerAvatarUrl,}}
                />
                <View style={styles.flexTopText}>
                    <Text style={styles.fullName}>{item.fullName}</Text>
                    <Text>{item.description}</Text>
                    <Text>{item.language}</Text>
                </View>
            </View>
            <View style={styles.flexBottom}>
                <View style={styles.flexBottomText}>
                    <Text>{exposeNumbers(item.stargazersCount)}</Text>
                    <Text>Stars</Text>
                </View>
                <View style={styles.flexBottomText}>
                    <Text>{exposeNumbers(item.forksCount)}</Text>
                    <Text>Forks</Text>
                </View>
                <View style={styles.flexBottomText}>
                    <Text>{exposeNumbers(item.reviewCount)}</Text>
                    <Text>Reviews</Text>
                </View>
                <View style={styles.flexBottomText}>
                    <Text>{exposeNumbers(item.ratingAverage)}</Text>
                    <Text>Rating</Text>
                </View>
            </View>
        </View> 
    );
};

export default RepositoryItem;
