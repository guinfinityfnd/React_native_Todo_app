import { Text, View, StyleSheet, KeyboardAvoidingView, StatusBar, ScrollView, Platform, TextInput, Pressable, FlatList, SafeAreaView, Button, Alert, Keyboard, Linking, TouchableOpacity, Animated } from "react-native";
import { Entypo, FontAwesome, Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";

const Ui = () => {
    const [text, setText] = useState();
    const [items, setItem] = useState([]);
    const flatListRef = useRef();
    const [count,setCount] = useState(0);
    ////// This under line is created for line-through effect, this is array[]/////
    const [strike, setStrike] = useState([]);

    const scrollToTop = () => {
        flatListRef.current.scrollToEnd({
            animated: true,
        });
    };

    const toggleStrike = (index) => {
        const updateStrikeItems = [...strike]; // this is like [1,2,3,4,5,6,...]
        //// this underline is like -> index - 0, index - 1, index - 2 
        updateStrikeItems[index] = !updateStrikeItems[index];
        setStrike(updateStrikeItems);
    };

    const handleChange = (params) => {  
        setItem([...items, {id: Date.now().toString(), title: text}]);
        setText(null);
        setCount(() => count+1);
        // setTimeout(() => {
            // Keyboard.dismiss();
        // }, 5000);
    };

    const itemDelete = (index) => {
        Alert.alert(
            "Deleting Text!",
            "Are you sure?",
            [
                {
                    text: 'OK',
                    onPress: () => {
                        setItem(items.filter((_,i) => i !== index));
                        setCount(() => count - 1);
                        strike[index] = false;
                    },
                    style: 'Ok',
                },
                {
                    text: 'Cancel',
                    onPress: () => Alert.alert('Canceled','Incompleted Text!'),
                    style: 'cancel',
                },
            ],
        );
    };

    const openLink = () => {
        Linking.openURL('https://guinfinityfnd.github.io/myportfolio/');
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="height" keyboardVerticalOffset={Platform.OS === "ios" ? "height" : 'padding'}>
            <StatusBar barStyle={'light-content'}/>
                <View style={styles.containerText}>
                    <MaterialCommunityIcons name="notebook-check-outline" size={50} color="#fff" style={styles.noteicon}/>
                    <Text style={styles.notetext}>
                        My Todos
                    </Text>
                    <Text style={styles.countNum}>
                        {/* <Text style={{ color: 'grey', fontSize: 20,}}>Completed : {}</Text> */}
                        {count < 2 ? 'Burden' : 'Burdens'} : {count}
                    </Text>
                </View>
                {/* show Todo list items */}
                {/* show Todo list items */}
            <FlatList
                ref={flatListRef}
                showsVerticalScrollIndicator={false}
                keyboardDismissMode="on-drag"
                contentContainerStyle={styles.flatContainer}
                data={items}
                renderItem={({item,index}) => {
                        return (
                                // You got nothing showing on screen error, You need to Return //
                                <>
                                <View key={index} style={styles.itemsViewContainer}>
                                    <Text style={[styles.items, strike[index] ? styles.strike : null]} onPress={() => toggleStrike(index)}>
                                        {/* {index+1}. */}
                                        {item.title}
                                    </Text>
                                    <View style={styles.iconsContainer}>
                                        <Text style={styles.trashIconContainer}>
                                            <Entypo name="trash" size={20} color="red" onPress={() => itemDelete(index,item)}/>
                                        </Text>
                                        {/* <Text style={styles.pencilIconContainer}>
                                            <FontAwesome name="pencil-square-o" size={20} color="green" onPress={() => updateItems(item,index)}/>  
                                        </Text> */}
                                    </View>
                                </View>
                                </>
                        );
                }}
                ListEmptyComponent={
                    <View style={styles.book}>
                        <Ionicons name="ios-book-sharp" size={200} color="#ffffff" />
                        <TouchableOpacity style={{color: '#00ff00', fontSize: 20}} onPress={() => openLink()}>
                            <Text style={{color: '#00ff00', fontSize: 20}}>Developer Contact - Click Me!</Text>
                        </TouchableOpacity>
                    </View>
                }
            /> 
                {/* show Todo list items */}
                {/* show Todo list items */}
            <View style={styles.textinputContainer}>
                <TextInput 
                    multiline
                    // editable={true}
                    numberOfLines={6}
                    style={styles.textinput}
                    cursorColor={"yellow"}
                    value={text}
                    onChangeText={setText}
                    placeholder="write burdens !"
                    placeholderTextColor="grey"
                    textBreakStrategy="highQuality"
                    maxLength={200}
                />
                    {!text ? null : 
                        <Pressable style={styles.sendbtn} onPress={()=> {
                                                                    handleChange()
                                                                    scrollToTop()
                                                                    }}>
                            <Feather name="send" size={24} color="#00ff00"/>
                        </Pressable>
                    }
            </View>
        </KeyboardAvoidingView>
    );
}

export default Ui;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6a3e4A',
    },
    flatContainer: {
        backgroundColor: '#6a3e4A',
        // height: 'auto',
    },
    book: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerText: {
        // backgroundColor: 'grey',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderBottomColor: "#20232A",
        borderBottomWidth: 2,
    },
    notetext: {
        color: "#fff",
        fontSize: 30,
        textTransform: 'capitalize',
        paddingVertical: 20,
        alignSelf: 'baseline',
    },
    noteicon: {
        paddingVertical: 20,
    },
    countNum: {
        fontSize: 20,
        paddingVertical: 20,
        marginHorizontal: 30,
        alignSelf: 'baseline',
        color: '#00ff00',
    },
    iconsContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 10,
    },
    itemsViewContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        backgroundColor: "#bcbcbc",
        padding: 10,
        borderRadius: 10,
        margin: 5,
        shadowColor: '#000',
        elevation: 5,
    },
    items: {
        maxWidth: '80%',
        color: "yellow",
        fontSize: 20,
        fontWeight: 'bold',
        // alignSelf: "baseline",
        flexWrap: 'wrap',
        // backgroundColor: 'red',
    },
    strike: {
        textDecorationLine: 'line-through',
        color: '#727272',
    },
    trashIconContainer: {
        alignSelf: "baseline",
        marginRight: 10,
    },
    pencilIconContainer: {
        alignSelf: "baseline",
    },
    textinputContainer: {
        backgroundColor: "#20232A",
        marginBottom: 2,
    },
    textinput: {
        maxHeight: 60,
        paddingRight: 50,
        backgroundColor: '#6a3e4A',
        borderWidth: 2,
        borderColor: "#ffffff",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: "#ffffff",
        fontSize: 20,
    },
    sendbtn: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 15,
        position: 'absolute',
    }

  });