import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    flexContainer: {
        display: 'flex',
        marginTop: 7,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 3,
    },
    flexTop: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 10,
        padding: 8,
    },
    flexTopText: {
        display: 'flex',
        // paddingBottom: 14,
        width: '80%',
        marginLeft: 14,
    },
    flexBottom: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    flexBottomText: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    fullName: {
        fontWeight: 'bold',
    },
    numbers: {
        fontWeight: 'bold',
        paddingBottom: 4,
    },
    language: {
        alignSelf: 'baseline',
        backgroundColor: '#138acf',
        color: 'white',
        padding: 5, 
        borderRadius: 5,
        overflow: 'hidden',
    }
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
                    <Text style={{ paddingTop: 7, paddingBottom: 7}}>{item.description}</Text>
                    <Text style={styles.language}>{item.language}</Text>
                </View>
            </View>
            <View style={styles.flexBottom}>
                <View style={styles.flexBottomText}>
                    <Text style={styles.numbers}>{exposeNumbers(item.stargazersCount)}</Text>
                    <Text>Stars</Text>
                </View>
                <View style={styles.flexBottomText}>
                    <Text style={styles.numbers}>{exposeNumbers(item.forksCount)}</Text>
                    <Text>Forks</Text>
                </View>
                <View style={styles.flexBottomText}>
                    <Text style={styles.numbers}>{exposeNumbers(item.reviewCount)}</Text>
                    <Text>Reviews</Text>
                </View>
                <View style={styles.flexBottomText}>
                    <Text style={styles.numbers}>{exposeNumbers(item.ratingAverage)}</Text>
                    <Text>Rating</Text>
                </View>
            </View>
        </View> 
    );
};

export default RepositoryItem;
