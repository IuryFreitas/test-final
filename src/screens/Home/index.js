import React, { useState } from 'react';
import { Alert, Image } from 'react-native';
import {
    Container,
    Animation,
    Input,
    Button,
    ButtonText,
    Text
} from './styles';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function Home() {
    const [nome, setnome] = useState('');
    const [charac, setcharac] = useState(null);

    async function handleBuscar() {
        try {
            const { status, data } = await api.get(`/?name=${nome}`);

            if (status != 200 || data.erro) {
                Alert.alert('Buscar', 'Digite um nome válido.');
            } else {
                setcharac(data);
            }

        } catch (error) {
            Alert.alert('Buscar', 'Digite um nome válido');
        }
    };

    async function handleLimpar() {
        setcharac(null);
        setnome('');
    }

    return (
        <Container>
            <Animation
                animation='bounceInDown'
                delay={100}
                duration={1500}
            >
                <Image source={logo} />
            </Animation>

            <Animation
                animation='bounceInRight'
                delay={100}
                duration={1500}
            >
                {!charac &&
                    <Input
                        maxLength={8}
                        onChangeText={setnome}
                        onSubmitEditing={handleBuscar}
                        placeholder="Digite o nome que deseja buscar"
                        placeholderTextColor="#2F48D4"
                        value={nome}
                    />
                }

                <Button
                    activeOpacity={0.8}
                    onPress={charac ? handleLimpar : handleBuscar}>
                    <ButtonText>
                        {charac ? 'Limpar' : 'Buscar'}
                    </ButtonText>
                </Button>
            </Animation>

            {charac &&
                <CharacArea>
                    <Text>nome: {nome}</Text>
                    <Text>Bairro: {charac.status}</Text>
                    <Text>Cidade: {charac.species}</Text>
                    <Text>IBGE: {charac.gender}</Text>
                </CharacArea>
            }
        </Container>
    );
}