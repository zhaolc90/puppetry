import { buildAssertionTpl } from "service/assert";
import { AssertSelector } from "../../Assert/AssertSelector";

export const assertMatchesSelector = {
  template: ( command ) => buildAssertionTpl(
    `await bs.page.$eval( '${ command.targetSeletor }', `
      + `( el, selector ) => el.matches( selector ), "${ command.assert.value }" )`,
    command,
    `// Asserting that ${ command.target } matches "${ command.assert.value }" selector or pseudo-selector`
  ),

  toLabel: ({ assert }) => `(\`${ assert.value }\`)`,
  commonly: "assert: it matches selector",

  toGherkin: ({ target, assert }) => `Assert that target \`${ target }\`
    matches selector \`${ assert.value }\``,

  assert: {
    node: AssertSelector
  },
  description: `Asserts that \`{target}\`
    target [matches a given selector or pseudo-selector]`
  + `(https://developer.mozilla.org/en-US/docs/Web/API/Element/matches)`,
  params: [],

  testTypes: {
    "assert": {
      "value": "INPUT"
    }
  },

  test: [
    {
      valid: true,
      "assert": {
        "assertion": "selector",
        "value": ".foo"
      }
    }
  ]
};
