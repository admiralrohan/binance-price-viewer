import * as React from "react";
import { IToken, getTokenList } from "@/app/utils";

interface IFetchTokens {
  ws: WebSocket;
  setTokenList: React.Dispatch<React.SetStateAction<IToken[]>>;
  setCurrentPrice: React.Dispatch<React.SetStateAction<number>>;
  selectedToken: string | null;
  setSelectedToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export function useFetchTokens({
  ws,
  setTokenList,
  setCurrentPrice,
  selectedToken,
  setSelectedToken,
}: IFetchTokens) {
  React.useEffect(() => {
    getTokenList().then((tokens) => {
      setTokenList(tokens);
      setSelectedToken(tokens[0].symbol);

      if (tokens.length === 0) return;

      const tickerName = `${tokens[0].symbol.toLowerCase()}@ticker`;
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            method: "SUBSCRIBE",
            params: [tickerName],
            id: 1,
          })
        );
      };
    });
  }, [setSelectedToken, setTokenList, ws]);

  React.useEffect(() => {
    if (!selectedToken) return;

    const tickerName = `${selectedToken.toLowerCase()}@ticker`;
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [tickerName],
          id: 1,
        })
      );
    }

    ws.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);

      if (message.s === selectedToken) {
        const tokenValue = message.c;
        setCurrentPrice(tokenValue);
      }
    };

    return () => {
      setCurrentPrice(0);
      ws.send(
        JSON.stringify({
          method: "UNSUBSCRIBE",
          params: [tickerName],
          id: 1,
        })
      );
    };
  }, [selectedToken, setCurrentPrice, ws]);
}
