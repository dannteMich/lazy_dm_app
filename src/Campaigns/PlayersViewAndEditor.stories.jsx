import React from 'react';

import PlayersViewAndEditor from './PlayersViewAndEditor';

export default {
  title: 'Campaigns/PlayersViewAndEditor',
  component: PlayersViewAndEditor,
  argTypes: {
      updatePlayers: {action: "new players"}
  },
}

const playersData = [
    {
        player_name: "Player 1",
        character_name: "Character 1",
        // description: "",
    }, {
        player_name: "Someone",
        character_name: "else",
        description: "My description",
    }, {
        player_name: "Player 3",
        character_name: "",
        description: "",
    }
]

const Template = (args) => <PlayersViewAndEditor {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    currentPlayers: playersData
};

export const EmptyPlayers = Template.bind({});
EmptyPlayers.args = {
    currentPlayers: []
};

