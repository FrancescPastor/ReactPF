import React from 'react';
import { StyleSheet, Text, View,Button, Image } from 'react-native';
import * as SQLite from 'expo-sqlite'; //Importar SQLite


const db = SQLite.openDatabase("db.db"); //Llamada a la base de datos

export class InteresView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: JSON.stringify(this.props.route.params.id), 
            imgs: [], 
            name: "", 
            imgCab: "", 
            dir: "",  
        };

    }
    componentDidMount() {
        db.transaction(tx => {
            tx.executeSql("select nom, fotoDesc, direccio from puntsInteres where id=?", [this.state.id], (tx,results) => {
                let tempName = "";
                let tempImg = "";
                let tempDir = "";
                for(let i=0; i < results.rows.length; i++){
                    tempName = results.rows.item(i).name;
                    tempImg = results.rows.item(i).imgCab;
                    tempDir = results.rows.item(i).dirr;
                }
                this.setState({ name: tempName, imgCab: tempImg, dir: tempDir }); //Pone el state de los datos con la info de la BD
            });
        });
        db.transaction(tx => {
            //Select de los datos
            tx.executeSql("select fotoUrl from imatgesInteres where idLlocs=?", [this.state.id], (tx,results) => {
                let temp = [];   
                for(let i=0; i < results.rows.length; i++){ 
                    temp.push(results.rows.item(i));
                }
                console.log(temp);
                this.setState({ imgs: temp, }); 
            });
        });
    }
    // Funcion para mostrar la imagen de cabecera
    seleccionImagen(im) {
        const cabeceras = {
            'kebabPak': require('../../assets/kebabPak.jpeg'),
            'imgPakCatalunya': require('../../assets/imgPakCatalunya.jpg'),
            
        };
        return cabeceras[im];
    }

    render() {        
        return(
            <View style={styles.container}>
                <Image source={this.seleccionImagen(this.state.imgCab)} />
                <Text style={styles.title}>{this.state.name}</Text> 
                <Text style={styles.dir}>{this.state.dir}</Text>                         
                <Button title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
                onPress={() => this.props.navigation.navigate('Camera', { 
                    id: this.state.id, 
                })}
                />
                <View style={styles.fotoView}>
                    <Text style={styles.fotoTitle}>Fotos del punto:</Text>
                    <View style={styles.imgView}>
                    {this.state.imgs.map(img => (
                        <Image key={img.fotoUrl} style={styles.fotoImg} source={this.seleccionImagen(img.fotoUrl)} />
                    ))}
                    </View>
                </View>

            </View>
        );
    }
}
//Estilos MarkerView
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebedf0',
        width: '100%',        
    },
    icons: {
        color: '#333333',
        marginHorizontal: 370,
        marginTop: 5,
        marginBottom: 15,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        position: 'relative',
        marginHorizontal: 15,
        lineHeight: 70,
        includeFontPadding: true,
    },
    dir: {
        fontSize: 18,
        marginHorizontal: 20,
    },
    fotoView: {
        flex: 2,
        backgroundColor: '#f8f9fa',
    },
    fotoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 15,
        marginTop: 10,
    },
    imgView: {
        flexDirection: "row",
        marginHorizontal: 15,
    },
    fotoImg: {
        width: 120,
        height: 120,
        marginLeft: 7,
        marginTop: 7,
        borderColor: '#ebedf0',
        borderWidth: 2,
    }
});