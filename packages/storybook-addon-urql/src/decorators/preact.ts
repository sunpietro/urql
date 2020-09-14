import { addDecorator } from '@storybook/preact';
import { Provider, createClient } from '@urql/preact';
import { createElement } from 'preact';
import { getStorybookExchange } from '../exchange';

const decorator: Parameters<typeof addDecorator>[0] = (Story, context) => {
  const client = createClient({
    url: 'storehhh',
    exchanges: [getStorybookExchange(context)],
  });

  return createElement(Provider, { value: client, children: Story(context) });
};

export default decorator;
