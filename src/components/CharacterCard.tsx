import { Button, Card, CardBody, CardFooter } from 'grommet';
import { Edit, Trash } from 'grommet-icons';
import { memo } from 'react';
import { Character } from '../models/Character';

type CharacterCardProps = {
  character: Character;
  onDelete: (actor: string) => any;
  onEdit: (character: Character) => any;
};

const CharacterCard = ({ character, onDelete, onEdit }: CharacterCardProps) => {
  return (
    <Card margin={{ bottom: 'medium' }} style={{ position: 'relative' }} key={character.actor} height="medium" width="small" background="light-1">
      <Button onClick={() => onDelete(character.actor)} primary style={{ position: 'absolute', right: 5, top: 5, background: '#4e411b44' }} icon={<Trash color="white" />} hoverIndicator />

      <Button onClick={() => onEdit(character)} primary style={{ position: 'absolute', left: 5, top: 5, background: '#4e411b44' }} icon={<Edit color="white" />} hoverIndicator />

      <CardBody>
        <img alt="character" style={{ objectFit: 'cover', objectPosition: 'center top' }} height="100%" width="100%" src={character.image} />
      </CardBody>
      <CardFooter height="xxsmall" pad="small" background="light-2">
        {character.name}
        {character.house}
      </CardFooter>
    </Card>
  );
};

export default memo(CharacterCard);
