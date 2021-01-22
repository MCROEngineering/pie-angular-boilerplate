const config = {
    id: '1',
    elements: {
      'pie-multiple-choice': '@pie-element/multiple-choice@5.5.12',
    },
    models: [
      {
        id: '1',
        element: 'pie-multiple-choice',
        prompt: 'What is the theme of this poem?',
        choiceMode: 'checkbox',
        keyMode: 'numbers',
        choices: [
          {
            correct: true,
            value: 'sorrow',
            label: 'Sorrow',
            feedback: {
              type: 'none',
              value: '',
            },
          },
          {
            value: 'contemplation',
            label: 'Contemplation',
            feedback: {
              type: 'none',
              value: '',
            },
          },
          {
            value: 'loneliness',
            label: 'Loneliness',
            feedback: {
              type: 'none',
              value: '',
            },
          },
          {
            correct: true,
            value: 'envy',
            label: 'Envy',
            feedback: {
              type: 'none',
              value: '',
            },
          },
        ],
        partialScoring: true,
        partialScoringLabel: `Each correct response that is correctly checked and each incorrect response
        that is correctly unchecked will be worth 1 point.
        The maximum points is the total number of answer choices.`,
      },
    ],
    markup: `
    <pie-multiple-choice id='1'></pie-multiple-choice>
    `,
  };
  const config2 = {
    id: '1',
    elements: {
      'inline-dropdown': '@pie-element/inline-dropdown@3.5.12',
    },
    models: [
      {
        id: '2',
        element: 'inline-dropdown',
        disabled: false,
        mode: 'gather',
        prompt: 'Use the dropdowns to complete the sentence',
        promptEnabled: true,
        shuffle: true,
        markup: '<div><p>The {{0}} jumped {{1}} the {{2}}</p></div>',
        choices: {
          '0': [
            {
              label: 'cow ',
              value: '0',
              correct: true
            },
            {
              label: 'dog ',
              value: '1',
              correct: false
            },
            {
              label: 'cat ',
              value: '2',
              correct: false
            }
          ],
          '1': [
            {
              label: 'over ',
              value: '0',
              correct: true
            },
            {
              label: 'under ',
              value: '1',
              correct: false
            },
            {
              label: 'across ',
              value: '2',
              correct: false
            }
          ],
          '2': [
            {
              label: 'moon ',
              value: '0',
              correct: true
            },
            {
              label: 'sun',
              value: '2',
              correct: false
            },
            {
              label: 'house ',
              value: '3',
              correct: false
            }
          ]
        },
        alternateResponse: {
          '2': ['2']
        }
      }
    ],
    markup: `
    <inline-dropdown id='2'></inline-dropdown>
    `,
  };
  export default {
    config,
    config2
  };