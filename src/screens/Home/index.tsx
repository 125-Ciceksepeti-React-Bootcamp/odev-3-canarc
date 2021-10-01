import { Component } from 'react';
import Axios from 'axios';
import { Box, Button, Card, CardBody, CardHeader, FormField, Heading, Layer, Spinner, TextInput } from 'grommet';
import { Close } from 'grommet-icons';
import BackgroundImage from '../../assets/background.jpg';
import CharacterCard from '../../components/CharacterCard';
import { Character } from '../../models/Character';

type HomeState = {
  isLoading: boolean;
  showModal: boolean;
  data?: Character[];
  selectedCharacter?: Character;
  isUpdating?: boolean;
};

export default class Home extends Component<{}, HomeState> {
  constructor(props: {}) {
    super(props);
    this.state = { isLoading: true, showModal: false };
  }

  componentDidMount() {
    Axios.get(`https://hp-api.herokuapp.com/api/characters`).then((res) => {
      this.setState({ data: res.data, isLoading: false });
    });
  }

  hideModal = () => this.setState({ showModal: false });
  render() {
    const { isLoading, showModal, data, selectedCharacter, isUpdating } = this.state;

    return (
      <Box pad={{ top: 'large' }} background={`url(${BackgroundImage})`} style={{ backgroundPosition: 'center' }} fill justify="center">
        <Box overflow="auto" gap="large" width="xlarge" alignSelf="center" direction="row" justify="center" wrap>
          {/*        
             isLoading ise Spinner render et değilse veri varsa göster yoksa veri yok yazısı bas.
           */}
          {isLoading ? (
            <Spinner color="primary" size="xlarge" />
          ) : data && data.length ? (
            this.state.data?.map((character) => (
              <CharacterCard
                character={character}
                onEdit={(character) => {
                  this.setState({ showModal: true, selectedCharacter: character });
                }}
                onDelete={(actor) => {
                  this.setState((prevState) => ({
                    data: prevState.data?.filter((character) => character.actor !== actor),
                  }));
                }}
              />
            ))
          ) : (
            <Heading>No Character Left 😩</Heading>
          )}
        </Box>

        {/* Modal Kısmı */}
        {showModal && (
          <Box fill>
            <Layer background="transparent" animation="fadeIn" onEsc={this.hideModal} onClickOutside={this.hideModal}>
              <Button style={{ position: 'absolute', right: 10, top: 10 }} reverse icon={<Close size="30" />} onClick={this.hideModal} />
              <Card elevation="large" width="large" background="background-back" round="small">
                <CardHeader justify="center">
                  <Heading margin={{ bottom: 'none' }} level={3}>
                    {`Edit ${selectedCharacter?.name}`}
                  </Heading>
                </CardHeader>
                <CardBody overflow="auto" pad="medium" gap="medium" justify="start" background="background-front" margin="small" round="small" elevation="large">
                  <FormField label="Character Name">
                    {/* onChange fonksiyonuda statedeki selectedCharacterin ilgili alanın güncelle */}
                    <TextInput onChange={(e) => this.setState({ selectedCharacter: { ...selectedCharacter!, name: String(e.target.value) } })} value={selectedCharacter?.name} />
                  </FormField>
                  <FormField label="House">
                    <TextInput onChange={(e) => this.setState({ selectedCharacter: { ...selectedCharacter!, house: String(e.target.value) } })} value={selectedCharacter?.house} />
                  </FormField>
                  <FormField label="Image">
                    <TextInput onChange={(e) => this.setState({ selectedCharacter: { ...selectedCharacter!, image: String(e.target.value) } })} value={selectedCharacter?.image} />
                  </FormField>
                  <Button
                    disabled={isUpdating}
                    onClick={() => {
                      this.setState({ isUpdating: true });
                      setTimeout(() => {
                        try {
                          const index = data?.findIndex((character) => character.actor === selectedCharacter!.actor)!;
                          const _data = this.state.data!;
                          _data[index] = selectedCharacter!;
                          alert('Success');
                          this.setState({ data: _data, isUpdating: false });
                          this.hideModal();
                        } catch (_err) {
                          alert('An error occured.');
                        }
                      }, 3000);
                    }}
                    primary
                    size="large"
                    label="Save"
                  />
                </CardBody>
              </Card>
            </Layer>
          </Box>
        )}
      </Box>
    );
  }
}
