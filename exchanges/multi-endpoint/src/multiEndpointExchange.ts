import { Operation, Exchange } from '@urql/core';
import { pipe, map } from 'wonka';
import { getApiDirective } from './utils';
import { StringValueNode } from 'graphql';

export interface Options {
  endpoints: {
    [apiKey: string]: string;
  };
}

export const requestPolicyExchange = (options: Options): Exchange => ({
  forward,
  client,
}) => {
  const processIncomingOperation = (operation: Operation): Operation => {
    const apiDirective = getApiDirective(operation.query);
    if (!apiDirective) {
      return operation;
    }

    const endpoint =
      options.endpoints[
        (apiDirective.arguments!.find(arg => arg.name.value === 'name')!
          .value as StringValueNode).value as string
      ];

    return {
      ...operation,
      query: removeApiDirectives(operation.query),
      context: {
        ...operation.context,
        url: endpoint || client.url,
      },
    };
  };

  return ops$ => {
    return forward(pipe(ops$, map(processIncomingOperation)));
  };
};
