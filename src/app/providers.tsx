"use client";

import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";
import { ofetch } from "ofetch";

export default function Providers({ children }: PropsWithChildren<object>) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          ofetch(resource, init).then((res) => res.data),
      }}
    >
      {children}
    </SWRConfig>
  );
}
