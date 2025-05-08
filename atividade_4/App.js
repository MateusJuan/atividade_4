import React, { useEffect, useState } from 'react';
import {SafeAreaView,View,StyleSheet,Text,TextInput,TouchableOpacity,ScrollView,Image,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function App() {
  const [categorias, setCategorias] = useState([]);
  const [imagensPopulares, setImagensPopulares] = useState([]);
  const [imagensRecomendadas, setImagensRecomendadas] = useState([]);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [resCategorias, resPopulares, resRecomendados] = await Promise.all([
          fetch('http://localhost:3000/categorias'),
          fetch('http://localhost:3000/destinos_populares'),
          fetch('http://localhost:3000/recomendados'),
        ]);

        const categoriasData = await resCategorias.json();
        const popularesData = await resPopulares.json();
        const recomendadosData = await resRecomendados.json();

        setCategorias(categoriasData);
        setImagensPopulares(popularesData.map(item => item.link));
        setImagensRecomendadas(recomendadosData.map(item => item.link));
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchDados();
  }, []);

  return (
    <SafeAreaView style={estilos.container}>
      {/* HEADER */}
      <View style={estilos.header}>
        <View style={estilos.caixaCabecalho}>
          <Avatar
            rounded
            size="medium"
            source={{
              uri: 'https://play-lh.googleusercontent.com/2SIM81zLEHmiBRPyyYBsdpfjyZUT8mfpduB5b50SOu2MDlxTuHtvP3oW1H4C9Umoww=w240-h480-rw',
            }}
          />
          <View style={estilos.caixaBusca}>
            <TextInput
              placeholder="Pesquise aqui..."
              placeholderTextColor="#aaa"
              style={estilos.input}
            />
            <MaterialIcons name="search" size={24} color="gray" />
          </View>
        </View>
        <View style={estilos.caixaBoasVindas}>
          <Avatar
            rounded
            size="medium"
            source={{
              uri: 'https://avatars.githubusercontent.com/u/169060996?v=4',
            }}
          />
          <View style={estilos.textoBoasVindas}>
            <Text style={estilos.boasVindas}>Bem-vindo!</Text>
            <Text style={estilos.nome}>Mateus Juan</Text>
          </View>
          <TouchableOpacity style={estilos.notificacao}>
            <MaterialIcons name="notifications" size={28} color="gray" />
            <View style={estilos.bolinhanotificação} />
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTEÚDO PRINCIPAL */}
      <ScrollView style={estilos.conteudo} showsVerticalScrollIndicator={false}>
        <View style={estilos.linhaTitulo}>
          <Text style={estilos.conteudo_principal}>Categoria</Text>
          <TouchableOpacity>
            <MaterialIcons name="menu" size={30} color="#665DD1" />
          </TouchableOpacity>
        </View>

        <View style={estilos.grid}>
          {categorias.map((item, index) => (
            <TouchableOpacity key={index} style={estilos.itemCategoria}>
              <View style={estilos.circuloIcone}>
                {item.tipo === 'MaterialIcons' ? (
                  <MaterialIcons name={item.icone} size={28} color="#fff" />
                ) : (
                  <FontAwesome name={item.icone} size={28} color="#fff" />
                )}
              </View>
              <Text style={estilos.textoCategoria}>{item.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={estilos.linhaTitulo}>
          <Text style={estilos.conteudo_principal}>Destinos Populares</Text>
          <TouchableOpacity>
            <MaterialIcons name="menu" size={30} color="#665DD1" />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {imagensPopulares.map((url, index) => (
            <View key={index} style={estilos.cardDestino}>
              <Image
                source={{ uri: url }}
                style={estilos.imagemDestino}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>

        <View style={estilos.linhaTitulo}>
          <Text style={estilos.conteudo_principal}>Recomendados</Text>
        </View>
        {imagensRecomendadas.map((url, index) => (
          <View key={index} style={estilos.cardRecomendadoVertical}>
            <Image
              source={{ uri: url }}
              style={estilos.imagemRecomendadoVertical}
              resizeMode="cover"
            />
          </View>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* MENU INFERIOR */}
      <View style={estilos.menu}>
        <TouchableOpacity style={estilos.item}>
          <MaterialIcons name="home" size={28} color="yellow" />
          <Text style={estilos.textoItem}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.item}>
          <FontAwesome name="compass" size={28} color="#fff" />
          <Text style={estilos.textoItem}>Explorar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.item}>
          <MaterialIcons name="search" size={28} color="#fff" />
          <Text style={estilos.textoItem}>Pesquisar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.item}>
          <MaterialIcons name="person" size={28} color="#fff" />
          <Text style={estilos.textoItem}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#665DD1',
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  caixaCabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  caixaBusca: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  input: {
    flex: 1,
    color: '#000',
    marginRight: 10,
  },
  caixaBoasVindas: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textoBoasVindas: {
    flex: 1,
    marginLeft: 15,
  },
  boasVindas: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  nome: {
    fontSize: 14,
    color: '#fff',
  },
  notificacao: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 25,
  },
  bolinhanotificação: {
    width: 8,
    height: 8,
    backgroundColor: 'orange',
    borderRadius: 4,
    position: 'absolute',
    top: 15,
    left: 15,
  },
  conteudo: {
    flex: 1,
    padding: 20,
  },
  conteudo_principal: {
    fontSize: 30,
    color: 'gray',
  },
  menu: {
    flexDirection: 'row',
    backgroundColor: '#665DD1',
    paddingVertical: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  item: {
    alignItems: 'center',
  },
  textoItem: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  linhaTitulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemCategoria: {
    width: '22%',
    alignItems: 'center',
    marginVertical: 12,
  },
  circuloIcone: {
    backgroundColor: '#665DD1',
    padding: 16,
    borderRadius: 50,
    marginBottom: 8,
  },
  textoCategoria: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  cardDestino: {
    width: 120,
    height: 120,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  imagemDestino: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  cardRecomendadoVertical: {
    width: '100%',
    height: 180,
    marginBottom: 16,
    borderRadius: 15,
    overflow: 'hidden',
  },
  imagemRecomendadoVertical: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
});
