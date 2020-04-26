import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';

import MapView, { Marker, Polyline, Callout } from 'react-native-maps'; 
import mapStyle from '../../assets/estilMapa.json';
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
            latitude: 0,
            longitude: 0,
            error: null,
            interes: [],
        };
        db.transaction(tx => {
            tx.executeSql("drop table if exists puntsInteres;"); 
            tx.executeSql("drop table if exists imatgesInteres;"); 
            tx.executeSql("create table if not exists puntsInteres (id integer primary key not null, latitude real, longitude real, nom text, fotoDesc text, direccio text);" );
            tx.executeSql("create table if not exists imatgesInteres (id integer primary key not null, fotoUrl text, idLlocs integer);");
            tx.executeSql("insert into puntsInteres (latitude, longitude, nom, fotoDesc, direccio) values (41.547195, 2.205282, ?, ?, ?)", ['Pak Catalunya Döner Kebab','imgPakCatalunya', 'Avinguda de Caldes de Montbui, 56, 08100 Mollet del Vallès']);    
            tx.executeSql(
              "insert into puntsInteres (latitude, longitude, nom, fotoDesc, direccio) values (41.541995, 2.207188, ?, ?, ?)",
              [
                "Can Arimon",
                "canArimon",
                "Carrer del Ferrocarril, 80, 84, 08100 Mollet del Vallès, Barcelona",
              ]
            );    
            tx.executeSql("insert into puntsInteres (latitude, longitude, nom, fotoDesc, direccio) values (41.543010,2.203891, ?, ?, ?)", ['Escola Sant Gervasi Cooperativa', 'sangerLogo', 'Carrer de Sabadell, 41, 08100 Mollet del Vallès, Barcelona']);
            tx.executeSql("insert into imatgesInteres (fotoUrl, idLlocs) values ('fachadaPakMollet',1)");
            tx.executeSql("insert into imatgesInteres (fotoUrl, idLlocs) values ('platoKebabMollet',1)");
            tx.executeSql("insert into imatgesInteres (fotoUrl, idLlocs) values ('kebabPak',1)");
            tx.executeSql("insert into imatgesInteres (fotoUrl, idLlocs) values ('piscinaCanarimon',2)" );
            tx.executeSql("insert into imatgesInteres (fotoUrl, idLlocs) values ('peCanArimon',2)" );
            tx.executeSql("insert into imatgesInteres (fotoUrl, idLlocs) values ('maquinasCan',2)");
            
            tx.executeSql("insert into imatgesInteres (fotoUrl, idLlocs) values ('sanger',3)");
            tx.executeSql("insert into imatgesInteres (fotoUrl, idLlocs) values ('sanger2',3)");
            tx.executeSql("insert into imatgesInteres (fotoUrl, idLlocs) values ('sanger3',3)");
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
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null
            });
        },
            error => this.setState({error: error.message}),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000}
        );
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
                    pinColor={'red'}
                    onPress={() => this.props.navigation.navigate('Interes', {
                            id: intere.id, 
                    })} />
                ))}

<Marker coordinate={this.state}  pinColor={'yellow'}>
                        <Callout>
                            <Text>Tu</Text>
                           
                        </Callout>
                    </Marker>      
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
