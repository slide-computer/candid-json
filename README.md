# JSON encoding for Candid types

When communicating Candid data with JSON between web services, there are two options:
- CBOR encode to bytes and send as JSON text value (base64/hex)
- Write Candid data with a JSON syntax

The latter is more accessible to services and dapps outside the IC ecosystem, they don't need to understand and decode CBOR to process incoming data.

A few examples:
- JSON-RPC between dapps and (multi chain) wallets with ICRC-25
- canisters with public HTTP APIs accepting and returning JSON for dapps outside the IC ecosystem that want to query their data.
- Browser messaging and storage of Candid types

The [ICRC-26](https://github.com/dfinity/ICRC/issues/30) standard standardizes the JSON syntax of Candid type values for above use cases with a strong emphasis on making the data accessible for dapps outside the IC ecosystem without Candid knowledge.

## candid-json

This library implements the [ICRC-26](https://github.com/dfinity/ICRC/issues/30) standard in JS.

Example usage:
```ts
const candid = new CandidJSON(({ IDL }) =>
    IDL.Record({
      b: IDL.Text,
      c: IDL.Principal,
      d: IDL.Opt(IDL.Bool),
      e: IDL.Opt(IDL.Opt(IDL.Bool)),
      f: IDL.Nat,
      g: IDL.Tuple(IDL.Nat16, IDL.Func),
      h: IDL.Variant({
        x: IDL.Bool,
        y: IDL.Nat64,
        z: IDL.Null,
      }),
      i: IDL.Vec(IDL.Float64),
    }),
  );
  const input = {
    b: "Hello world!",
    c: Principal.managementCanister(),
    d: [false],
    e: [[true]],
    f: BigInt(200),
    g: [5, [Principal.managementCanister(), "install_code"]],
    h: {
      z: null,
    },
    i: [2.63, 5.24, 7.9234],
  };
  const json = JSON.stringify(candid.toJSON(input)); // JSON string in the ICRC-26 standard
  const output = candid.fromJSON(JSON.parse(json)); // Should be equal to input
```
