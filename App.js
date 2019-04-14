import React from 'react';
import { StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Text, Body, Title, Root, Card, CardItem, Thumbnail, Icon, Left } from 'native-base';
import { Font, AppLoading } from "expo";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  showAlert = () =>{
    Alert.alert(
       'command is sent successfully.'
    )
 }

  handle_click(command) {
    console.log(command)
    fetch("http://128.199.210.235"+command)
    .then(function(response){
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        // console.log(this);
        return;
      }
      if (response.status === 200) {
        Alert.alert("command is sent successfully.")
        return;
      }
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    return (
      <Container>
        <Header>
          <Body>
            <Title>KW-HB</Title>
          </Body>
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('./assets/icon_v2.png')} />
                <Body>
                  <Text>给张杨楷文的生日礼物</Text>
                  <Text note>Jan 31, 2019</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  用下面的开关叫醒汤海彬                                   
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              {/* <Left> */}
                <Button transparent textStyle={{color: '#87838B'}} onPress={() => this.handle_click("/off")}>
                  <Icon name="logo-github" />
                  <Text>开灯叫小猴</Text>
                </Button>
              {/* </Left> */}
              {/* <Right> */}
              <Button transparent textStyle={{color: '#87838B'}} onPress={() => this.handle_click("/")}>
                  <Icon name="logo-github" />
                  <Text>关灯睡觉</Text>
                </Button>
              {/* </Right> */}
            </CardItem>
          </Card>
          {/* <Button onPress={() => this.handle_click("/off")}>
            <Text>Wake HB UP</Text>
          </Button>
          <Button onPress={() => this.handle_click("/")}>
            <Text>Turn off the light</Text>
          </Button>
          <Button onPress={() => this.showAlert()}>
            <Text>Alert</Text>
          </Button> */}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'green',
    width: '40%',
    height: 40
  }
});
