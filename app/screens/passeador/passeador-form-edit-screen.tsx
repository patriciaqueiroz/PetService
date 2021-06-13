// import React, { useState,useEffect } from "react"
// import { TextStyle, View, ViewStyle, Alert } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { observer } from "mobx-react-lite"
// import { Button, Header, Screen, TextField, Wallpaper } from "../../components"
// import { color, spacing } from "../../theme"
// import { useStores } from "../../models"
// //import { State } from "react-native-gesture-handler"
// import DatePicker from 'react-native-datepicker'
// import { RadioGroup } from "react-native-radio-buttons-group"
// import PasseadorService from "../../services/passeador-service"
// import PetService from "../../services/pet-service"
// import PasseadorModel from "../../models/passeador-model"


// const FULL: ViewStyle = {
//   flex: 1,
// }
// const CONTAINER: ViewStyle = {
//   backgroundColor: color.transparent,
// }
// const HEADER: TextStyle = {
//   paddingBottom: spacing[5] - 1,
//   paddingHorizontal: spacing[4],
//   paddingTop: spacing[3],
// }
// const HEADER_TITLE: TextStyle = {
//   fontSize: 12,
//   fontWeight: "bold",
//   letterSpacing: 1.5,
//   lineHeight: 15,
//   textAlign: "center",
// }
// const LIST_CONTAINER: ViewStyle = {
//   alignItems: "center",
//   flexDirection: "row",
//   padding: 10,
// }
// const CONTAINER_ADD: ViewStyle = {
//   ...LIST_CONTAINER,
//   alignItems: "center",
//   flexDirection: "column",
//   padding: 10,
//   alignSelf: "center",
//   alignContent: "center",
// }
// const BUTTON_ADD: ViewStyle = {
//   backgroundColor: "green",
//   alignSelf: "center",
//   width: 110,
// }
// const TEXT_FIELD: ViewStyle = {
//   width: 300,
// }
// const TEXT_FIELD_CONTENT: TextStyle = {
//   fontSize: 16,
//   fontWeight: "bold",
//   color: "#5D2555",
//   padding: 8,
// }

// export const PasseadorFormEditScreen = observer(function PasseadorFormEditScreen() {
//   const navigation = useNavigation()
//   const goBack = () => navigation.goBack()

//   const passeadorService = new PasseadorService()
//   const petService = new PetService()
//   const { passeadorStore } = useStores()

//   const [radioButtonsData, setRadioButtonsData] = useState([]);
//   const [especialidadeSelecionada, setSelecionarEspecialidade] = useState("");
//   const [nomeSelecionado, setSelecionarNome] = useState("");
//   const [status, setSelecionarStatus] = useState("");
//   const [imagemSelecionada, setImagemSelecionada] = useState("");
//   const [dataAtendimento, setDataAtendimentoSelecionada] = useState("");
//   const [petRadioGroup, setSelecionarPetId] = useState(radioButtonsData);

//   async function loadPets() {
//     const pets = await petService.getPets()
//     let radioButtonsData = []
//     pets.forEach((element, index) => {
//       radioButtonsData[index] = {
//         id: `${element.id}`,
//         label: element.nome,
//         value: `${element.id}`,
//         color: "#FFF",
//         labelStyle: {color: "white"}
//       }
//     });
//     setRadioButtonsData(radioButtonsData)
//   }

//   async function loadPasseadorData() {
//     const passeador = await passeadorService.getPasseadorById(passeadorStore.passeador)
//     setSelecionarEspecialidade (passeador.especialidade)
//     setSelecionarNome (passeador.nome)
//     setSelecionarStatus (passeador.status)
//     setImagemSelecionada (passeador.imagem)
//     setDataAtendimentoSelecionada(passeador.dataAtendimento)
    
//     let arrVet = []
//     petRadioGroup.forEach(element => {
//       element.selected=(element.value === passeador.petId)
//       arrVet.push(element)
//     })
//     setSelecionarPetId(arrVet)
//   }

//   useEffect(() => {
//     loadPets()
//     loadPasseadorData()
//   }, [])

//   async function editarPasseador() {
//     const petSelecionado = petRadioGroup.find((item) => {
//       return (item.selected)
//     })
//     if (petSelecionado) {
//       const passeador = new PasseadorModel({
//         nome: nomeSelecionado,
//         especialidade: especialidadeSelecionada,
//         status,
//         dataAtendimento,
//         imagem: imagemSelecionada,
//         petId: petSelecionado.value
//       })
      
//       await passeadorService.updatePasseador(passeadorStore.passeador, passeador)

//       navigation.navigate("home")
//       navigation.navigate("passeadorList")
//     } else {
//       Alert.alert(
//         "Atenção",
//         "Olá antes de cadastrar o Passeador é necessário cadastrar o Pet para o Atendimento",
//         [
//           { text: "OK", onPress: () => navigation.navigate('home') }
//         ]
//       );
//     }
// }

//   return (
//     <View testID="PasseadorListScreen" style={FULL}>
//       <Wallpaper />
//       <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
//         <Header
//           headerText="Editar Passeador"
//           leftIcon="back"
//           onLeftPress={goBack}
//           style={HEADER}
//           titleStyle={HEADER_TITLE}
//         />
//         <View style={CONTAINER_ADD}>
//           <TextField
//             value={nomeSelecionado}
//             onChangeText={setSelecionarNome}
//             inputStyle={TEXT_FIELD_CONTENT}
//             style={TEXT_FIELD}
//             placeholder="Nome"/>
        
//           <TextField
//             value={especialidadeSelecionada}
//             onChangeText={setSelecionarEspecialidade}
//             inputStyle={TEXT_FIELD_CONTENT} 
//             style={TEXT_FIELD}
//             placeholder="Especialidade"/>
          
//           <TextField
//             value={status}
//             onChangeText={setSelecionarStatus}
//             inputStyle={TEXT_FIELD_CONTENT}
//             style={TEXT_FIELD}
//             placeholder="Status"/>
            
//             <TextField
//             value={imagemSelecionada}
//             onChangeText={setImagemSelecionada}
//             inputStyle={TEXT_FIELD_CONTENT}
//             style={TEXT_FIELD}
//             placeholder="Informe a Url da imagem"/>
            
//             <TextField 
//             value="informe a data do atendimento"
//             style={TEXT_FIELD}/>
            
//             <DatePicker
//             format="DD/MM/YYYY"
//             mode="date"
//             placeholder="Informe a data do Atendimento"
//             style={{width: 200, backgroundColor: "white"}}
//             date={dataAtendimento}
//             onDateChange={setDataAtendimentoSelecionada}></DatePicker>

//             <RadioGroup
//             radioButtons={petRadioGroup} 
//             onPress={setSelecionarPetId} 
//               />


//           <Button
//             style={BUTTON_ADD}
//             text="Salvar Alterações"
//             onPress={() => { editarPasseador() }}></Button>
//         </View>
//       </Screen>
//     </View>
//   )
// })
import React, { useState,useEffect } from "react"
import { TextStyle, View, ViewStyle, Alert, Text, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, TextField, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
//import { State } from "react-native-gesture-handler"
import DatePicker from 'react-native-datepicker'
import { RadioGroup } from "react-native-radio-buttons-group"
import PasseadorService from "../../services/passeador-service"
import PasseadorModel from "../../models/passeador-model"
import PetService from "../../services/pet-service"


const FULL: ViewStyle = {
  flex: 1,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}
const BUTTON_SELECT: ViewStyle = {
  backgroundColor: "green",
  alignSelf: "stretch",
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const CONTAINER_ADD: ViewStyle = {
  ...LIST_CONTAINER,
  alignItems: "center",
  flexDirection: "column",
  padding: 10,
  alignSelf: "center",
  alignContent: "center",
}
const BUTTON_ADD: ViewStyle = {
  backgroundColor: "green",
  alignSelf: "center",
  width: 110,
}
const TEXT_FIELD: ViewStyle = {
  width: 300,
}
const TEXT_FIELD_CONTENT: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  color: "#5D2555",
  padding: 8,
}

export const PasseadorFormEditScreen = observer(function PasseadorFormEditScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const passeadorService = new PasseadorService()
  const petService = new PetService()

  const { passeadorStore } = useStores()

  //const [radioButtonsData, setRadioButtonsData] = useState([]);  
  const [especialidadeSelecionada, setSelecionarEspecialidade] = useState("");
  const [nomeSelecionado, setSelecionarNome] = useState("");
  const [status, setSelecionarStatus] = useState("");
  const [imagemSelecionada, setImagemSelecionada] = useState("");
  const [dataAtendimento, setDataAtendimentoSelecionada] = useState("");
  const [petId, setPetId] = useState("");
  const [pets, setPets] = useState([]);
 // const [petRadioGroup, setSelecionarPetId] = useState(radioButtonsData);


  async function loadPets() {
    setPets(await petService.getPets())
   
  }

  async function loadPasseadorData() {
    let passeador = await passeadorService.getPasseadorById(passeadorStore.passeador)
    setSelecionarEspecialidade(passeador.especialidade)
    setSelecionarNome(passeador.nome)
    setSelecionarStatus(passeador.status)
    setImagemSelecionada(passeador.imagem)
    setDataAtendimentoSelecionada(passeador.dataAtendimento)
    
    setPetId(passeador.petId)
  }

  useEffect(() => {
    loadPets()
    loadPasseadorData() 
  }, [])

  async function editarPasseador() {
    
    if (petId) {
      
      try {
        const passeador = new PasseadorModel();
        passeador.nome = nomeSelecionado,
        passeador.especialidade = especialidadeSelecionada,
        passeador.status = status,
        passeador.dataAtendimento = dataAtendimento,
        passeador.imagem = imagemSelecionada,
        passeador.petId = petId
        
        await passeadorService.updatePasseador(passeadorStore.passeador, passeador)
        
        navigation.navigate("home")
        navigation.navigate("passeadorList")
      } catch(e) {
        console.log(e)
        Alert.alert(
          "Atenção",
          "Ocorreu um erro ao tentar cadastrar o Passeador!"
        )
      }

    }else{
      Alert.alert(
        "Atenção",
        "Olá antes de cadastrar o Passeador é necessário cadastrar o Pet para o Atendimento",
        [
          { text: "OK", onPress: () => navigation.navigate('home') }
        ]
      );
  }
}

  return (
    <View testID="PasseadorListScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText="Editar Passeador"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={CONTAINER_ADD}>
          <TextField
            value={nomeSelecionado}
            onChangeText={setSelecionarNome}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Nome"/>
        
          <TextField
            value={especialidadeSelecionada}
            onChangeText={setSelecionarEspecialidade}
            inputStyle={TEXT_FIELD_CONTENT} 
            style={TEXT_FIELD}
            placeholder="Especialidade"/>
          
          <TextField
            value={status}
            onChangeText={setSelecionarStatus}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Status"/>
            
            <TextField
            value={imagemSelecionada}
            onChangeText={setImagemSelecionada}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Informe a Url da imagem"/>
                        
            <DatePicker
            format="DD/MM/YYYY"
            mode="date"
            placeholder="Informe a data do Atendimento"
            style={{width: 200, backgroundColor: "white"}}
            date={dataAtendimento}
            onDateChange={setDataAtendimentoSelecionada}></DatePicker>

            </View>
                  <FlatList
                    contentContainerStyle={FLAT_LIST}
                    data={pets}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                      <View style={LIST_CONTAINER}>
                          <Text style={LIST_TEXT}>
                          {item.nome} 
                          </Text>
                        <Button
                          style={BUTTON_SELECT}
                          disabled={petId===item.id}
                          onPress={() => {
                            setPetId(item.id)
                            
                          }}
                          text="Selecionar"
                          >
                            
                          </Button>
                      
                      </View>
                    )}
                  />
                  <View>  


          <Button
            style={BUTTON_ADD}
            text="Salvar Alterações"
            onPress={() => { editarPasseador() }}></Button>
        </View>
      </Screen>
    </View>
  )
})
