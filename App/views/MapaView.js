import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';

import MapView, { Marker, Polyline } from 'react-native-maps'; //Importar mapas
import mapStyle from '../../assets/estilMapa.json'; //Estilos para los mapas, creados por google
import * as SQLite from 'expo-sqlite'; 
const db = SQLite.openDatabase("db.db"); 

const rutaKebab = [
    {
        latitude: 41.547082,
        longitude: 2.205339, 
    },
    {
        latitude: 41.546680,
        longitude: 2.203863,
    },
    {
        latitude: 41.545436,
        longitude: 2.204470,
    },
    {
        latitude: 41.544594,
        longitude: 2.204666,
    },
    {
        latitude:  41.544891,
        longitude: 2.205930,
    },
    {
        latitude:  41.545561,
        longitude: 2.205619,
    },
]
const rutaBarri = [
    {
        latitude: 41.545771,
        longitude: 2.202693, 
    },
    {
        latitude: 41.545385,
        longitude: 2.202871,
    },
    {
        latitude: 41.545710,
        longitude: 2.204223,
    },
    {
        latitude: 41.544237,
        longitude: 2.204818,
    },
    {
        latitude:  41.543273,
        longitude: 2.205253,
    },
    {
        latitude:  41.541904,
        longitude: 2.206449,
    },
    {
        latitude:  41.540928,
        longitude: 2.207082,
    },
    {
        latitude:  41.541498,
        longitude: 2.207913,
    },
    
]
export class MapaView extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            region: {
                latitude: 41.547101,
                longitude: 2.204239,
                latitudeDelta: 0.0222,
                longitudeDelta: 0.0221,
            },
            interes: [],
        };
        db.transaction(tx => {
            tx.executeSql("drop table if exists puntsInteres;"); 
            tx.executeSql("drop table if exists imatgesInteres;"); 
            tx.executeSql(
                "create table if not exists puntsInteres (id integer primary key not null, latitude real, longitude real, nom text, fotoDesc text, direccio text);"
            );
            tx.executeSql("create table if not exists imatgesInteres (id integer primary key not null, fotoUrl text, idLlocs integer);");
            tx.executeSql("insert into puntsInteres (latitude, longitude, nom, fotoDesc, direccio) values (41.547195, 2.205282, ?, ?, ?)", ['Pak Catalunya Döner Kebab','imgPakCatalunya', 'Avinguda de Caldes de Montbui, 56, 08100 Mollet del Vallès']);
            tx.executeSql("insert into imatgesInteres (fotoUrl, idLlocs) values ('kebabPak',1)");
           
            tx.executeSql("select * from puntsInteres", [], (tx,results) => {
                let puntsI = []; 
                for(let i=0; i < results.rows.length; i++){ 
                    puntsI.push(results.rows.item(i));
                }
                console.log(puntsI);
                this.setState({ interes: puntsI, }); 
            });
        });
    
    
    
    }
    render(){
    return (
    <View >
        <MapView 
            region={this.state.region}
            style={styles.sizes}
            customMapStyle={mapStyle}
        >
             {this.state.interes.map(intere => ( 
                    <Marker key={intere.id} coordinate={{latitude: intere.latitude, longitude: intere.longitude}} 
                    pinColor={'tomato'}
                    onPress={() => this.props.navigation.navigate('LlocInteres', {
                            id: intere.id, 
                    })} />
                ))}
         <Polyline
                    coordinates={rutaKebab}
                    strokeWidth={3}
                    strokeColor={'#a5defe'}
                    />
        <Polyline
                    coordinates={rutaBarri}
                    strokeWidth={3}
                    strokeColor={'#a5defe'}
                    />
        </MapView>

    </View>
  );
}
}
const styles = StyleSheet.create({
    sizes: {
        width: Dimensions.get('window').width,
        height: '100%',
    },
});
