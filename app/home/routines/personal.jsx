
import { router } from 'expo-router';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ROUTES } from '../../../util/types';
import { useUserRoutines } from '../../../hooks/useUserRoutines';

export default function MyRoutinesScreen() {
    // const routines = [
    //     { id: '1', valor: 'Rutina buena' },
    //     { id: '2', valor: 'Rutina mala' },
    //     { id: '3', valor: 'Rutina curiosa' },

    // ];

    const [error, userRoutines, userRoutinesLoading] = useUserRoutines();


    if (error) {
        return (
            <View style={{ padding: 20, backgroundColor: "white", height: "100%" }}>
                <View style={styles.TitlesContainer}>
                    <TouchableOpacity style={{ marginTop: 5, marginRight: 10 }} onPress={() => router.back()}>
                        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, marginRight: 20 }}>Mis rutinas</Text>
                    <TouchableOpacity style={{ marginTop: 5 }} onPress={() => router.navigate(ROUTES.ADDROUTINE)}>
                        <MaterialCommunityIcons name="plus-circle-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 125, marginTop: 5 }}>
                        <MaterialCommunityIcons name="filter-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: "white", height: "100%", paddingHorizontal: 10 }}>
                    <Text style={{ textAlign: 'center', marginTop: 15 }} variant='headlineMedium'>{error?.title ?? "Algo ha salido mal."}</Text>
                    <Text style={{ textAlign: 'center', marginTop: 15 }} variant='titleLarge'>{error?.message ?? "Intentalo mas tarde."}</Text>
                </View>
            </View>
        )
    }

    return (

        <View style={{ padding: 20, backgroundColor: "white", height: "100%" }}>
            <View style={styles.TitlesContainer}>
                <TouchableOpacity style={{ marginTop: 5, marginRight: 10 }} onPress={() => router.back()}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, marginRight: 20 }}>Mis rutinas</Text>
                <TouchableOpacity style={{ marginTop: 5 }} onPress={() => router.navigate(ROUTES.ADDROUTINE)}>
                    <MaterialCommunityIcons name="plus-circle-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 125, marginTop: 5 }}>
                    <MaterialCommunityIcons name="filter-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {
                userRoutinesLoading
                    ?
                    (<ActivityIndicator color='#FF7F3E' style={{ marginVertical: 50 }} animating={true} size={60} />)
                    :
                    userRoutines.length < 1
                        ? (
                            <Text variant='titleMedium' style={{ textAlign: "center", marginVertical: 60 }}>No hay rutinas, agrega una!</Text>
                        )
                        : (
                            <FlatList
                                data={userRoutines}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <View style={styles.rutineItem}>
                                        <Text >{item.name}</Text>
                                        <TouchableOpacity>
                                            <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                ItemSeparatorComponent={() => (
                                    <View style={styles.separator} />
                                )}
                                style={{ maxHeight: 500, marginBottom: 20 }}
                            />
                        )
            }


        </View>
    );
}

const styles = StyleSheet.create({
    TitlesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'right',
        marginBottom: 30,

    },
    rutineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginTop: 15,

    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',

    },
});