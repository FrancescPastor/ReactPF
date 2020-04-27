import React from 'react';
import { StyleSheet, Text, View,Button, Image } from 'react-native';
import * as SQLite from 'expo-sqlite'; 


const db = SQLite.openDatabase("db.db"); 

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
                let nomLocal = "";
                let imgLocal = "";
                let direccioLocal = "";
                for(let i=0; i < results.rows.length; i++){
                    nomLocal = results.rows.item(i).nom;
                    imgLocal = results.rows.item(i).fotoDesc;
                    direccioLocal = results.rows.item(i).direccio;
                }
                this.setState({ nom: nomLocal, fotoDesc: imgLocal, direccio: direccioLocal }); 
            });
        });
        db.transaction(tx => {
           
            tx.executeSql("select fotoUrl from imatgesInteres where idLlocs=?", [this.state.id], (tx,results) => {
                let totesImatges = [];   
                for(let i=0; i < results.rows.length; i++){ 
                    totesImatges.push(results.rows.item(i));
                }
                console.log(totesImatges);
                this.setState({ imatge: totesImatges, }); 
            });
        });
    }
   
    agafaImatge(im) {
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
            <View style={styles.tot}>
                <Image source={this.agafaImatge(this.state.fotoDesc)} style={styles.imatgeTitol} />
                <Text style={styles.title}>{this.state.nom}</Text> 
                <Text style={styles.estilDireccio}>{this.state.direccio}</Text>                         
               
                <View style={styles.estilImatge}>
                    <Text style={styles.estilTitol}>Fotos del punto:</Text>
                    <View style={styles.estilImatgevista}>
                    {this.state.imatge.map(img => (
                        <Image key={img.fotoUrl} style={styles.imatgeEStil} source={this.agafaImatge(img.fotoUrl)} />
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
    tot: {
        flex: 1,
        backgroundColor: '#ECFCFB',
        width: '100%',
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
    estilDireccio: {
        fontSize: 18,
        marginHorizontal: 20,
    },
    estilImatge: {
        flex: 2,
        backgroundColor: '#ECFCFB',
    },
    estilTitol: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 15,
        marginTop: 10,
    },
    estilImatgevista: {
        flexDirection: "row",
        marginHorizontal: 15,
    },
    imatgeEStil: {
        width: 120,
        flex: 2,
        height: 120,
        marginLeft: 7,
        marginTop: 7,
        borderColor: '#ebedf0',
        borderWidth: 2,
    }
});