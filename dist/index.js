"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var sanity = require("sanity");
const getIsSingleton = (schema, schemaType) => {
  var _a, _b, _c, _d;
  const documentSchema = (_b = (_a = schema._original) == null ? void 0 : _a.types) == null ? void 0 : _b.find(
    ({ name }) => name == schemaType
  );
  return (_d = (_c = documentSchema == null ? void 0 : documentSchema.options) == null ? void 0 : _c.singleton) != null ? _d : !1;
}, singletonPlugin = sanity.definePlugin((options) => ({
  name: "singleton-plugin",
  document: {
    newDocumentOptions: (prev, { schema, creationContext: { type, schemaType } }) => {
      var _a;
      const singletons = (_a = schema._original) == null ? void 0 : _a.types.filter(({ options: options2 }) => options2 == null ? void 0 : options2.singleton).map((s) => s.name), filterSingletons = ({ templateId }) => !(singletons != null && singletons.includes(templateId));
      return type == "global" || singletons != null && singletons.includes(schemaType) ? prev.filter(filterSingletons) : prev;
    },
    actions: (prev, { schema, schemaType }) => getIsSingleton(schema, schemaType) ? prev.filter(
      ({ action }) => ["publish", "unpublish", "discardChanges", "restore"].includes(
        action
      )
    ) : prev
  }
}));
exports.singletonPlugin = singletonPlugin;
//# sourceMappingURL=index.js.map
