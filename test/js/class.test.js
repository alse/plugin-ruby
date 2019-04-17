const { long, ruby } = require("./utils");

describe("class", () => {
  test("basic nesting", () => {
    const content = ruby(`
      module Pret
        module Tier
          class Plugin; end
          module Ruby; end
        end
      end
    `);

    return expect(content).toMatchFormat();
  });

  test("inheritance", () => {
    const content = ruby(`
      module Prettier
        class Ruby < Object; end
      end
    `);

    return expect(content).toMatchFormat();
  });

  test("breaking class name", () => (
    expect(`class P${long}; end`).toChangeFormat(`class P${long}\nend`)
  ));

  test("breaking module name", () => (
    expect(`module P${long}; end`).toChangeFormat(`module P${long}\nend`)
  ));

  test("class push blocks", () => {
    const content = ruby(`
      class << Prettier
        def foo; end
      end
    `);

    return expect(content).toMatchFormat();
  });

  describe("undef", () => {
    test("single inline", () => (
      expect("undef foo").toMatchFormat()
    ));

    test("multiple inline", () => (
      expect("undef foo, bar").toMatchFormat()
    ));

    test("multiple breaking", () => (
      expect(`undef ${long}, a${long}`).toChangeFormat(ruby(`
        undef ${long},
              a${long}
      `))
    ));
  });

  describe("constant reference", () => {
    test("regular", () => (
      expect("Pret::Tier::Ruby").toMatchFormat()
    ));

    test("top-level", () => (
      expect("::Pret::Tier::Ruby").toMatchFormat()
    ));
  });
});
