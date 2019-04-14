import React from 'react';
import { StyleSheet, Alert } from 'react-native';
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
            <Title>Remote LED</Title>
          </Body>
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('./assets/icon_v2.png')} />
                <Body>
                  <Text>Remote LED Switch</Text>
                  <Text note>Jan 31, 2019</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Use the button below to turn on and off the LED                                   
                </Text>
              </Body>
            </CardItem>
            <CardItem>
                <Button transparent textStyle={{color: '#87838B'}} onPress={() => this.handle_click("/")}>
                  <Icon name="logo-github" />
                  <Text>Turn On LED</Text>
                </Button>
              <Button transparent textStyle={{color: '#87838B'}} onPress={() => this.handle_click("/off")}>
                  <Icon name="logo-github" />
                  <Text>Turn Off LED</Text>
                </Button>
            </CardItem>
          </Card>
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
