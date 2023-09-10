import { Principal } from "@dfinity/principal";
import { CandidJSON } from "./index";

test("CandidJSON", () => {
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
  const json = JSON.stringify(candid.toJSON(input));
  const output = candid.fromJSON(JSON.parse(json));

  expect(input).toEqual(output);
});
