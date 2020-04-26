import React from 'react';
import { StyleSheet, Text, View,Button, Image } from 'react-native';
import * as SQLite from 'expo-sqlite'; //Importar SQLite


const db = SQLite.openDatabase("db.db"); //Llamada a la base de datos

export class InteresView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: JSON.stringify(this.props.route.params.id),
            imatge: [], 
            nom: "", 
            fotoDesc: "", 
            direccio: "", 
        };

    }
    componentDidMount() {
        db.transaction(tx => {
            tx.executeSql("select nom, fotoDesc, direccio from puntsInteres where id=?", [this.state.id], (tx,results) => {
                let tempName = "";
                let tempImg = "";
                let tempDir = "";
                for(let i=0; i < results.rows.length; i++){
                    tempName = results.rows.item(i).nom;
                    tempImg = results.rows.item(i).fotoDesc;
                    tempDir = results.rows.item(i).direccio;
                }
                this.setState({ nom: tempName, fotoDesc: tempImg, direccio: tempDir }); //Pone el state de los datos con la info de la BD
            });
        });
        db.transaction(tx => {
           
            tx.executeSql("select fotoUrl from imatgesInteres where idLlocs=?", [this.state.id], (tx,results) => {
                let temp = [];   
                for(let i=0; i < results.rows.length; i++){ 
                    temp.push(results.rows.item(i));
                }
                console.log(temp);
                this.setState({ imatge: temp, }); 
            });
        });
    }
   
    seleccionImagen(im) {
        const imatgesMostrar = {
            'kebabPak': require('../../assets/kebabPak.jpeg'),
            'imgPakCatalunya': require('../../assets/imgPakCatalunya.jpg'),
            'platoKebabMollet': require('../../assets/platoKebabMollet.png'),
            'fachadaPakMollet': require('../../assets/fachadaPakMollet.png'),
            'canArimon': require('../../assets/canArimon.png'),
            'maquinasCan': require('../../assets/maquinasCan.jpg'),
            'peCanArimon': require('../../assets/peCanArimon.jpg'),
            'piscinaCanarimon': require('../../assets/piscinaCanarimon.jpg'),
            'sangerLogo': require('../../assets/sangerLogo.jpg'),
            'sanger': require('../../assets/sanger.jpg'),
            'sanger2': require('../../assets/sanger2.jpg'),
            'sanger3': require('../../assets/sanger3.jpg'),
        };
        return imatgesMostrar[im];
    }

    render() {        
        return(
            <View style={styles.container}>
                <Image source={this.seleccionImagen(this.state.fotoDesc)} style={styles.imatgeTitol} />
                <Text style={styles.title}>{this.state.nom}</Text> 
                <Text style={styles.dir}>{this.state.direccio}</Text>                         
               
                <View style={styles.fotoView}>
                    <Text style={styles.fotoTitle}>Fotos del punto:</Text>
                    <View style={styles.imgView}>
                    {this.state.imatge.map(img => (
                        <Image key={img.fotoUrl} style={styles.fotoImg} source={this.seleccionImagen(img.fotoUrl)} />
                    ))}
                    </View>
                </View>
                <View style={styles.botonCamara}>
                <Button title="Camera"
                        color= "#030B6A"
                   
                    
                    accessibilityLabel="Camera"
                    onPress={() => this.props.navigation.navigate('Camera', {
                        id: this.state.id,
                    })}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    imatgeTitol: {
        width: 300,
        height: 120,
        marginLeft: 7,
        marginTop: 7,
       
    },
    botonCamara: {
        marginBottom: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        backgroundColor: '#ECFCFB',
        width: '100%',
    },
    icons: {
        color: '#333333',
        marginHorizontal: 370,
        marginTop: 5,
        marginBottom: 15,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        position: 'relative',
        marginHorizontal: 10,
        lineHeight: 50,
        includeFontPadding: true,
        textAlign: 'center',
    },
    dir: {
        fontSize: 18,
        marginHorizontal: 20,
    },
    fotoView: {
        flex: 2,
        backgroundColor: '#ECFCFB',
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
        flex: 2,
        height: 120,
        marginLeft: 7,
        marginTop: 7,
        borderColor: '#ebedf0',
        borderWidth: 2,
    }
});